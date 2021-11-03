require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const {IamAuthenticator} = require('ibm-watson/auth');

const languageTranslator = new LanguageTranslatorV3({
	version: '2018-05-01',
	authenticator: new IamAuthenticator({
		apikey: 'eFyM8udgScH0IO1xqEJHh5FKWiA-WLMRToSBponuQ0gt',
	}),
	serviceUrl: 'https://api.eu-de.language-translator.watson.cloud.ibm.com/instances/457435fe-9e4a-47ed-98ec-ef77fd2a9d6a',
	disableSslVerification: true,
});

const translit = require("cyrillic-to-translit-js");

const axios = require("axios");

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser());
app.use(cors());

function translateCity(city) {

}

app.post("/get/one", (req, res) => {
	axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + String(req.body.city) + "&lang=ru&appid=" + process.env.OWM_TOKEN).then((d) => {
		res.send({
			weather: d.data,
		})
	})
})

app.post("/find", (req, res) => {
	languageTranslator.translate({
		text: req.body.city,
		modelId: "ru-en",
	})
		.then(translationResult => {
			console.log(translationResult.result.translations[0].translation);
			axios.get("https://api.openweathermap.org/data/2.5/find?q=" + translationResult.result.translations[0].translation + "&lang=ru&appid=" + process.env.OWM_TOKEN).then((dt) => {
				res.send(dt.data);
			})
		})
		.catch(err => {
			console.log('error:', err);
		});


})

app.listen(PORT, () => console.log("Server started on port " + PORT));
