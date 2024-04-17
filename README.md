# About Tailor Maven 	
Taylor Maven is a website that offers a unique and personalized online tailoring service. Users can select from a variety of high-quality fabrics and provide their own body measurements to create their perfect bespoke suit. Users can also choose to buy the fabric only, or send a gift to someone special. Taylor Maven aims to provide a convenient, affordable, and satisfying experience for customers who value quality and versatility. The website is designed for anyone who wants to look sharp and different in a custom-made suit, whether for business, casual, or formal occasions. Taylor Maven is more than just a website, it is a way to express your individuality and confidence.
The website was made with the primary purpose of serving a wide range of customers who want to meet their needs of style and stand out while being comfortable at their own home or anywhere. The clothing industry is very fast-paced and there is a huge demand for bespoke suits for formal, business, or wedding occasions. We are here to serve that market with speed and precision.

# Technical Specifications

**Tech Stack:** MERN 

**Backend:** Node.js with Express.js \
**Frontend:** React \
**Database:** MongoDB \
**Database Hosting:** MongoDB Atlas \
**Media File Hosting:** Cloudinary \
**Web Socket:** Socket.io \
**3D Framework:** React Three Fiber \
**Payment Gateway:** Stripe \
**Authentication:** OAuth2.0 + Passport.js

# How to Run
Make sure to add the follwing environment variables in the backend folder: \
**GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET** for using Google authentication with OAuth2.0. **JWT_SECRET** & **JWT_LIFETIME** are needed to create JWT token. **MONGO_URI** is required for providing database access. **COUDINARY_CLOUD_NAME**, **CLOUDINARY_API_KEY**, **CLOUDINARY_API_SECRET** are needed for media file hosting on Cloudinary. **PORT** has to be set to something other than 3000 to stop clasing with frontend server.

Install <a href="https://nodejs.org/en/download">Node</a> then go to both backend & frontend directories and run:
```
npm install
```
Then to start backend & frontend server, run the this command on both directories:
```
npm start
```

# Requirement Analysis

- ### User Authentication and Profile Management:
    - Users should be able to register or log into their account via two ways: Username/Password, Google Authentication
    - A user profile should have necessary information about the user and the delivery addresses to confirm order
    - User should be able to edit and update any details of their profile

- ### Admin Dashboard:

    - There should be a special admin profile which has privileged access to the website and the database
    - There should be a special login page for admins to log in and accessing the admin dashboard
    - Admin dashboard should have the ability to monitor what orders have been placed and what materials are available in stock. Admin can also add/remove/update any product on the website and also update the order tracking accordingly

- ### Designing Suit:

    - Users should be able to design their own suit choosing from the provide options of fabric they want, what color it should be and what type of a suit they want
    - This process should also contain taking accurate body measurements which will be used to then visualize the final suit
    - Users should have the option to save the suit they design and make further modifications in future

- ### Visualization of Suit:

    - After designing the suit, users should be able to see a 2D/3D model of the suit they designed
    - The visual model should alter according to the provided body measurements which will help users understand the fitting

- ### Gifting a Suit:

    - Users should have the option to design a suit and then gift it to another user.
    - After sending the gift, the receiver should receive a notification on their Tailor Maven profile and an email should also be sent. After the user accepts the gift, an order should automatically be placed under the name and information of the receiver.
    - In case of declining the gift, the sender should be notified. Also, a receiver should be able to block certain emails about getting gift notifications and email in case of spam.
    - If the receiver does not have an account on Tailor Maven, they should be able to create one and the gift should automatically be added to their account


- ### Ordering Process:

    - After designing the suit, users should have the option to order that suit
    - Users should first go through a payment process which will comprise of paying the required amount through an online payment gateway system
    - After the payment is confirmed, an order should be placed for the user containing the payment transaction information and delivery details taken from the user profile

- ### Order Tracking:

    - The admin should be able to update the order status through the admin dashboard accordingly.
    - Users should be able to visit their orders page and see the update of whether the suit is tailored, packaged, delivered etc.
    - After each update, the user should receive an email updating them with the current order status

- ### Connecting with Admin:

    - Users should have the option to send instant messages to the admin about any query regarding the website, product, delivery information, etc.
    - In the admin dashboard, an admin should be able to reply to those messages
    - Admin should have the ability to ban users from messaging in case of any spam
    - Any history of the messages should be auto deleted after a certain period of time

# Feasibility Analysis

- **Technical Feasibility:** All the technical requirements are technically feasible. The platform prioritizes user data privacy through secure authentication obtained via Google’s OAuth2.0 authorization system and offers a reliable payment gateway for seamless online transactions via Stripe. Scalability has been a key consideration, allowing efficient database management through MongoDB Atlas, ensuring the storage and retrieval of user design preferences and order details. A realistic 2D/3D preview of their designed suits can be obtained by a powerful frontend framework Three.js. In summary, the technically feasible website provides a cutting-edge solution for personalized suit design and ordering, combining advanced design features with secure and scalable architecture.

