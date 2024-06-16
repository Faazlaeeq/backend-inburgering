const express = require('express');
const router = express.Router();
// const Exercise = require('../Model/Exercise');
// const multer = require('multer');
// const { Readable } = require('stream');
// const { ObjectId } = require('mongodb');
// const mongodb = require('mongodb');
// const mongoose = require('mongoose');
// const storage = multer.memoryStorage();
// const upload = multer({ 
//   storage: storage, 
//   limits: { 
//     fields: 10, 
//     fileSize: 6000000, 
//     files: 1, 
//     parts: 10 
//   } 
// });

// router.post('/Exercise', upload.single('questionSound'), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "Upload Request Validation Failed: No file uploaded" });
//   }
//   if (!req.body.questionText) {
//     return res.status(400).json({ message: "No question in request body" });
//   }

//   const Question = req.body.questionText;

//   // Convert buffer to Readable Stream
//   const readableTrackStream = new Readable();
//   readableTrackStream.push(req.file.buffer);
//   readableTrackStream.push(null);

//   let db;
//   try {
//     db = mongoose.connection.db; // Use the existing mongoose connection
//   } catch (err) {
//     console.error("Error accessing database", err);
//     return res.status(500).json({ message: "Error accessing database" });
//   }

//   const bucket = new mongodb.GridFSBucket(db, {
//     bucketName: 'questionSound'
//   });

//   const uploadStream = bucket.openUploadStream(Question);
//   const id = uploadStream.id;
//   console.log(`Uploading file with ID: ${id}`); // Log file ID
//   readableTrackStream.pipe(uploadStream);

//   uploadStream.on('error', (error) => {
//     console.error("Error uploading file", error);
//     return res.status(500).json({ message: "Error uploading file", error });
//   });

//   uploadStream.on('finish', async () => {
//     const { questionText, suggestedAnswer, imageURLs } = req.body;

//     if (!suggestedAnswer || !imageURLs) {
//       return res.status(400).json({ message: "Required fields missing in request body" });
//     }

//     const newExercise = new Exercise({
//       questionSound: id,
//       questionText,
//       suggestedAnswer,
//       imageURLs
//     });

//     try {
//       await newExercise.save();
//       console.log(`Exercise saved with ID: ${newExercise._id}`);
//       return res.status(201).json({ message: "Exercise saved successfully" });
//     } catch (err) {
//       console.error("Error saving exercise", err);
//       return res.status(500).json({ message: "Error saving exercise", error: err.message });
//     }
//   });
// });

// // Get a product by ID
// router.get('/Exercise/:id', async (req, res) => {
//   let trackID;
//   try {
//     trackID = new ObjectId(req.params.id);
//   } catch (err) {
//     console.error(`Invalid trackID: ${req.params.id}`, err);
//     return res.status(400).json({
//       message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters"
//     });
//   }

//   res.set('content-type', 'audio/mp3');
//   res.set('accept-ranges', 'bytes');

//   const db = mongoose.connection.db; // Ensure this is correctly set up
//   const bucket = new mongodb.GridFSBucket(db, {
//     bucketName: 'questionSound' // The bucket name you used to store the audio files
//   });

//   const downloadStream = bucket.openDownloadStream(trackID);

//   downloadStream.on('data', (chunk) => {
//     res.write(chunk);
//   });

//   downloadStream.on('error', (error) => {
//     console.error('Stream error', error);
//     res.sendStatus(404);
//   });

//   downloadStream.on('end', () => {
//     res.end();
//   });
// });

router.get("/listUserExcercises", (req, res) => {
  res.json({
    "questionsCount": 5,
    "exercises": [
      {
        "category": "Questions with Images",
        "categorySorting": 0,
        "speakingTests": [
          {
            "id": "f655b6f1-f062-454f-856f-e8fdae372297",
            "questionsCount": 2,
            "isPaid": "false",
            "exerciseName": "Describe the image",
            "type": "Exercise"
          },
          {
            "id": "63d97bb2-5678-47a2-8ebc-b1f84b27e5d4",
            "category": "Questions with Images",
            "categorySorting": 0,
            "questionsCount": 1,
            "isPaid": "false",
            "exerciseName": "2 Choice",
            "type": "Exercise"
          }
        ]
      },
      {
        "category": "Starting with question words",
        "categorySorting": 1,
        "speakingTests": [
          {
            "id": "2bc87dc9-5390-48d2-84c0-2b5ea2b80162",
            "questionsCount": 1,
            "isPaid": "false",
            "exerciseName": "Waar?",
            "type": "Exercise"
          },
          {
            "id": "ad21055d-cf5e-422d-a65e-81c4a95e19ef",
            "category": "Starting with question words",
            "categorySorting": 1,
            "questionsCount": 1,
            "isPaid": "false",
            "exerciseName": "Hoe?",
            "type": "Exercise"
          }
        ]
      }
    ]
  });
});
module.exports = router;