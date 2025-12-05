# A To-Do List App Built with React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to Start the App

1. First, clone the repository in a folder of your choice.
2. Open a Command Prompt and navigate to the cloned repository.
3. In the repository directory, run:

        npm install -g npm

    to install the Node Package Manager.
4. Now you must install the dependencies by running:

        npm install express
        npm install cors

5. To run this app, you will also need a MySQL-based database. I used MariaDB. Don’t forget to install the MySQL package in the command prompt:

        npm install mysql

6. Fill out the properties of the database in [server.js](./src/components/server-side/server.js) (user, password, database).

7. To start the app in development mode, run the following in the project directory:

        npm start

   Then open [http://localhost:3000](http://localhost:3000)
   in your browser to view it.

8. In a new PowerShell window, navigate to the project directory and run:

        node .\src\components\server-side\server.js

   This will start the database server.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

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
