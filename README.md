# Contact List Management

This project is a contact list management system that allows users to register, log in, and manage their contacts. The system is built using React, Redux, Tailwind CSS, Node.js, Express, and MongoDB. JWT is used for authentication.

## Installation

To run the project, you need to have Node.js and MongoDB installed on your machine. Here are the steps to install and run the project:

1. Clone the repository to your local machine.

2. Install the dependencies by running `npm install` in both the client and server directories.

3. Create a `.env` file in the server directory and set the `JWT_SECRET` environment variable to a secret key. For example: `JWT_SECRET=MySecretKey`

4. Start the server by running `npm start` in the server directory.

5. Start the client by running `npm run dev` in the client directory.

6. Open your web browser and navigate to `http://localhost:5173` to view the application.

## Usage

Once the application is running, you can register a new account by clicking the "Register" button and providing your name, email, and password. After registering, you can log in using your email and password.

On the home page, you can see your contacts listed as cards. You can add a new contact by clicking the "Add Contact" button and filling in the required fields. You can also search for contacts using the search bar and delete or edit contacts by clicking the corresponding buttons in the table.

To log out, simply click the "Logout" button.

