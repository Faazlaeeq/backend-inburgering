//import required modules

const express = require('express');

const mongoose = require('mongoose');

const bodyParse = require('body-parser');

const cors = require('cors');


// create an express application 

const app = express();

//set up middleware
app.use(bodyParse.json({ limit: '50mb' }));

app.use(cors());


// Middleware to validate API key
const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = '123456'; // Replace this with your actual API key

    if (!apiKey || apiKey !== validApiKey) {
        return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
    }

    next(); // Proceed to the next middleware/route handler if the API key is valid
};
//connect to mongoDb

mongoose.connect('mongodb+srv://fa22adsd0005:12345@practice.do1o5du.mongodb.net/Exercises', {
    useNewUrlparser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

//define Routes

const ExcercisesRoute = require('./Routes/Exercises');
const answerRoute = require('./Routes/Answer');
const QuestionRoute = require('./Routes/Question');
app.use('/api', validateApiKey);
app.use('/api', ExcercisesRoute);
app.use('/api', answerRoute);
app.use('/api', QuestionRoute);

//Handle 404 errors

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//Error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

//Start the server

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});