
const express = require('express');

const router = express.Router();
const fs = require("fs");

const axios = require('axios');
const FormData = require('form-data');


// Mock function to simulate answer correction logic
// In a real scenario, this would involve more complex logic or database operations
function correctAnswer(question, answer, userID) {
    // This is a placeholder. You can implement actual logic based on your requirements.
    return {
        correction: "Corrected Answer Placeholder",
        input: answer, // Echoing back the input answer for simplicity
    };
}

router.post('/rectify', (req, res) => {
    const { question, text: answer, userID } = req.body;

    const result = correctAnswer(question, answer, userID);

    res.json({
        correction: result.correction,
        input: result.input,

    });
});

router.post('/transcribe', async (req, res) => {
    // try {
    //     const {
    //         audio,
    //         service,
    //         code,
    //         userID
    //     } = req.body;


    //     // Assuming `audio` is your base64 encoded string
    //     const buffer = Buffer.from(audio, 'base64');
    //     const fileName = "userAudio.mp3";
    //     //convert audio from base64 to a file
    //     fs.writeFileSync(fileName, buffer);

    //     const gladiaKey = "5e793542-e5c0-48a2-9b09-5d3a5b5bd8e3";
    //     const audioFile = fs.createReadStream(fileName);

    //     const formData = new FormData();
    //     formData.append('audio', audioFile);

    //     const response = await axios.post('https://api.gladia.io/v2/upload', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             'x-gladia-key': gladiaKey
    //         }
    //     });

    //     const { data } = response[audio_url];
    //     // console.log("data" + data);
    //     res.json({
    //         data, response
    //     });
    // }
    // catch (e) {
    //     res.status(500).json({
    //         error: "Internal Server Error ",
    //         message: e.message,
    //         fullErrror: e
    //     });
    // }
    try {
        const { audio } = req.body;
        let audioUrl;
        if (!audio) {
            return res.status(400).json({ error: "Audio data is missing." });
        }
        const buffer = Buffer.from(audio, 'base64');
        const fileName = "userAudio.mp3";
        const gladiaKey = "5e793542-e5c0-48a2-9b09-5d3a5b5bd8e3";

        fs.writeFileSync(fileName, buffer);
        const form = new FormData();
        form.append("audio", fs.createReadStream(fileName));

        var result = await axios.post('https://api.gladia.io/v2/upload', form, {
            headers: {
                ...form.getHeaders(),
                'x-gladia-key': gladiaKey,
            },
        })
        audioUrl = result.data.audio_url;

        const options = {
            headers: {
                'x-gladia-key': gladiaKey,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ audio_url: audioUrl })
        };
        // Step 1: Start the transcription process
        const transcribeUrl = 'https://api.gladia.io/v2/transcription';
        var transcriptResponse = await axios.post(transcribeUrl, options.data, { headers: options.headers });

        // Assuming the API returns a URL to check the status in transcriptResponse.data.status_url
        const statusUrl = transcriptResponse.data.result_url;

        // Step 2: Polling for status
        let status = "queued"; // Initial assumed status
        while (status !== "done") {
            // Wait for 5 seconds before checking the status again
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check the current status
            var statusResponse = await axios.get(statusUrl, { headers: { 'x-gladia-key': gladiaKey } });
            status = statusResponse.data.status; // Assuming the API returns the status in this field
        }

        // Step 3: Retrieve the result once status is "done"
        var transcriptText = await axios.get(transcriptResponse.data.result_url, { headers: { 'x-gladia-key': gladiaKey } });


        res.json({

            transcript: transcriptText.data.result.transcription.full_transcript,
        });
        // const transcribeUrl = 'https://api.gladia.io/v2/transcription';


        // var transcript = await axios.post(transcribeUrl, options.data, { headers: options.headers });
        // const options2 = {
        //     headers: {
        //         'x-gladia-key': gladiaKey,
        //         'Content-Type': 'application/json'
        //     },
        //     data: JSON.stringify({ status: "done" }) // Added status parameter here
        // };
        // var transcriptText = await axios.get(transcript.data.result_url, options2.data, {
        //     headers: options2.headers
        // });
        // res.json({
        //     audioUrl: audioUrl,
        //     transcript: transcript.data.result_url,
        //     transcriptText: transcriptText.data
        // });
    }
    catch (e) {

        res.status(500).json({
            error: "Internal Server Error ",
            message: e.message,
            fullErrror: e
        });
    }

})

module.exports = router;