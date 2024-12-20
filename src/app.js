const express = require('express');
const fs = require('fs');
const session = require('express-session');
const path = require('path');

const homeRoutes = require('./routes/home');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const dashboardRoutes = require('./routes/dashboard');
const logoutRoutes = require('./routes/logout');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Express session configuration
app.use(session({
    secret: process.env.SESS_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

// Routes
app.use('/', homeRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/logout', logoutRoutes);

const usersPath = path.join(__dirname, 'data', 'users.json'); 

// Check if the 'data' directory exists
const dataDir = path.dirname(usersPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true }); // Create the 'data' directory if it doesn't exist
}

// Check if the 'users.json' file exists and create it if it doesn't
if (!fs.existsSync(usersPath)) {
  fs.writeFileSync(usersPath, '[]');
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