- **Operational Feasibility:** TailorMaven's operational feasibility appears strong. It aligns with current trends in the bespoke(custom-made) tailoring industry, offering personalized suit design and seamless online ordering. The website's intuitive interface and clear instructions should facilitate user adoption, enhancing the overall user experience. With efficient workflows for fabric selection, measurement input, and order management, TailorMaven ensures smooth day-to-day operations and timely delivery of bespoke suits to customers.

- **Economical Feasibility:** TailorMaven demonstrates strong economic feasibility, with revenue generated through suit sales, fabric-only purchases, and gifting options. Costs include development, maintenance, and operational expenses such as fabric sourcing and tailoring. However, benefits come from sales revenue and potential partnerships with fashion influencers or wedding planners. By offering competitive pricing and maximizing profit margins through efficient operations, TailorMaven aims to achieve profitability and sustained growth in the bespoke tailoring market.

- **Schedule Feasibility:** Considering our team's expertise and experience, building TailorMaven is feasible, although our familiarity with certain technical stacks may require additional time for learning and implementation. We aim to start early to accommodate any learning curves and ensure timely completion. By adhering to a structured development process with regular sprints, we plan to finish building the product before the established deadline, maintaining a balance between quality and time constraints.


## Functional Requirements:
- User Authentication and Profile Management
- Admin Dashboard
- Designing Suit
- Visualization of Suit
- Gifting Suit
- Ordering Process
- Order Tracking
- Connecting with Admin

## Non-Functional Requirements:
- Performance
- Security
- Reliability
- Usability
- Compatibility

# Dev Logs
### Sprint 1:

*Work Done:* \
The first week of developing was totally focused on learning the MERN stack. None of our team memebers are familiar with MERN stack except React.js. So we couldn't really build that many features. The frontend team worked on building a basic landing page and the user sign in and register page, while the backend team worked on Authentication. We will provide two types of authentication, sign in with username/password and sign in with google. The backend team implemented Google sing in using OAuth2.0 in sprint 1. However, as none of us were familiar with the technologies used, we couldn't connect the database with the server. The user can sign in but no information is stored anywhere, we just made sure that google can authenticate our user and send back the necessary informations. So far in sprint 1, the frontend and the backend is not connected yet. The first week was totally spent figuring out how things work and we aim to properly dive deep in development from the next sprint.
 - ✅ Authentication: Google
 - ✅ Landing Page
 - ❌ Authentication: Username/Password
 - ❌ Connecting Authentication with Frontend
 - ❌ Database

*Plans for next Sprint:* \
The backend team aims to complete the authentication system using both methods while also properly connecting the database so that user information is stored securely. We will also start working on our product database and handle requests and response to fetch/store data. \
The frontend team aims to complete the suit matarial selection pages and connect the frontend with the backend through necessary API calls to the server.
### Sprint 2:

*Work Done:* \
For sprint 2, we mainly focused on the backend. The backend team finished working on authentication. The server API can now successfully authenticate users using both Google and Username/Password method. We used token based authentication. The frontend team connected the authentication API to the frontend. Then we implemented the database and necessary controllers for CRUD operations on our products: Suit and Fabric. The suit designing process is yet to made on the frontend. As this sprint overlapped with our midterm exam, no further work could've been done.
 - ✅ Authentication using Username/Password
 - ✅ Connected Authentication with Frontend
 - ✅ Impemented and Deployed Database
 - ✅ Created database models for User, Suit, & Fabric
 - ✅ Implemented CRUD APIs for database models

*Plans for next Sprint:* \
 So far, the frontend is lacking behind the backend so hopefully next sprint it will catch up. We aim to implement the suit desiging page properly in the next sprint while also working on the suit visualizing process. 

### Sprint 3:

*Work Done:* \
In sprint 3, we finished two features and started working on the suit visualizing feature. We implemented the admin dashboard and chatting with admin feature first. Although admin dashboard is not connected fully with the backend, it just shows informations but you can't manupulated data yet. Chatting with admin feature has been implemented with the the help of **Socket.io**, it is a websocket framework that helped us with instant messaging. For suit visualization, we used **React Three Fiber (R3F)**. I created the base 3D model in blender, then changed the material with texture images using R3F. Image upload was not done within sprint 3, so the texture images were stored manually. 
 - ✅ Admin API
 - ✅ API access permissions
 - ✅ Chat feature
 - ✅ Admin Dashboard Page
 - ✅ Suit Visualization Prototype
 - ✅ Redesign landing page
 - ✅ Logout functionality on Frontend
 - ❌ Connecting Admin API with frontend
 - ❌ Handling image uploads

*Plans for next Sprint:* \
For the 4th and final sprint, we have to finish the project so we just need to finish as much features as possible. We will focus on finishing implementing the features listed above and refine them as we go. 



