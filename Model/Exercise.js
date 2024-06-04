const mongoose =  require('mongoose');

//define the Exercise Schema

const ExerciseSchema = new mongoose.Schema({
    questionSound: {
    type: String,
    required: true,
    },
    questionText: {
    type: String,
    required: true,
    },
    suggestedAnswer: {
    type: String,
    required: true,
    },
    imageURLs: {
    type: String,
    required: true,
    },
    });
    
    // Create the Exercise model
    const Exercise = mongoose.model('exercises', ExerciseSchema);
    
    module.exports = Exercise;