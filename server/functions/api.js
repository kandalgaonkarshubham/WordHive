// This file is customsed for Production on Netlify

const express = require("express");
const serverless = require("serverless-http");
const app = express();
var axios = require("axios").default;
const voice = require("elevenlabs-node");
var cors = require('cors');
const router = express.Router();
// app.use(cors());



let apiKey = "";

// Middleware to activate the API key
const activateApiKeyMiddleware = (time) => {
  if (apiKey) {
    // Use the API key here in your HTTP requests (e.g., set it as a header)
    console.log("API key activated");
    // Deactivate the API key after specified time
    setTimeout(() => {
      apiKey = ""; // Clear the API key
      console.log("API key deactivated");
    }, time * 60 * 1000); // time in milliseconds
  }
};

// Route to receive Activate Api call and activate the API key
router.get("/activateAPI", (req, res) => {
  const tValue = req.query.t;
  console.log("t value:", tValue);

  if (apiKey) {
    res.status(400).json({ success: false, message: "API key is already active" });
  }else{

    if (tValue != 0) {

      apiKey = process.env.API_KEY; // Accesing ApiKey from Netlify
      activateApiKeyMiddleware(1);

      // Send a success response
      res.json({ success: true, message: `API key activated successfully for ${tValue} minutes` });
    } else {
      // Send an error response for invalid tValue
      res.status(400).json({ success: false, message: "Invalid Value provided" });
    }

    res.send("Received Api Activation Request");
  }
});


