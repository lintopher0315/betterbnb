import json
import requests
import googlemaps
from googlemaps.exceptions import HTTPError
from extract_location_details import extract_county_with_lat_lng
import unittest
def jprint(obj):
    # create a formatted string of the Python JSON object
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)

#Codes are needed to get a specific language
#For reference all language codes available found here:
#https://www.census.gov/hhes/socdemo/language/about/02_Primary_list.pdf
#Commmon codes include French (620) Spanish (625) Hindi (663) Arabic (777) Mandarin (712)
language_codes = ["620", "625", "663", "712", "777"]

#Can add a switch statment here to determine language code in future
#Once UI for language is further implemented

def getlanguage(lang):
    switch = {
        "french": 620,
        "spanish": 625,
        "portuguese": 629,
        "russian": 639,
        "hindi": 663,
        "bengali": 664,
        "chinese": 708,
        "cantonese": 711,
        "mandarin": 712,
    }

    #2nd arg is default if nothing is found
    return switch.get(lang, "english")


### Note ###
#https://geo.fcc.gov/api/census/area is a good workaround for census data requireing FIPS code
#It gets the code
def get_data_with_lat_long(lat, lng, language):
    #county = extract_county_with_lat_lng(lat, lng)

    
    #URL used for API called to census geocode API to get fips code
    fips_url = "https://geo.fcc.gov/api/census/area?lat=" + str(lat) + "&lon=" + str(lng)
    fips_response = requests.get(fips_url)
    fips_code = None
    stat_url = None
    stat_url = None
    try:
        fips_code = fips_response.json().get("results")[0].get('county_fips')
        stat_url = "https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=county:" + str(fips_code[2:5]) + "&in=state:" + str(fips_code[0:2]) + "&LAN=" + str(getlanguage(language)) + "&key=2de98270881029a50d90a8e6f4d56c6fb6216872"
        stat_response = requests.get(stat_url)
    except IndexError:
        fips_code = None

    #URL used for API call to census lang prevlance data
   

    data_to_return = None

    # In case text body is empty
    if fips_code != None:
        
        #Handle any bad format with json and any erros after getting index
        try:
            stat_response_json = stat_response.json()

            #Will return the total number of speakers in a given area
            data_to_return = stat_response_json[1][0]
            return data_to_return
            
        except (ValueError, KeyError, TypeError):
            return data_to_return
    
    else:
        return data_to_return
        
       
#print(get_data_with_lat_long(47.535436, -122.286905))
#print(None == get_data_with_lat_long(40.427708, -86.918695))


class TestPopulation(unittest.TestCase):

    #Testing a lat and lng with no county in the us
    def test_bad_lat_lng(self):
        self.assertEqual(None, get_data_with_lat_long(0, 0))
        self.assertEqual(None, get_data_with_lat_long(5, 2))
        self.assertEqual(None, get_data_with_lat_long(28.5, 98))

    #Testing a lat and lng with a county in the us that has no data for lang prevalance
    def test_no_data(self):
        self.assertEqual(None, get_data_with_lat_long(40.427708, -86.918695))
        self.assertEqual(None, get_data_with_lat_long(40.427707, -86.918699))
        self.assertEqual(None, get_data_with_lat_long(40.423374, -86.889727))
    
    def test_working(self):
        self.assertEqual(123185, get_data_with_lat_long(40.901796, -73.997409))
        self.assertEqual(15865, get_data_with_lat_long(42.840341, -71.623169))
        self.assertEqual(121930, get_data_with_lat_long(47.535436, -122.286905))
