import requests
import unittest
import json
from extract_location_details import extract_lat_lng_with_address

PRE_LATITUDE_SUBSTRING = "http://api.openweathermap.org/data/2.5/weather?lat="
BETWEEN_LATITUDE_AND_LONGITUDE = "&lon="
POST_LONGITUDE_SUBSTRING = "&appid="
WEATHER_API_KEY = "9fbe869f70f4e1e37548ce45d11916e8"

def get_weather_data_with_latitude_and_longitude(lat, lng):
    current_weather = requests.get(PRE_LATITUDE_SUBSTRING + str(lat) + BETWEEN_LATITUDE_AND_LONGITUDE
                                    + str(lng) + POST_LONGITUDE_SUBSTRING + WEATHER_API_KEY).json()

    to_return_dict = {}
    to_return_dict['main_weather'] = current_weather['weather'][0]['main']
    to_return_dict['main_weather_description'] = current_weather['weather'][0]['description']
    return to_return_dict

def get_weather_data_with_address(address):
    lat, lng = extract_lat_lng_with_address(address)
    return get_weather_data_with_latitude_and_longitude(lat, lng)

# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #

class TestWeather(unittest.TestCase):

    def TestWeatherData(self): # We can't verify whether the return weather data is actually correct. The next best thing we can do is verify that data was returned.
        self.assertEqual(2, len(get_weather_data_with_latitude_and_longitude(42.0334, -87.8834))) # Des Plaines
        self.assertEqual(2, len(get_weather_data_with_latitude_and_longitude(42.0778, -87.8223))) # Glenview
        self.assertEqual(2, len(get_weather_data_with_latitude_and_longitude(40.4259, -87.9081))) # West Lafayette
        self.assertEqual(2, len(get_weather_data_with_latitude_and_longitude(30.2241, -92.0198))) # Lafayette

# Supplementary: Check if the returned data from these tests approximates or is similar to what Google suggests about the area's current weather.