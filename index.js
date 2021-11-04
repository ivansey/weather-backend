require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const axios = require("axios");

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser());
app.use(cors());

app.post("/get/one", (req, res) => {
	axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + String(req.body.city) + "&lang=ru&units=metric&appid=" + process.env.OWM_TOKEN).then((d) => {
		res.send({
			weather: d.data,
		})
	})
})

app.post("/get/period", (req, res) => {
	axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + String(req.body.city) + "&lang=ru&units=metric&appid=" + process.env.OWM_TOKEN).then(dt => {
		axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=" + dt.data.coord.lat + "&lon=" + dt.data.coord.lon + "&lang=ru&units=metric&appid=" + process.env.OWM_TOKEN).then((d) => {
			res.send({
				weather: d.data,
			})
		}).catch(err => console.error(err))
	})
})

app.post("/locate/one", (req, res) => {
	axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + req.body.lan + "&lon=" + req.body.lon + "&lang=ru&units=metric&appid=" + process.env.OWM_TOKEN).then((d) => {
		res.send({
			weather: d.data,
		})
	})
})

app.post("/locate/period", (req, res) => {
	axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=" + dt.data[0].lat + "&lon=" + dt.data[0].lon + "&lang=ru&units=metric&appid=" + process.env.OWM_TOKEN).then((d) => {
		res.send({
			weather: d.data,
		})
	}).catch(err => console.error(err))
})

app.post("/find", (req, res) => {
	axios.get("https://api.openweathermap.org/data/2.5/find?q=" + encodeURIComponent(req.body.city) + "&lang=ru&units=metric&appid=" + process.env.OWM_TOKEN).then((dt) => {
		res.send(dt.data);
	})
})

app.listen(PORT, () => console.log("Server started on port " + PORT));
