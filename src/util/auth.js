import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";
import queryString from "query-string";
import fakeAuth from "fake-auth";
import { useUser, createUser, updateUser } from "./db";
import { history } from "./router";
import PageLoader from "./../components/PageLoader";
import { apiRequest } from "./util";

import analytics from "./analytics";

const jwt = require("jsonwebtoken");
// Whether to merge extra user data from database into auth.user
// Useful in case the user object returned by signin doesn't have all the required
// information for the system
const MERGE_DB_USER = true;

// Whether to connect analytics session to user.uid
const ANALYTICS_IDENTIFY = false;

const authContext = createContext();

// Context Provider component that wraps your app and makes auth object
// available to any child component that calls the useAuth() hook.
export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook that enables any component to subscribe to auth state
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useAuthProvider() {
  // Store auth user object
  const [user, setUser] = useState(null);

  // Format final user object and merge extra data from database
  const finalUser = usePrepareUser(user);

  // Connect analytics session to user
  useIdentifyUser(finalUser);

  // Handle response from authentication functions
  const handleAuth = async (user) => {
    // Update user in state
    setUser(user);
    localStorage.setItem("at", user.token);
    return user;
  };

  const signup = (firstName, lastName, email, password) => {
    return apiRequest("user/signup", "POST", {
      firstName,
      lastName,
      email,
      password,
    })
      .then((response) => {
        if (response.code === undefined || response.code === 200) {
          handleAuth(response.user);
        } else if (response.status === "error") {
          throw new Error(response.message);
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  const signin = (email, password) => {
    return apiRequest("user/signin", "POST", { email, password })
      .then((response) => {
        if (response.code === undefined || response.code === 200) {
          handleAuth(response.user);
        } else if (response.status === "error") {
          throw new Error(response.message);
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  // const signinWithProvider = (name) => {
  //   return fakeAuth
  //     .signinWithProvider(name)
  //     .then((response) => handleAuth(response.user));
  // };

  const signout = () => {
    localStorage.setItem("at", "");
    setUser(false);
  };

  const sendPasswordResetEmail = (email) => {
    return apiRequest(`user/password-reset-email/${email}`, "POST")
      .then((response) => response)
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  const confirmPasswordReset = (password, code) => {
    const resetCode = code || getFromQueryString("token");
    return apiRequest(`user/password-reset/${resetCode}/${password}`, "POST")
      .then((response) => response)
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  const updateEmail = (email) => {
    return fakeAuth.updateEmail(email).then((rawUser) => {
      setUser(rawUser);
    });
  };

  const updatePassword = (password) => {
    return fakeAuth.updatePassword(password);
  };

  // Update auth user and persist to database (including any custom values in data)
  // Forms can call this function instead of multiple auth/db update functions
  const updateProfile = async (data) => {
    const { email, name, picture } = data;

    // Update auth email
    if (email) {
      await fakeAuth.updateEmail(email);
    }

    // Update auth profile fields
    if (name || picture) {
      let fields = {};
      if (name) fields.name = name;
      if (picture) fields.picture = picture;
      await fakeAuth.updateProfile(fields);
    }

    // Persist all data to the database
    await updateUser(user.uid, data);

    // Update user in state
    const currentUser = await fakeAuth.getCurrentUser();
    setUser(currentUser);
  };

  useEffect(() => {
    const token = localStorage.getItem("at");
    if (token) {
      try {
        var decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
        handleAuth({ id: decoded.uid, email: decoded.email, token: token });
      } catch (err) {
        signout();
      }
    }
  }, []);

  return {
    user: finalUser,
    signup,
    signin,
    //signinWithProvider,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updateEmail,
    updatePassword,
    updateProfile,
  };
}

// Format final user object and merge extra data from database
function usePrepareUser(user) {
  // Fetch extra data from database (if enabled and auth user has been fetched)
  const userDbQuery = useUser(MERGE_DB_USER && user && user.id);

  // Memoize so we only create a new object if user or userDbQuery changes
  return useMemo(() => {
    // Return if auth user is null (loading) or false (not authenticated)
    if (!user) return user;

    // Data we want to include from auth user object
    let finalUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      preferredLanguageCode: user.preferredLanguageCode,
      isEmailConfirmed: user.isEmailConfirmed,
      timeZoneId: user.timeZoneId,
      uniqueLinkId: user.uniqueLinkId,
    };

    // Include an array of user's auth providers, such as ["password", "google", etc]
    // Components can read this to prompt user to re-auth with the correct provider
    //finalUser.providers = [user.provider];

    // If merging user data from database is enabled ...
    if (MERGE_DB_USER) {
      switch (userDbQuery.status) {
        case "idle":
          // Return null user until we have db data to merge
          return null;
        case "loading":
          return null;
        case "error":
          // Log query error to console
          console.error(userDbQuery.error);
          return null;
        case "success":
          // If user data doesn't exist we assume this means user just signed up and the createUser
          // function just hasn't completed. We return null to indicate a loading state.
          if (userDbQuery.data === null) return null;

          // Merge user data from database into finalUser object
          Object.assign(finalUser, userDbQuery.data.user);

        // no default
      }
    }

    return finalUser;
  }, [user, userDbQuery]);
}

// A Higher Order Component for requiring authentication
export const requireAuth = (Component) => {
  return (props) => {
    // Get authenticated user
    const auth = useAuth();

    useEffect(() => {
      // Redirect if not signed in
      if (auth.user === false) {
        history.replace("/auth/signin");
      }

      const accessToken = localStorage.getItem("at");
      if (!accessToken) {
        auth.signout();
      } else {
        try {
          var decoded = jwt.verify(
            accessToken,
            process.env.REACT_APP_JWT_SECRET
          );
        } catch (err) {
          auth.signout();
        }
      }
    }, [auth]);

    // Show loading indicator
    // We're either loading (user is null) or we're about to redirect (user is false)
    if (!auth.user) {
      return <PageLoader />;
    }

    // Render component now that we have user
    return <Component {...props} />;
  };
};

// Connect analytics session to current user.uid
function useIdentifyUser(user) {
  useEffect(() => {
    if (ANALYTICS_IDENTIFY && user) {
      analytics.identify(user.id);
    }
  }, [user]);
}

const getFromQueryString = (key) => {
  return queryString.parse(window.location.search)[key];
};
