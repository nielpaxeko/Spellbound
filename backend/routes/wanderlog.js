import express from "express";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

const router = express.Router();
const __dirname = path.dirname(new URL(import.meta.url).pathname);


// Store the countries and cities status
let visitedCountries = [];
let wantToVisitCountries = [];
let visitedCities = [];
let wantToVisitCities = [];

// Define paths to the CSV and GeoJSON files
const countryPath = path.join(__dirname, "../geodata/countries.geojson");
const cityPath = path.join(__dirname, "../geodata/worldcities.csv");

// Load city data from CSV (static/js/worldcities.csv)
let cityData = [];
fs.createReadStream(cityPath)
    .pipe(csvParser())
    .on("data", (row) => {
        cityData.push(row);
    })
    .on("end", () => {
        console.log("City data loaded successfully.");
    });

// Load country data
let countryData = {};
fs.readFile(countryPath, "utf-8", (err, data) => {
    if (err) {
        console.error("Error loading geojson file:", err);
        return;
    }
    countryData = JSON.parse(data);
    console.log("Country data loaded successfully.");
});

// Valid countries
const validCountries = countryData.features
    ? countryData.features.map((feature) => feature.properties.ADMIN)
    : [];

// Valid cities
const validCities = cityData.map((row) => row.city);

// Routes
router.get("/city-data", (req, res) => {
    const filteredData = cityData.map((row) => ({
        city: row.city,
        lat: row.lat,
        lng: row.lng,
    }));
    res.json(filteredData);
});

router.get("/countries", (req, res) => {
    res.json(validCountries);
});

router.get("/cities", (req, res) => {
    res.json(validCities);
});

router.post("/add-country", (req, res) => {
    const data = req.body;
    const visited = data.visited || [];
    const wantToVisit = data.want_to_visit || [];

    // Validate countries
    visitedCountries = visited.filter((country) => validCountries.includes(country));
    wantToVisitCountries = wantToVisit.filter((country) => validCountries.includes(country));

    res.json({
        visited: visitedCountries,
        want_to_visit: wantToVisitCountries,
    });
});

router.post("/add-city", (req, res) => {
    const data = req.body;
    const visited = data.visited || [];
    const wantToVisit = data.want_to_visit || [];

    // Validate cities
    visitedCities = visited.filter((city) => validCities.includes(city));
    wantToVisitCities = wantToVisit.filter((city) => validCities.includes(city));

    res.json({
        visited: visitedCities,
        want_to_visit: wantToVisitCities,
    });
});

export default router;
