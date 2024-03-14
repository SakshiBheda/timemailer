// index.js
require('./scheduler');

const express = require('express');
const mongoose = require('mongoose');
const emailRoutes = require('./routes/emailRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://sakshibheda35:WMNtnnn2oKFgCIIu@cluster0.qkbzhwk.mongodb.net/';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
});

app.use(express.json());

// Routes setup
app.use('/api', emailRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
