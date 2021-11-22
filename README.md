## 👉 Example
An example of this app is running here: https://www.myplanapp.info. (for now only in Spanish, multi-language version upcoming)

## 👉 Get Started

0. Download and install [Nodejs](https://nodejs.org/en/download/) in your computer (LTS version).

1. Open the project in VisualStudio Code and open the terminal. Install dependencies

   ```
   npm install
   ```

2. Create a file named `.env` in the root of the project. Update it with the environment variables. You can review `.env.example` file as a referece. IMPORTANT: DO NOT CHANGE `.env.example` OR COMMIT IT TO SOURCE CONTROL, THIS IS JUST A REFERENCE FILE.

   2.1 The URL where the backendAPI is listening

   ```
   REACT_APP_API_BASE_URL=http://localhost:5000/api/
   ```

   2.2 The secret used to generate and encode JWT. This secret _must_ match with the JWT secret in the backend, otherwise authorization won't be possible

   ```
   JWT_SECRET=thesecretvalue
   ```
   
   2.3 Since the app is agnostic to the domain where it's going to run, the following variable is required to build user's public calendar page:
   
   ```
   REACT_APP_DOMAIN=http://localhost
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
- Hosted in AWS Amplify
- Contact Form - [Formspree](https://formspree.io) (in the pipeline)
- Analytics - [Google Analytics](https://googleanalytics.com) (in the pipeline)
