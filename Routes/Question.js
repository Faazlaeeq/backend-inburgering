const router = require('express').Router();

router.get('/listQuestions', (req, res) => {
    const data = {
        "exercises": [
            {
                "id": "3f5e6814-be38-4ffe-9865-6dd8bafc37d1",
                "excerciseID": "f655b6f1-f062-454f-856f-e8fdae372297",

                "questionData": {
                    "answerSound": "",
                    "images": [],
                    "imageURLs": [
                        "https://langtools-app-content-gamma-eu-west-3.s3.amazonaws.com/images/describe-1-a.png",
                        "https://langtools-app-content-gamma-eu-west-3.s3.amazonaws.com/images/describe-1-b.png"
                    ],
                    "questionSound": "2TEkgPAAAGkAAAAIAAANIAAAAS",
                    "questionText": "Janine is in de keuken. Kijk naar alle plaatjes. Vertel wat Janine doet. Vertel iets over alle plaatjes.",
                    "suggestedAnswer": "Janine staat in de keuken en laat een whiteboard zien. Ze toont ook een stuk taart."
                },
                "questionType": "Choice",
                "type": "Question"
            },
            {
                "id": "3f5e6814-be38-4ffe-9865-6dd8bafc37d2",
                "excerciseID": "f655b6f1-f062-454f-856f-e8fdae372297",

                "questionData": {
                    "answerSound": "2TEkgPAAAGkAAAAIAAANIAAAAS",
                    "images": [],
                    "imageURLs": [
                        "https://langtools-app-content-gamma-eu-west-3.s3.amazonaws.com/images/describe-2-a.png",
                        "https://langtools-app-content-gamma-eu-west-3.s3.amazonaws.com/images/describe-2-b.png"
                    ],
                    "questionSound": "2TEkgPAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=",
                    "questionText": "Maria werkt als stewardess. Kijk naar alle plaatjes. Vertel wat Maria doet. Vertel iets over alle plaatjes.",
                    "suggestedAnswer": "Maria begroet een passagier hartelijk en serveert eten aan de klant."
                },
                "questionType": "Choice",
                "type": "Question"
            }
        ]
    };
    const exerciseId = req.query.excerciseID;
    const questions = data.exercises.filter(exercise => exercise.excerciseID === exerciseId);
    res.json(questions);
});
module.exports = router;
