<<<<<<< HEAD
# FastMed Project

## Overview
**FastMed** is a health-tech platform designed to provide users with various healthcare-related services, including an AI chatbot for medical queries, hospital search, appointment booking, and pharmacy ordering. The project is divided into a **frontend** built with React and a **backend** (to be developed) using Express, Mongoose, and CORS.


# Project Structure
The project is structured as follows:
```plaintext
## Top-Level Structure:
FastMed/
├── frontend/         # Frontend React.js application
├── backend/          # Backend Node.js and Express.js application
├── docs/             # Documentation, project plans, and architecture diagrams
├── scripts/          # Utility scripts for deployment or automation
└── README.md         # Project overview and instructions

## Detailed Frontend Structure:
frontend/
├── public/                    # Static public files (served directly)
│   ├── index.html             # Main HTML file
│   └── favicon.ico            # Favicon
├── src/                       # Application source code
│   ├── assets/                # Static assets like images, icons, styles
│   ├── components/            # Reusable components (e.g., Navbar, Footer)
│   ├── pages/                 # Individual pages for routing
│   │   ├── HomePage.jsx
│   │   ├── ChatbotPage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── AppointmentPage.jsx
│   │   └── PharmacyPage.jsx
│   ├── context/               # Context providers for state management
│   ├── hooks/                 # Custom hooks
│   ├── services/              # API service functions (e.g., fetch APIs)
│   ├── App.js                 # Main app component
│   ├── index.js               # React entry point
│   └── routes.js              # App routing definitions
├── .env                       # Environment variables
├── package.json               # Frontend dependencies
└── README.md                  # Frontend-specific documentation

## Detailed Backend Structure:
backend/
├── src/                       # Source code for backend
│   ├── config/                # Configurations (e.g., database, environment variables)
│   │   ├── db.js              # MongoDB connection logic
│   │   └── dotenv.js          # Environment variable loader
│   ├── controllers/           # Business logic for each feature
│   │   ├── chatbotController.js
│   │   ├── hospitalController.js
│   │   ├── appointmentController.js
│   │   └── pharmacyController.js
│   ├── models/                # MongoDB schemas
│   │   ├── User.js
│   │   ├── Hospital.js
│   │   ├── Appointment.js
│   │   └── Medicine.js
│   ├── routes/                # API endpoints
│   │   ├── chatbotRoutes.js
│   │   ├── hospitalRoutes.js
│   │   ├── appointmentRoutes.js
│   │   └── pharmacyRoutes.js
|   |__ db/
|   |   |__ index.js
│   ├── middlewares/           # Middleware for authentication, error handling
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── utils/                 # Utility functions
│   │   ├── logger.js
│   │   └── responseHelper.js
|   |   |__ ApiError.js
|   |   |__ ApiResponse.js
|   |   |__ asyncHandler.js
│   ├── app.js                 # Express app setup
|   |__ constants.js
|   |__ index.js
│   ├── server.js              # Server entry point
│   └── .env                   # Backend environment variables
|   |__.env.sample
|   |__ .prettierignore
|   |__ .prettierrc
├── package.json               # Backend dependencies
├── README.md                  # Backend-specific documentation

## Scripts Folder:
scripts/
├── deploy-frontend.sh         # Script for deploying the frontend
├── deploy-backend.sh          # Script for deploying the backend
└── db-seed.js                 # Script for seeding initial data to the database

## Docs Folder:
docs/
├── project-plan.md            # Project roadmap and feature breakdown
├── architecture-diagram.png   # System architecture diagram
└── api-documentation.md       # API endpoints and usage
```

## Technologies Used
- **Frontend**: React (for building the UI)
- **Backend**: Express (for API routes), Mongoose (for MongoDB interaction), CORS (for cross-origin requests)
- **Database**: MongoDB (to be set up for storing data)

