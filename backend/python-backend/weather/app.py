from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin  # Import cross_origin
import requests
import smtplib
from dotenv import load_dotenv
import os

app = Flask(__name__)

# Enable CORS for all domains or specific ones
CORS(app, resources={r"/weather": {"origins": "http://localhost:5173"}})

# Replace with your actual OpenWeatherMap API key
API_KEY = os.getenv("API_KEY")


@app.route("/weather", methods=["GET", "POST", "OPTIONS"])  # Allow OPTIONS method
@cross_origin(origins="http://localhost:5173")  # Allow CORS for this route
def weather():
    if request.method == "OPTIONS":
        return "", 200  # Respond to the preflight request

    if request.method == "POST":
        data = request.get_json()
        city = data.get("city")
        if city:
            weather_data = get_weather_data(city)
            if weather_data:  # Check if weather_data is valid
                return {"weather": weather_data}, 200
    return {"message": "City not found"}, 400


def get_weather_data(city):
    url = f"http://api.openweathermap.org/data/2.5/forecast/daily?q={city}&cnt=7&units=metric&appid={API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return {
            "city": data["city"]["name"],
            "country": data["city"]["country"],
            "forecast": data["list"],
        }
    else:
        return None


if __name__ == "__main__":
    app.run(port=5000, debug=True)  # Run the Flask app
