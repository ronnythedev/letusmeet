export function apiRequest(path, method = "GET", data) {
  const accessToken = localStorage.getItem("at");

  return fetch(`${process.env.REACT_APP_API_BASE_URL}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.status === "error") {
        // Automatically signout user if accessToken is no longer valid
        // TODO: when the code is 403, signout the user automatically
        // The challenge is that the user is inside a React hook (auth) therefore the signout
        // method cannot be called from this util.
        // May I want to change this util into a hook?
        if (response.code === 403) {
        }
        throw new CustomError(response.code, response.message);
      } else {
        return response;
      }
    });
}

// Create an Error with custom message and code
export function CustomError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}
