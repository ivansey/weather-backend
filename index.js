require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const translit = require("cyrillic-to-translit-js");

const axios = require("axios");

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser());
app.use(cors());

app.post("/get/one", (req, res) => {
	axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + translit().transform(String(req.body.city)) + "&lang=ru&appid=" + process.env.OWM_TOKEN).then((d) => {
		res.send({
			weather: d.data,
		})
	})
})

app.listen(PORT, () => console.log("Server started on port " + PORT));
