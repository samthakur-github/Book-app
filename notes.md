## Backend project steps -
    # Install the required packages (express, mongoose, dotnnc etc).
    # Set the mongoose URI and Port etc in the .env file
    # Create a DB.js file for the connecting to the mongoDB database in the Database folder
    # Create userSchema, orderSchema, bookSchema etc in the Models folder
    # Create a User API in the routes folder, and create User
    # User password is showing so we hash the password using bcrypt, in the user.js file and hash the password
    # After hashing the password, we use jwt token for authorization and authentication process
    # After that we crate bearer token in userAuth.js and get the user information and other routes API also

    # Create a Book.js file for the admin API's for the admin can add, delete, modify their book
    # Create a favorites.js file for Get, delete etc method for User's favorite book
    # Create a cart.js file for Get the Cart Details of the User
    # Create a order.js file for Get the Order Details

## Frontend project steps -
    # Install the vite react, and install packages like React-router-dom, axios, Redux, BrowserRouter, Routes, Route etc.
        # React-router-dom: This package helps in navigative to other pages without reloading the page.
        # Axios - Axios is a library thats helps in communicate with servers and API
        # Redux - Redux use for state management
        # Link, Routes, Route - These three components work together for Navigation in React Router Dom, with them the page is not reload.

    # After package installation, we create Navbar, Footer etc. in components folder
    # Create pages in the pages folder
    # Create the Home page and doing navbar responsive, then Use the useState for hanlding the navlinks on mobile screen 

## Backend and Frontend Integration -
    # In the RecentlyAdded.jsx file, with the help of axios package we send a req to the Backend.
    # Use the CORS for removing the error