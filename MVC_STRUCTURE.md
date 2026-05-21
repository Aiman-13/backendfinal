# Travel Booking Application - MVC Architecture

## Project Structure

Your project has been successfully reorganized into a proper **MVC (Model-View-Controller)** architecture. Here's the complete structure:

```
backendfinal/
│
├── config/                          # Configuration Files
│   ├── database.js                 # MongoDB connection
│   ├── multer.js                   # File upload configuration
│   └── passport.js                 # Google OAuth configuration
│
├── controllers/                     # Business Logic
│   ├── authController.js           # Authentication handlers (signup, login, Google OAuth)
│   ├── bookingController.js        # Booking handlers
│   ├── feedbackController.js       # Feedback handlers
│   ├── destinationController.js    # Destination & Gallery handlers
│   └── profileController.js        # User profile handlers
│
├── middleware/                      # Middleware Functions
│   └── auth.js                     # JWT authentication middleware
│
├── models/                          # Data Models (Schemas)
│   ├── User.js                     # User schema with bcrypt password hashing
│   ├── Booking.js                  # Booking schema
│   └── Feedback.js                 # Feedback schema
│
├── routes/                          # Route Definitions
│   ├── auth.js                     # Authentication routes
│   ├── booking.js                  # Booking routes
│   ├── feedback.js                 # Feedback routes
│   ├── destination.js              # Destination routes
│   └── profile.js                  # Profile routes
│
├── utils/                           # Utility Functions
│   ├── destinations.js             # Destination data constants
│   └── jwt.js                      # JWT token generation
│
├── views/                           # EJS Templates (View Layer)
│   ├── home.ejs
│   ├── signup.ejs
│   ├── signin.ejs
│   ├── main.ejs
│   ├── booking.ejs
│   ├── destination.ejs
│   ├── destination_info.ejs
│   ├── feedback.ejs
│   ├── gallery.ejs
│   ├── packages.ejs
│   ├── profile.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
│
├── public/                          # Static Files
│   ├── css/                        # Stylesheets
│   ├── images/                     # Image assets
│   ├── uploads/                    # User uploaded files
│   └── main.js                     # Client-side JavaScript
│
├── index.js                         # Main Application Entry Point
├── package.json                     # Project dependencies
└── users.json                       # Data file (if needed)
```

## Architecture Explanation

### 1. **Models** (`models/` folder)
Defines database schemas using Mongoose:
- **User.js**: Handles user data with password hashing using bcryptjs
- **Booking.js**: Stores booking information
- **Feedback.js**: Stores user feedback

### 2. **Controllers** (`controllers/` folder)
Contains business logic and request handlers:
- **authController.js**: Handles signup, login, and Google OAuth
- **bookingController.js**: Manages booking creation
- **feedbackController.js**: Manages feedback submission
- **destinationController.js**: Displays destinations and gallery
- **profileController.js**: User profile management

### 3. **Routes** (`routes/` folder)
Defines API endpoints and maps them to controllers:
- **auth.js**: /signin, /signup, /login, /auth/google
- **booking.js**: /booking, /book
- **feedback.js**: /feedback, /feed
- **destination.js**: /destination, /destination_info, /packages, /gallery
- **profile.js**: /profile, /profile/update, /mainx

### 4. **Middleware** (`middleware/` folder)
- **auth.js**: JWT authentication middleware that protects routes

### 5. **Config** (`config/` folder)
- **database.js**: MongoDB connection
- **multer.js**: File upload handling
- **passport.js**: Google OAuth strategy

### 6. **Utils** (`utils/` folder)
- **destinations.js**: Destination data constants
- **jwt.js**: JWT token generation utility

### 7. **Views** (`views/` folder)
EJS templates for rendering HTML with embedded logic

### 8. **Public** (`public/` folder)
Static assets - CSS, images, client-side JavaScript

## Key Features

✅ **Separation of Concerns**: Models, Views, and Controllers are cleanly separated
✅ **Modular Routes**: Each feature has its own route file
✅ **Centralized Configuration**: All config in one place
✅ **Reusable Middleware**: Authentication middleware protects routes
✅ **Utility Functions**: Common functions in utils folder
✅ **Easy to Maintain**: Add new features by creating new controller, route, and model files

## Running the Application

```bash
npm install
npm start
```

The application will start on port 805.

## Database Connection

Make sure MongoDB is running on `localhost:27017`. The connection string is in `config/database.js`.

## Adding New Features

To add a new feature:

1. Create a **Model** in `models/NewFeature.js`
2. Create a **Controller** in `controllers/newFeatureController.js`
3. Create a **Route** in `routes/newFeature.js`
4. Import the route in `index.js`
5. Create **Views** in `views/` folder

## Environment Variables

Consider moving sensitive data to environment variables:
- MongoDB connection string
- JWT secret
- Google OAuth credentials
- Port number

Create a `.env` file and use `dotenv` package for this.

---

Your project is now properly organized following MVC best practices! 🎉