## Current Progress
### 1. **Basic Setup** (Completed)
- Created the main folder structure for the project.
- Initialized Git and linked the repository to GitHub.
- Set up the basic structure for the **frontend** using React.
  - Created placeholder files for **components** (Button, Header).
  - Set up basic pages for **Home** and **Hospital Search**.
  - The basic React app is running with minimal code in place.
 
  Summary:   Quick summary of the tasks we’ve accomplished:

    Folder Structure:
      Created the necessary folders for frontend and backend within the main project folder.
      Initialized Git repository.
  
    Frontend Setup:
      Initialized React project in the frontend folder.
      Installed necessary dependencies (react, react-dom, etc.).

    Backend Setup:
      Set up Express server in the backend folder.
      Installed necessary dependencies (express, mongoose, cors).
  
    Git Integration:
      Linked the project to a GitHub repository.
      Committed the initial code and pushed it to the repository.
    App Initialization:
      Both frontend and backend are set up and can be run locally using npm start for the frontend and node server.js for the backend.
 
### 2. **Next Steps**
1. **AI Chatbot**: 
   - Integrate an AI-driven chatbot to handle medical-related queries.
   - The chatbot will provide information on common illnesses and guide users in case no doctors are available online.

2. **Hospital Search**:
   - Integrate a feature to allow users to search for nearby hospitals based on their location.
   - Display hospitals with relevant details and routing to reach them.

3. **Appointment Booking**:
   - Allow users to make appointments with either physical doctors or online consultations.

4. **Pharmacy Ordering**:
   - Implement pharmacy features where users can search for medicines, add them to the cart, and proceed to the payment.

### Platform's Core Functionalities
  ## Homepage (Landing Page)
  
  ## A welcoming page where users can see the platform's features (e.g., hospital search, appointments, pharmacy orders).
  Includes a navigation bar to explore different sections.
  
  ## Hospital Search
  
    Two Search Methods:
  
    a) Manual Search:
    Users manually input their current location or let the platform fetch it via the browser's Geolocation API.
    They type a hospital name (e.g., "Apollo") to see a list of matching hospitals, sorted by distance from their location.
    A map shows the user's location and hospitals near them (no routes initially).
    
    b) Filtered Search:
    Users select from dropdowns:
    Illness Type (e.g., Cardiology, Orthopedics).
    Number of Hospitals to display (e.g., 5 nearest or 10 nearest).
    The platform fetches hospitals offering relevant facilities within a set radius.
    Results are shown as a list with distance and basic details.
    The map highlights the user's location and hospital locations.
  
  Appointment System
  
 ## Users can select a hospital and book an appointment.
  The system shows available doctors and time slots.
  Once an appointment is booked, confirmation is sent to the user.
  Pharmacy Orders
  
 ## Users can search for medications, view details, add to a cart, and proceed to payment.
  Medicines can be delivered to the user's address or picked up from a nearby pharmacy.
  AI Chatbot
  
 ## A conversational assistant to answer health-related queries.
  Can suggest the nearest hospitals or help book appointments.
  Redirects users to the hospital search or appointment pages when necessary.
  User Authentication
  
 ## Secure login/signup for users to access personalized features like saved searches or past appointments.
  Authentication handled via JWT in the backend.

## Workflow
- Start with basic setup and placeholder components.
- Develop each feature one by one in the following order:
  1. Basic Setup (Completed)
  2. AI Chatbot Integration
  3. Hospital Search Functionality
  4. Appointment Booking System
  5. Pharmacy Ordering System
  6. Online Consultation Integration

progress
phase 1:

executed each line at a time::

mkdir fastmed
cd fastmed
npx create-react-app frontend
cd frontend
npm install react-router-dom axios
cd ..
git add .
git commit -m"Add frontend React app"
mkdir backend
cd backend
npm init -y
npm install express mongoose dotenv cors 
mkdir contollers models routes
touch server.js
cd ..
git add .
git commit -m "Add backend structure"    
git remote add origin https://github.com/Akashpg-M/FastMed.git
git push -u origin main
cd frontend/src
mkdir components pages

