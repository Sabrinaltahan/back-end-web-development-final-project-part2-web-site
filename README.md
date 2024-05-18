# back-end-web-development-final-project-part2-web-site
back end web development final project part2 (web site)

#### Overview
This project is the frontend for a Fast-Food-Rest website, designed to provide an interactive and user-friendly interface for customers to view the menu, place orders, and manage their orders. The frontend is built using HTML, CSS, and JavaScript, and it interacts with a backend API to fetch and manage data.

#### Goal of the Project
The goal of this project is to create a seamless user experience for customers of the Fast-Food-Rest. It allows users to:
- Browse the Fast-Food-Rest's menu items.
- Place orders online.
- View and manage their orders.
- Admins can manage menu items and view all orders.

#### How to Use the API
The frontend uses various API endpoints to interact with the backend server. Below are the main endpoints and how they are used:

#### API Endpoints and Usage

1. *User Authentication:*
   - Register: `POST /auth/register`
     - Used to register a new user.
   - Login: `POST /auth/login`
     - Used to log in an existing user and receive an authentication token.

2. *Menu Management:*
   - Get All Menu Items: `GET /items`
     - Used to fetch all menu items and display them to the user.
   - Add New Menu Item (Admin): `POST /items`
     - Used by admins to add a new menu item to the database.

3. *Order Management:*
   - Place an Order: `POST /orders`
     - Used to place a new order by the user.
   - Get User Orders: `GET /orders/my-orders`
     - Used to fetch all orders placed by the logged-in user.
   - Get All Orders (Admin): `GET /orders`
     - Used by admins to fetch all orders from all users.

#### How to Achieve the Goals

1. *User Registration and Login:*
   - Users can register by filling out the registration form and submitting it. The frontend sends the registration details to the `/auth/register` endpoint.
   - Users can log in by submitting their credentials, which are sent to the `/auth/login` endpoint. On successful login, a token is stored in local storage for authenticated requests.

2. *Displaying Menu Items:*
   - The menu items are fetched from the `/items` endpoint and displayed on the homepage. Each item includes details such as label, description, price, and an image.

3. *Placing Orders:*
   - Users can place orders by selecting items from the menu and submitting an order form. The order details are sent to the `/orders` endpoint.

4. *Viewing and Managing Orders:*
   - Users can view their orders on the "My Orders" page. The frontend fetches the user's orders from the `/orders/my-orders` endpoint and displays them in a table.
   - Admins can view all orders on the dashboard. The orders are fetched from the `/orders` endpoint.

5. *Admin Dashboard:*
   - Admins have access to a dashboard where they can manage menu items and view all user orders.
   - Admins can add new items via a form that sends data to the `/items` endpoint.
   - Admins can delete menu items or manage user orders using appropriate buttons on the dashboard.

#### Project Structure
The frontend project is structured as follows:
- *index.html:* The homepage displaying the menu items.
- *login.html:* The login page for user authentication.
- *register.html:* The registration page for new users.
- *my-orders.html:* The page where users can view and manage their orders.
- *dashboard.html:* The admin dashboard for managing menu items and orders.
- *add-new-item.html:* The page for admins to add new menu items.
- *assets/styles/styles.css:* The CSS file containing custom styles for the website.
- *navbar.js:* JavaScript file for handling the navigation bar interactions.
- *dashboard.js:* JavaScript file for handling the interactions on the admin dashboard.
- *my-orders.js:* JavaScript file for handling user orders.

#### Technologies Used
- HTML
- CSS
- JavaScript
- Bootstrap (for styling and layout)
- AJAX (for API requests)

By following this structure and utilizing the provided endpoints, the frontend project effectively communicates with the backend API to provide a dynamic and responsive user experience for the Fast-Food-Rest website.