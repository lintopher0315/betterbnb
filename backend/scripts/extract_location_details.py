import requests
import json
import unittest
import googlemaps
from googlemaps.exceptions import HTTPError


# API Key (intended use is Google Maps)
CONSTANT_GOOGLE_API_KEY = "AIzaSyACEj7IvA9oyKaApQikJKvSVm1B_nmFSUw"

# Google Maps Client Object
gmaps = googlemaps.Client(key=CONSTANT_GOOGLE_API_KEY)

def extract_zipcode_with_lat_lng(lat, lng):

    reverse_geocode_result = gmaps.reverse_geocode((lat, lng))

    # iterate through list of nearby components
    for i in range(len(reverse_geocode_result)):

        # if that component contains a postal code
        if 'postal_code' in reverse_geocode_result[i]['types']:

            # check each of the address components within that component
            for j in range(len(reverse_geocode_result[i]['address_components'])):

                # if that component is the postal code, return the postal code
                if 'postal_code' in reverse_geocode_result[i]['address_components'][j]['types']:
                    return reverse_geocode_result[i]['address_components'][j]['short_name']

def extract_county_with_lat_lng(lat, lng):

    reverse_geocode_result = gmaps.reverse_geocode((lat, lng))

    #iterate through list of nearby components
    for i in range(len(reverse_geocode_result)):

        #if that component contains a county (administrative_area_level_2)
        if 'administrative_area_level_2' in reverse_geocode_result[i]['types']:

            #check each of the address components within that component
            for j in range(len(reverse_geocode_result[i]['address_components'])):
                 # if that component is the postal code, return the postal code
                if 'administrative_area_level_2' in reverse_geocode_result[i]['address_components'][j]['types']:
                    return reverse_geocode_result[i]['address_components'][j]['short_name']




def extract_zipcode_with_url(website_url):

    # upper case variables are constants
    # 'r' means raw, doesn't worry about escape characters etc
    
    FIRST_HALF_URL = r'https://www.airbnb.com/api/v2/pdp_listing_details/'
    SECOND_HALF_URL = r'?_format=for_rooms_show&_p3_impression_id=p3_1579738698_5K3M9yAF%2FiR%2BU%2BHj&key=d306zoyjsyarp7ifhu67rjxn52tv0t20&'

    # ONLY airbnb right now
    # in the future define different methods with the 
    # different ways of retrieving the zipcode from the site

    # strip the first 29 characters (get to beginning of listing id)
    listing_id = website_url[29:]

    # isolate the listing id
    listing_id = listing_id[0:listing_id.find('?')]

    # call the api, store the json + retrieve latitude and longitude
    listing_json = requests.get(FIRST_HALF_URL + listing_id + SECOND_HALF_URL).json()
    return extract_zipcode_with_lat_lng(listing_json['pdp_listing_detail']['lat'],
                                        listing_json['pdp_listing_detail']['lng'])


def extract_lat_lng_with_url(website_url):
    # upper case variables are constants
    # 'r' means raw, doesn't worry about escape characters etc

    FIRST_HALF_URL = r'https://www.airbnb.com/api/v2/pdp_listing_details/'
    SECOND_HALF_URL = r'?_format=for_rooms_show&_p3_impression_id=p3_1579738698_5K3M9yAF%2FiR%2BU%2BHj&key=d306zoyjsyarp7ifhu67rjxn52tv0t20&'

    # ONLY airbnb right now
    # in the future define different methods with the
    # different ways of retrieving the zipcode from the site

    # strip the first 29 characters (get to beginning of listing id)
    listing_id = website_url[29:]

    # isolate the listing id
    listing_id = listing_id[0:listing_id.find('?')]

    # call the api, store the json in listing_json
    listing_json = requests.get(FIRST_HALF_URL + listing_id + SECOND_HALF_URL).json()

    # return the lat first then the lng
    return listing_json['pdp_listing_detail']['lat'], listing_json['pdp_listing_detail']['lng']

def extract_image(website_url):
    # upper case variables are constants
    # 'r' means raw, doesn't worry about escape characters etc

    FIRST_HALF_URL = r'https://www.airbnb.com/api/v2/pdp_listing_details/'
    SECOND_HALF_URL = r'?_format=for_rooms_show&_p3_impression_id=p3_1579738698_5K3M9yAF%2FiR%2BU%2BHj&key=d306zoyjsyarp7ifhu67rjxn52tv0t20&'

    # ONLY airbnb right now
    # in the future define different methods with the
    # different ways of retrieving the zipcode from the site

    # strip the first 29 characters (get to beginning of listing id)
    listing_id = website_url[29:]

    # isolate the listing id
    listing_id = listing_id[0:listing_id.find('?')]

    # call the api, store the json in listing_json
    listing_json = requests.get(FIRST_HALF_URL + listing_id + SECOND_HALF_URL).json()

    # return the image
    return listing_json['pdp_listing_detail']['photos']['large']

