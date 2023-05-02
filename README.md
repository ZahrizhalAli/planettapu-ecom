# Planettap E-commerce App

Planettap is a web-based e-commerce application developed using ReactJS. It provides a platform for users to browse and purchase various products online. This documentation provides an overview of the features and usage of the Planettap e-commerce app.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

* User authentication and authorization with Firebase Auth
* Product search and filtering (advance filtering)
* Product categorization and sorting
* Product details page with description, images, price and ratings feature
* Add to cart and checkout functionality
* Order history and tracking
* Payment Gateway integration (on progress)
* Admin panel for managing products, orders, and users
* User panel for purchase and orders management

## Technologies Used

* ReactJS
* Redux State Management
* React Router Dom for Routing
* Axios for HTTP Requests
* Bootstrap, Ant Design and Material UI for styling
* Node JS with Express for the backend (on the separate repo)
* Mongodb for database with mongoose (on the separate repo)

## Installation

To install the Planettap e-commerce app on your local machine, follow these steps

In the project directory, you can run:

1. Clone the repository
2. Navigate to the project using `cd frontend`
3. Install dependencies using `npm install` make sure to have npm set up. If you have latest version of npm u might wanna use the --openssl-legacy-provider statement
4. Create a `.env` file in the root directory of the project and add the environment variables: 

REACT_APP_BACKEND_API=your_api_url
REACT_APP_URL=login_redirect_url_from_firebase_auth
...

5. Start the development server using `npm start`


## Usage
Once you have the Planettap e-commerce app up and running on your local machine, you can use it to browse and purchase products online. The following are the main pages of the app:

* Home Page - displays the featured products and categories.
* Product List Page - displays the list of products based on the selected category and search query with advanced filter
* Product Details Page - displays the detailed information about a specific product, including description, images, price, and ratings.
* Cart Page - displays the products that have been added to the cart and allows the user to proceed to checkout.
* Checkout Page - allows the user to enter their shipping and payment information to complete the purchase.
* Order History Page - displays the user's order history and order status.


## Admin Panel
The Planettap e-commerce app also includes an admin panel that allows the admin to manage products, orders, and users. For now you can learn more about the admin credentials in the backend repo.

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

# License
