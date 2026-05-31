const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express();

// 1. GLOBAL MIDDLEWARE MUST GO FIRST (Parses the data)
app.use(cors());
app.use(express.json()); 

// 2. API ROUTES GO SECOND (Uses the parsed data)
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Export the app object for testing
if (require.main === module) {
    connectDB();
    // If the file is run directly, start the server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;