def extract_description(website_url):
    # upper case variables are constants
    # 'r' means raw, doesn't worry about escape characters etc

    FIRST_HALF_URL = r'https://www.airbnb.com/api/v2/pdp_listing_details/'
    SECOND_HALF_URL = r'?_format=for_rooms_show&_p3_impression_id=p3_1579738698_5K3M9yAF%2FiR%2BU%2BHj&key=d306zoyjsyarp7ifhu67rjxn52tv0t20&'

    # ONLY airbnb right now
    # in the future define different methods with the
    # different ways of retrieving the zipcode from the site

    # strip the first 29 characters (get to beginning of listing id)
    listing_id = website_url[29:]

    # isolate the listing id
    listing_id = listing_id[0:listing_id.find('?')]

    # call the api, store the json in listing_json
    listing_json = requests.get(FIRST_HALF_URL + listing_id + SECOND_HALF_URL).json()

    # return the description
    return listing_json['pdp_listing_detail']['sectioned_description']['description']

def extract_title(website_url):
    # upper case variables are constants
    # 'r' means raw, doesn't worry about escape characters etc

    FIRST_HALF_URL = r'https://www.airbnb.com/api/v2/pdp_listing_details/'
    SECOND_HALF_URL = r'?_format=for_rooms_show&_p3_impression_id=p3_1579738698_5K3M9yAF%2FiR%2BU%2BHj&key=d306zoyjsyarp7ifhu67rjxn52tv0t20&'

    # ONLY airbnb right now
    # in the future define different methods with the
    # different ways of retrieving the zipcode from the site

    # strip the first 29 characters (get to beginning of listing id)
    listing_id = website_url[29:]

    # isolate the listing id
    listing_id = listing_id[0:listing_id.find('?')]

    # call the api, store the json in listing_json
    listing_json = requests.get(FIRST_HALF_URL + listing_id + SECOND_HALF_URL).json()

    # return the description
    return listing_json['pdp_listing_detail']['sectioned_description']['name']


def extract_city_and_state_with_lat_lng(lat, lng):

    # First, try to retrieve the geocoded object.
    try:
        reverse_geocode_result = gmaps.reverse_geocode((lat, lng))

    # If an HTTPError occurs, the lat/lng was invalid.
    except HTTPError:
        return 'NOT_FOUND', 'NOT_FOUND'

    # iterate through list of nearby components
    for i in range(len(reverse_geocode_result)):

        # if that component contains a postal code
        if 'postal_code' in reverse_geocode_result[i]['types']:

            # check each of the address components within that component
            for j in range(len(reverse_geocode_result[i]['address_components'])):

                # if that component is the postal code, save it into 'zipcode' and end
                if 'postal_code' in reverse_geocode_result[i]['address_components'][j]['types']:
                    formatted_string = reverse_geocode_result[i]['formatted_address']
                    splitString = formatted_string.split(",")
                    city = splitString[0]
                    state = splitString[1].strip()[:splitString[1].strip().index(" ")]
                    return city, state

    return 'NOT_FOUND', 'NOT_FOUND'

def extract_zipcode_with_address(address):

    # Extract the latitude and longitude from the address via the Google Maps API
    GeocodedAddress = gmaps.geocode(address)
    lat = GeocodedAddress[0]['geometry']['location']['lat']
    lng = GeocodedAddress[0]['geometry']['location']['lng']

    # Call utility method that extracts the zipcode with the latitude and longitude
    return extract_zipcode_with_lat_lng(lat, lng)

def extract_lat_lng_with_address(address):

    # Extract the latitude and longitude from the address via the Google Maps API
    GeocodedAddress = gmaps.geocode(address)
    if len(GeocodedAddress) == 0:
        return 'NOT_FOUND', 'NOT_FOUND'
    lat = GeocodedAddress[0]['geometry']['location']['lat']
    lng = GeocodedAddress[0]['geometry']['location']['lng']

    # Return latitude, longitude of that address
    return lat, lng