router.get("/search", async (req, res) => {
  const { searchWord } = req.query;

  const urls = [
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/synonyms`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/antonyms`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/rhymes`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/definitions`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/examples`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/pronunciation`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/syllables`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/frequency`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/typeOf`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/hasParts`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/instanceOf`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/hasInstances`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/similarTo`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/also`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/entails`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/memberOf`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/hasMembers`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/substanceOf`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/hasSubstances`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/inCategory`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/hasCategories`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/usageOf`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/hasUsages`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/inRegion`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/regionOf`,
    `https://wordsapiv1.p.rapidapi.com/words/${searchWord}/pertainsTo`
    // 27 API Calls
  ];

  const data = {};

  try {
    // Make the first API call
    const response = await axios.get(urls[0], {
      headers: {
        'X-RapidAPI-Key': `${apiKey}`,
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
      },
    });

    // Process the response and store it in data
    data[urls[0].split("/").pop()] = response.data;

    // Make subsequent API calls
    for (let i = 1; i < urls.length; i++) {
      const response = await axios.get(urls[i], {
        headers: {
          'X-RapidAPI-Key': `${apiKey}`,
          'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        },
      });
      data[urls[i].split("/").pop()] = response.data;
    }
    res.json(data);

  } catch (error) {

    console.log(" wordapi logs")
    console.error(error);
  
    if (error.response.data.message === 'Invalid API key. Go to https://docs.rapidapi.com/docs/keys for more info.') {
      res.status(999).json({ error: error.response.data.message });
    }else{
      res.status(500).json({ error: error.response.data.message });
    }

  }

  // let response = {};
  // response.data = {
  //   "": {
  //     "word": "hatchback",
  //     "results": [
  //       {
  //         "definition": "a sloping rear car door that is lifted to open",
  //         "partOfSpeech": "noun",
  //         "synonyms": ["hatch", "hatchback door", "liftgate"],
  //         "typeOf": ["car door"]
  //       },
  //       {
  //         "definition": "a car having a hatchback door",
  //         "partOfSpeech": "noun",
  //         "typeOf": ["auto", "automobile", "car", "machine", "motorcar"]
  //       }
  //     ],
  //     "syllables": {
  //       "count": 2,
  //       "list": ["hatch", "back"]
  //     },
  //     "pronunciation": {
  //       "all": "'hætʃbæk",
  //       "noun": "wɪnd",
  //       "verb": "waɪnd",
  //     },
  //     "frequency": 1.288
  //   },
  //   "synonyms": {
  //     "word": "hatchback",
  //     "synonyms": ["hatch", "hatchback door", "liftgate"]
  //   },
  //   "antonyms": {
  //     "word": "hatchback",
  //     "antonyms": []
  //   },
  //   "rhymes": {
  //     "word": "hatchback",
  //     "rhymes": {
  //       "all": ["hatchback"]
  //     }
  //   },
  //   "definitions": {
  //     "word": "hatchback",
  //     "definitions": [
  //       {
  //         "definition": "a sloping rear car door that is lifted to open",
  //         "partOfSpeech": "noun",
  //       },
  //       {
  //         "definition": "a car having a hatchback door",
  //         "partOfSpeech": "noun",
  //       },
  //       {
  //         "definition": "a car having a hatchback door",
  //         "partOfSpeech": "noun",
  //       },
  //     ]
  //   },
  //   "examples": {
  //     "word": "hatchback",
  //     "examples": [
  //       "they hired additional help to finish the work",
  //       "there's no help for it",
  //       "These pills will help the patient",
  //       "Everyone helped out during the earthquake",
  //       "Can you help me carry this table?",
  //       "She never helps around the house",
  //       "offered his help in unloading",
  //       "I can't help myself--I have to smoke",
  //       "She could not help watching the sad spectacle",
  //       "This will help to prevent accidents",
  //       "I served him three times, and after that he helped himself",
  //       "She helped herself to some of the office supplies",
  //       "This money will help the development of literacy in developing countries",
  //       "New slipcovers will help the old living room furniture"
  //     ]
  //   },
  //   "pronunciation": {
  //     "word": "hatchback",
  //     "pronunciation": {
  //       "all": "'hætʃbæk",
  //       "noun": "wɪnd",
  //       "verb": "waɪnd",
  //     },
  //   },
  //   "syllables": {
  //     "word": "hatchback",
  //     "syllables": {
  //       "count": 2,
  //       "list": ["hatch", "back"]
  //     }
  //   },
  //   "frequency": {
  //     "word": "hatchback",
  //     "frequency": {
  //       "zipf": 1.97,
  //       "perMillion": 2.08,
  //       "diversity": 0.17
  //     }
  //   },
  //   "typeOf": {
  //     "word": "hatchback",
  //     "typeOf": ["car door", "auto", "automobile", "car", "machine", "motorcar"]
  //   },
  //   "hasParts": {
  //     "word": "hatchback",
  //     "hasParts": []
  //   },
  //   "instanceOf": {
  //     "word": "hatchback",
  //     "instanceOf": []
  //   },
  //   "hasInstances": {
  //     "word": "hatchback",
  //     "hasInstances": []
  //   },
  //   "similarTo": {
  //     "word": "hatchback",
  //     "similarTo": []
  //   },
  //   "also": {
  //     "word": "hatchback",
  //     "also": []
  //   },
  //   "entails": {
  //     "word": "hatchback",
  //     "entails": []
  //   },
  //   "memberOf": {
  //     "word": "hatchback",
  //     "memberOf": []
  //   },
  //   "hasMembers": {
  //     "word": "hatchback",
  //     "hasMembers": []
  //   },
  //   "substanceOf": {
  //     "word": "hatchback",
  //     "substanceOf": []
  //   },
  //   "hasSubstances": {
  //     "word": "hatchback",
  //     "hasSubstances": []
  //   },
  //   "inCategory": {
  //     "word": "hatchback",
  //     "inCategory": []
  //   },
  //   "hasCategories": {
  //     "word": "hatchback",
  //     "hasCategories": []
  //   },
  //   "usageOf": {
  //     "word": "hatchback",
  //     "usageOf": []
  //   },
  //   "hasUsages": {
  //     "word": "hatchback",
  //     "hasUsages": []
  //   },
  //   "inRegion": {
  //     "word": "hatchback",
  //     "inRegion": []
  //   },
  //   "regionOf": {
  //     "word": "hatchback",
  //     "regionOf": []
  //   },
  //   "pertainsTo": {
  //     "word": "hatchback",
  //     "pertainsTo": []
  //   }
  // };
  // res.json(response.data);


});


router.get("/tts", (req, res) => {
  const apiKey = "adb2c401473b23917a83efeb80f42503";
  const voiceID = "AZnzlk1XvdvUeBnXmlld";
  // const fileName = "audio.mp3";
  const textInput = req.query.text;

  voice.textToSpeechStream(apiKey, voiceID, textInput)
    .then((response) => {
      const audioData = [];

      response.on("data", (chunk) => {
        audioData.push(chunk);
      });

      response.on("end", () => {
        const audioBuffer = Buffer.concat(audioData);
        const base64Audio = audioBuffer.toString("base64");
        const audioSrc = `data:audio/mp3;base64,${base64Audio}`;
        res.send({ audioSrc });
      });
    })
    .catch((error) => {
      console.log("tts logs")
      console.error(error);
      res.status(500).send("Error occurred during text-to-speech conversion.");
    });
});


app.use('/', router);

module.exports.handler = serverless(app);