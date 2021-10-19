import React from "react";
import Navbar from "./../components/Navbar";
import IndexPage from "./index";
import AboutPage from "./about";
import FaqPage from "./faq";
import PricingPage from "./pricing";
import ContactPage from "./contact";
import DashboardPage from "./dashboard";
import MeetingRequestListPage from "./meeting-request-list";
import MeetingRequestPage from "./meeting-request";
import AvailableDatesPage from "./available-dates";
import SettingsPage from "./settings";
import PurchasePage from "./purchase";
import AuthPage from "./auth";
import { Switch, Route, Router } from "./../util/router.js";
import NotFoundPage from "./not-found.js";
import Footer from "./../components/Footer";
import "./../util/analytics.js";
import { AuthProvider } from "./../util/auth.js";
import { ThemeProvider } from "./../util/theme.js";
import { QueryClientProvider } from "./../util/db.js";

function App(props) {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <>
              <Navbar
                color="default"
                logo="https://uploads.divjoy.com/logo.svg"
                logoInverted="https://uploads.divjoy.com/logo-white.svg"
              />

              <Switch>
                <Route exact path="/" component={IndexPage} />

                <Route exact path="/about" component={AboutPage} />

                <Route exact path="/faq" component={FaqPage} />

                <Route exact path="/pricing" component={PricingPage} />

                <Route exact path="/contact" component={ContactPage} />

                <Route exact path="/dashboard" component={DashboardPage} />

                <Route
                  exact
                  path="/meeting-request-list"
                  component={MeetingRequestListPage}
                />

                <Route
                  exact
                  path="/meeting-request/:userid"
                  component={MeetingRequestPage}
                />

                <Route
                  exact
                  path="/available-dates/:userid"
                  component={AvailableDatesPage}
                />

                <Route
                  exact
                  path="/settings/:section"
                  component={SettingsPage}
                />

                <Route exact path="/purchase/:plan" component={PurchasePage} />

                <Route exact path="/auth/:type" component={AuthPage} />

                <Route component={NotFoundPage} />
              </Switch>

              <Footer
                bgColor="light"
                size="normal"
                bgImage=""
                bgImageOpacity={1}
                description="Reuniones fáciles"
                copyright={`© ${new Date().getFullYear()} LetUsMeet`}
                logo="https://uploads.divjoy.com/logo.svg"
                logoInverted="https://uploads.divjoy.com/logo-white.svg"
                sticky={true}
              />
            </>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
