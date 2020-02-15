import requests
from json import JSONDecodeError
from extract_location_details import extract_city_and_state_with_lat_lng
global foundORI

# Returns a dictionary where the keys are crimes and the values are the number of them.
#
def get_crime_data(lat, lng):

    # Initialize the foundORI global variable to be "empty", denoting that there is no
    # ORI that maps to the given latitude and longitude.
    foundORI = "empty"

    # Constant API Key for the FBI Crime Data API
    CONST_API_KEY = "laMPLBGdkftFSLroMIATYWPFuZhTTYCSlrZF3QHd"

    # Extract the city and state from the latitude and longitude
    city, state = extract_city_and_state_with_lat_lng(lat, lng)


    # Try to retrieve the list of agencies (with ORIs) a maximum of two times.
    # If JSON decoding fails twice in a row, return an empty dictionary.
    for i in range(0, 2, 1):
        try:
            agenciesList = requests.get(r'https://api.usa.gov/crime/fbi/sapi/api/agencies?API_KEY=' + CONST_API_KEY, timeout=20).json()
        except JSONDecodeError:
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
            data = requests.get('https://api.usa.gov/crime/fbi/sapi/api/summarized/agencies/' + foundORI + '/offenses/2015/2016?API_KEY=' + CONST_API_KEY, timeout=10).json()
            break
        except JSONDecodeError:
            if i == 1:
                return {}

    isolatedDataDictionary = {}


    # Isolate only the crime and the true number of counts, saved into a dictionary
    for item in data['results']:
        print(item)
        isolatedDataDictionary[item['offense']] = item['actual']

    return isolatedDataDictionary