import json
import requests
import googlemaps
from googlemaps.exceptions import HTTPError
from extract_location_details import extract_county_with_lat_lng
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
def get_data_with_lat_long(lat, lng):
    #county = extract_county_with_lat_lng(lat, lng)

    #URL used for API called to census geocode API to get fips code
    fips_url = "https://geo.fcc.gov/api/census/area?lat=" + str(lat) + "&lon=" + str(lng)
    fips_response = requests.get(fips_url)
    fips_code = fips_response.json().get("results")[0].get('county_fips')

    #URL used for API call to census lang prevlance data
    stat_url = "https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=county:" + str(fips_code[2:5]) + "&in=state:" + str(fips_code[0:2]) + "&LAN=625&key=2de98270881029a50d90a8e6f4d56c6fb6216872"
    stat_response = requests.get(stat_url)

    print(fips_code[2:5])
    print(stat_response)
   

    




#print(extract_county_with_lat_lng(40.435821, -86.916099))
#print(https://api.census.gov/data/2010/dec/sf1?get=&for=county:)
#url2 = "https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=metropolitan%20statistical%20area/micropolitan%20statistical%20area:*&LAN=" + language_codes[0] + "&key=2de98270881029a50d90a8e6f4d56c6fb6216872"
#url2 = "https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=county:013&in=state:04&LAN=625&key=2de98270881029a50d90a8e6f4d56c6fb6216872"
#resp = requests.get(url2)

#print(resp.text)

get_data_with_lat_long(40.891869, -74.020068)
