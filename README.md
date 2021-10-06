# Gadgets360
> Ecommerce Website built with MERN stack & Redux
---
## Features
* User Panel 
  * Authorization using JWT token
  * Checkout Process (shipping,payment method)
  * Payment Integration using Razorpay API
  * Review and Rating option
  * Fully Featured Cart options
  * Email notification after order placement and after succesfull delivery
* Admin Panel
  * CRUD operations on products
  * Auto Increment and decrement on products
  * User Management Panel
  * Mark order as delivered option
  * Database seeding script(products & Users)
## Technologies Used
* Frontend
  * React (UI)
  * React-bootstrap (CSS framerwork for styling)
  * Redux (State Management)
  * axios (For making requests to backend)
* Backend
  * Nodejs (Javascript runtime)
  * Expressjs (Nodejs framework)
  * MongoDB (Database)
  * Mongoose (ODM)
  * Json Web Token (Authorization purpose)
  * GoogleAPIs (For sending mails via gmail)
  * Nodemailer (Mail sender)
  * Razorpay (For Handling Payments)
 ## ENV Variables
 ### Create a .env file in root folder then add the following
 ```
 NODE_ENV = development
 ```
