## 👉 Get Started

0. Download and install [Nodejs](https://nodejs.org/en/download/) in your computer (LTS version).

1. Open the project in VisualStudio Code and open the terminal. Install dependencies

   ```
   npm install
   ```

2. Update your `.env` file with values for each environment variable

   2.1 The URL where the backendAPI is listening

   ```
   REACT_APP_API_BASE_URL=http://localhost:5000/api/
   ```

   2.2 The secret used to generate and encode JWT. This secret _must_ match with the JWT secret in the backend, otherwise authorization won't be possible

   ```
   JWT_SECRET=thesecretvalue
   ```

3. No you can view the website at `http://localhost:3000``

Remember that
When the above command completes you'll be able to view your website at `http://localhost:3000`

## 🥞 Stack

This project uses the following libraries and services:

- Framework - [Create React App](https://create-react-app.dev) with React Router
- UI Kit - [Material UI](https://material-ui.com)
- Authentication - Custom JWT implementation
- Database - MongoDB
- Contact Form - [Formspree](https://formspree.io)
- Analytics - [Google Analytics](https://googleanalytics.com)
- Hosting - TBD: Probably AWS Amplify
