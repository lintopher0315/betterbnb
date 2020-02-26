import requests
import unittest
from json import JSONDecodeError
from requests import ReadTimeout
# Below line may be red.... still works though. Not sure about that one.
from extract_location_details import extract_city_and_state_with_lat_lng, extract_lat_lng_with_address

global foundORI

# Constant API Key for the FBI Crime Data API
CONST_FBI_API_KEY = "laMPLBGdkftFSLroMIATYWPFuZhTTYCSlrZF3QHd"


# Returns a dictionary where the keys are crimes and the values are the number of them.
def get_crime_data_with_lat_lng(lat, lng):

    # Initialize the foundORI global variable to be "empty", denoting that there is no
    # ORI that maps to the given latitude and longitude.
    foundORI = "empty"

    # Extract the city and state from the latitude and longitude
    city, state = extract_city_and_state_with_lat_lng(lat, lng)

    # If either the city or the state couldn't be found, return an empty dict.
    if 'NOT_FOUND' in city or 'NOT_FOUND' in state:
        return {}


    # Try to retrieve the list of agencies (with ORIs) a maximum of two times.
    # If JSON decoding fails twice in a row, return an empty dictionary.
    for i in range(0, 2, 1):
        try:
            agenciesList = requests.get(r'https://api.usa.gov/crime/fbi/sapi/api/agencies?API_KEY=' + CONST_FBI_API_KEY, timeout=20).json()
            break
        except JSONDecodeError:
            if i == 1:
                return {}
        except ReadTimeout:
            if i == 1:
                return {}

    # Isolate only information pertaining to the state in the form of a dictionary in ori_iterator
    ori_iterator = agenciesList[state]

    # Iterate through the list of ORIs, attempting to find a police department that
    # contains the city's name in it, suggesting that that's the city's police department.
    for item in ori_iterator.values():
        if city in item['agency_name']:
            foundORI = item['ori']
            break

    # If there was no ORI that matched the city, return a dictionary that suggests that.
    # Theoretically, every city should have a matching ORI.
    if foundORI == "empty":
        return {'NO_KEY' : 'NO MATCHING ORI WAS FOUND FOR CITY ' + city}

    # Try to retrieve the list of crimes associated with that ORI a maximum of two times.
    # If JSON decoding fails twice in a row, return an empty dictionary.
    for i in range(0, 2, 1):
        try:
            data = requests.get('https://api.usa.gov/crime/fbi/sapi/api/summarized/agencies/' + foundORI + '/offenses/2015/2016?API_KEY=' + CONST_FBI_API_KEY, timeout=20).json()
            break
        except JSONDecodeError:
            if i == 1:
                return {}
        except ReadTimeout:
            if i == 1:
                return {}

    isolatedDataDictionary = {}


    # Isolate only the crime and the true number of counts, saved into a dictionary
    for item in data['results']:
        # debug print below
        # print(str(item))

        # If the offense already exists in the dictionary (multiple years of data with same offense), sum them
        if item['offense'] in isolatedDataDictionary:
            isolatedDataDictionary[item['offense']] = isolatedDataDictionary[item['offense']] + item['actual']

        # Otherwise, add it.

        else:
            isolatedDataDictionary[item['offense']] = item['actual']

    return isolatedDataDictionary

def get_crime_data_with_address(address):
    # Extract the lat, lng from the address
    lat, lng = extract_lat_lng_with_address(address)

    if 'NOT_FOUND' in str(lat) or 'NOT_FOUND' in str(lng):
        return {}

    # Use lat, lng to call already completed method
    return get_crime_data_with_lat_lng(lat, lng)

# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #

class TestCrimeDataExtraction(unittest.TestCase):
    # Note: These assertion values should never change. We gather information from years that have already past, so they should not be modified.

    def test_GetCrimeDataWithLatLng(self):
        # Try valid lat/lng values...
        first_expected_dict = {'property-crime': 1201, 'rape': 11, 'human-trafficing': 0, 'homicide': 0,
                               'burglary': 188, 'robbery': 24, 'rape-legacy': 0, 'motor-vehicle-theft': 59,
                               'larceny': 954, 'arson': 11, 'violent-crime': 101, 'aggravated-assault': 66}
        self.assertDictEqual(first_expected_dict, get_crime_data_with_lat_lng(42.0334, -87.8834))

        second_expected_dict = {'property-crime': 61, 'burglary': 0, 'homicide': 0, 'human-trafficing': 0,
                                'arson': 0, 'motor-vehicle-theft': 60, 'larceny': 1, 'aggravated-assault': 1,
                                'rape': 0, 'violent-crime': 1, 'robbery': 0, 'rape-legacy': 0}
        self.assertDictEqual(second_expected_dict, get_crime_data_with_lat_lng(37.7749, -122.4194))

        # Try invalid lat/lng values...
        empty_dict = {}
        self.assertDictEqual(empty_dict, get_crime_data_with_lat_lng(21, -102))
        self.assertDictEqual(empty_dict, get_crime_data_with_lat_lng(531, -102))

    def test_GetCrimeDataWithAddress(self):
        # Try valid address...
        first_expected_dict = {'property-crime': 1201, 'rape': 11, 'human-trafficing': 0, 'homicide': 0,
                               'burglary': 188, 'robbery': 24, 'rape-legacy': 0, 'motor-vehicle-theft': 59,
                               'larceny': 954, 'arson': 11, 'violent-crime': 101, 'aggravated-assault': 66}
        self.assertDictEqual(first_expected_dict, get_crime_data_with_address('1755 S Wolf Rd, Des Plaines, IL'))

        second_expected_dict = {'property-crime': 61, 'burglary': 0, 'homicide': 0, 'human-trafficing': 0,
                                'arson': 0, 'motor-vehicle-theft': 60, 'larceny': 1, 'aggravated-assault': 1,
                                'rape': 0, 'violent-crime': 1, 'robbery': 0, 'rape-legacy': 0}
        self.assertDictEqual(second_expected_dict, get_crime_data_with_address('3416 19th St, San Francisco, CA'))

        # Try invalid address...
        empty_dict = {}
        self.assertDictEqual(empty_dict, get_crime_data_with_address("Some Fake Address, Nowhere, No-when."))
        self.assertDictEqual(empty_dict, get_crime_data_with_address("5943 Yolo Ln, SanJavonito, NO"))