def extract_city_and_state_with_address(address):
    # Extract the latitude and longitude from the address via the Google Maps API
    GeocodedAddress = gmaps.geocode(address)

    AllComponents = GeocodedAddress[0]

    for i in range(len(AllComponents['address_components'])):
        if 'locality' in AllComponents['address_components'][i]['types']:
            city = AllComponents['address_components'][i]['long_name']
            for j in range(len(AllComponents['address_components'])):
                if 'administrative_area_level_1' in AllComponents['address_components'][j]['types']:
                    state = AllComponents['address_components'][j]['short_name']
                    return city, state

'''
def extract_zip_code_from_airbnb(listing):
    chrome_options = Options()  
    chrome_options.add_argument("--headless")  #if you don't want the GUI to pop up
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(listing)
    time.sleep(2)
    soup = BeautifulSoup(driver.page_source, features="html.parser")
    url = (soup.find("img", {"data-veloute":"map/GoogleMapStatic"})).attrs['src']
    parsed = urlparse.urlparse(url)
    latlong = parse_qs(parsed.query)['center'][0].split(",")
    lat = float(latlong[0])
    longt = float(latlong[1])

    return lat, longt
'''

# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #

class TestZipcodeExtraction(unittest.TestCase):

    def test_ExtractZipWithLatLng(self):

        # LEFT COLUMN IS THE "EXPECTED" RESULT #

        self.assertEqual(str(60007), extract_zipcode_with_lat_lng(42.01, -87.99))
        self.assertEqual(str(47906), extract_zipcode_with_lat_lng(40.49, -86.96))
        self.assertEqual(str(23801), extract_zipcode_with_lat_lng(37.24, -77.34))
        self.assertEqual(str(33810), extract_zipcode_with_lat_lng(28.09, -82.02))
        self.assertEqual(str(35801), extract_zipcode_with_lat_lng(34.74, -86.55))
        self.assertEqual(str(35805), extract_zipcode_with_lat_lng(34.69, -86.61))
        self.assertEqual(str(85034), extract_zipcode_with_lat_lng(33.44, -112.02))
        self.assertEqual(str(80211), extract_zipcode_with_lat_lng(39.77, -105.01))
        self.assertEqual(str(60612), extract_zipcode_with_lat_lng(41.88, -87.69))

    def test_ExtractCityAndStateWithLatLng(self):

        # LEFT COLUMN IS THE "EXPECTED" RESULT #

        city, state = extract_city_and_state_with_lat_lng(42.03, -87.88)
        self.assertListEqual(["Des Plaines", "IL"], [city, state])

        city, state = extract_city_and_state_with_lat_lng(37.77, -122.42)
        self.assertListEqual(["San Francisco", "CA"], [city, state])

        city, state = extract_city_and_state_with_lat_lng(38.91, -77.04)
        self.assertListEqual(["Washington", "DC"], [city, state])

        city, state = extract_city_and_state_with_lat_lng(33.44, -112.02)
        self.assertListEqual(["Phoenix", "AZ"], [city, state])

        city, state = extract_city_and_state_with_lat_lng(39.77, -105.01)
        self.assertListEqual(["Denver", "CO"], [city, state])

    def test_ExtractCityAndStateWithAddress(self):
         # LEFT COLUMN IS THE "EXPECTED" RESULT #
        self.assertTupleEqual(('Des Plaines', 'IL'), extract_city_and_state_with_address('1755 S. Wolf Road, Des Plaines, IL'))
        self.assertTupleEqual(('Glenview', 'IL'), extract_city_and_state_with_address('4000 W Lake Ave, Glenview, IL'))
        self.assertTupleEqual(('New York', 'NY'), extract_city_and_state_with_address('65 W 54th St, New York, NY'))
        self.assertTupleEqual(('San Francisco', 'CA'), extract_city_and_state_with_address('3416 19th St, San Franscisco, CA'))

    def test_ExtractZipWithAddress(self):
        # LEFT COLUMN IS THE "EXPECTED" RESULT #
        self.assertEqual(str(60018), str(extract_zipcode_with_address('1755 S. Wolf Road, Des Plaines, IL')))
        self.assertEqual(str(60026), str(extract_zipcode_with_address('4000 W Lake Ave, Glenview, IL')))
        self.assertEqual(str(10019), str(extract_zipcode_with_address('65 W 54th St, New York, NY')))
        self.assertEqual(str(94110), str(extract_zipcode_with_address('3416 19th St, San Franscisco, CA')))

#if __name__ == "__main__":
    #url = sys.argv[1] # get the URL
    #latlong = extrat_zip_code_from_airbnb(url)
    

    #resp = dict()
    #resp["latlong"] = str(latlong[0]) + "," + str(latlong[1]) 
    #resp = json.dumps(resp) 
    #loaded_resp = json.loads(resp)
    #print(loaded_resp)
    #sys.stdout.flush()
