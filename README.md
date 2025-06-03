# TINIG - A Voice for the Unheard 🗣️

TINIG aims to empower marginalized and underserved communities in the Philippines by providing accessible, timely, and affordable legal assistance. Our platform addresses the critical gaps in legal aid services, ensuring that justice is not a privilege but a right for everyone. This initiative directly contributes to **SDG 16 (Peace, Justice, and Strong Institutions)** by promoting access to justice and **SDG 11 (Sustainable Cities and Communities)** by fostering inclusive and safe communities.

-----

## Features 🚀

### Features Overview

TINIG offers a comprehensive suite of tools designed to democratize legal aid:

  * **AI-powered Chatbot:** Get instant legal information and guidance through our intelligent chatbot. 🤖
  * **Automated Document Templates:** Generate legal documents tailored to your specific needs with ease. ✍️
  * **Centralized Database:** Discover and connect with legal aid organizations and government offices conveniently. 🏛️

-----

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed\!

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting\#npm-run-build-fails-to-minify](https://www.google.com/search?q=https://facebook.github.io/create-react-app/docs/troubleshooting%23npm-run-build-fails-to-minify)

-----

## Project Structure 🏗️

```
public/
    ├── favicon.ico
    ├── index.html
    ├── logo192.png
    ├── logo512.png
    ├── manifest.json
    └── robots.txt
src/
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── reportWebVitals.js
    └── setupTests.js
.gitignore
package-lock.json
package.json
postcss.config.js
README.md
tailwind.config.js
```
-----

## Configuration ⚙️

To get TINIG up and running, you'll need to configure a few key environment variables for our integrated Google services and Firebase Authentication.

### Environment Variables

Create a file named `.env` in the root directory of the project. This file will store your sensitive API keys and configuration details. Add the following variables:

```
REACT_APP_FIREBASE_API_KEY='YOUR_FIREBASE_API_KEY'
REACT_APP_FIREBASE_AUTH_DOMAIN='YOUR_FIREBASE_AUTH_DOMAIN'
REACT_APP_FIREBASE_PROJECT_ID='YOUR_FIREBASE_PROJECT_ID'
REACT_APP_FIREBASE_STORAGE_BUCKET='YOUR_FIREBASE_STORAGE_BUCKET'
REACT_APP_FIREBASE_MESSAGING_SENDER_ID='YOUR_FIREBASE_MESSAGING_SENDER_ID'
REACT_APP_FIREBASE_APP_ID='YOUR_FIREBASE_APP_ID'
REACT_APP_Maps_API_KEY='YOUR_Maps_API_KEY'
REACT_APP_GOOGLE_TEXT_TO_SPEECH_API_KEY='YOUR_GOOGLE_TEXT_TO_SPEECH_API_KEY'
REACT_APP_GOOGLE_SPEECH_TO_TEXT_API_KEY='YOUR_GOOGLE_SPEECH_TO_TEXT_API_KEY'
REACT_APP_GEMINI_API_KEY='YOUR_GEMINI_API_KEY'
```

**Replace** the placeholder values (e.g., 'YOUR\_FIREBASE\_API\_KEY') with your actual credentials. You can obtain these from your Google Cloud Platform and Firebase project settings.

### Google Cloud Platform Setup

1.  **Enable APIs:** Ensure the following APIs are enabled in your Google Cloud Project:
      * Google Maps Platform APIs (e.g., Geocoding API, Places API)
      * Cloud Text-to-Speech API
      * Cloud Speech-to-Text API
      * Gemini API (if using Google's Gemini models directly)
2.  **Service Accounts:** For production deployments, it's recommended to use service accounts with appropriate permissions for accessing Google Cloud Storage, Google Docs, and Google Drive.
3.  **Billing:** Google Cloud services require a billing account. Ensure your billing is set up and active.

### Firebase Setup

1.  **Create a Firebase Project:** If you haven't already, create a new project in the Firebase console.
2.  **Register Your App:** Register your web app within your Firebase project to get your Firebase configuration details (API Key, Auth Domain, etc.).
3.  **Enable Authentication Methods:** In Firebase Authentication, enable the authentication methods you plan to use (e.g., Email/Password, Google Sign-In).

-----

## Development Guide 🧑‍💻

### Local Development

To run TINIG locally:

1.  Clone the repository: `git clone https://github.com/jamiekimjavier/tinig-app.git`
2.  Navigate to the project directory: `cd tinig-app`
3.  Install dependencies: `npm install`
4.  Start the development server: `npm start`

## Contributing Guide 👋

We welcome contributions to TINIG\! To contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Open a pull request to the `main` branch of the original repository.

-----

## Support 🤝

For support, questions, or feedback, please open an issue on our GitHub repository.

-----

## Technologies Used 🛠️

TINIG leverages the following cutting-edge technologies:

  * **Google Text-to-Speech & Speech-to-Text APIs:** For seamless voice interaction. 🗣️
  * **Google Cloud Storage:** For secure and scalable data storage. ☁️
  * **Google Maps Platform:** To locate legal aid organizations and government offices. 🗺️
  * **Firebase Authentication:** For secure user authentication. 🔐
  * **Gemini:** Powering our AI-driven chatbot for instant legal information and guidance. ✨

-----

## Business Model 💰

TINIG aims for sustainability and broader impact through:

  * **Donations and Grants:** Seeking support from international justice and human rights organizations to scale our social impact.
  * **Transaction Fees:** Implementing small, transparent fees on referrals to legal professionals for specialized cases, ensuring affordability.
  * **Partnerships with NGOs and Government:** Exploring licensing or service agreements to integrate our platform services into community outreach programs.
