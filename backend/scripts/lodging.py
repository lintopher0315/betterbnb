from extract_location_details import extract_lat_lng_with_address
import requests
import unittest
import time

FIRST_HALF_QUERY = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
SECOND_HALF_QUERY = "&radius=500&keyword=lodging&key="
CONSTANT_GOOGLE_API_KEY = "AIzaSyACEj7IvA9oyKaApQikJKvSVm1B_nmFSUw"

def get_lodging_data_with_lat_lng(lat, lng):
    lodging_data_json = requests.get(FIRST_HALF_QUERY + str(lat) + "," + str(lng)+ SECOND_HALF_QUERY + CONSTANT_GOOGLE_API_KEY).json()
    return dict(lodging_data_json) # dict object, contains a list named 'results'
                             # each index is a dict corresponding to each result (i.e. each place of lodging)

def get_lodging_data_with_address(address):
    stored_lat_lng = extract_lat_lng_with_address(address)
    return get_lodging_data_with_lat_lng(stored_lat_lng[0], stored_lat_lng[1])

# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #

class TestLodging(unittest.TestCase):

    def testLodgingData(self): # MANUAL TESTS
        # Test with anecdotally KNOWN locations; find lodgings within 500m of the given latitude/longitude
        # Cannot test automatically because Google's API does not always return the same data
        # Step through with a debugger; make sure that the lodgings returned match what Google says about lodgings
        CONSTANT_DEBUG_HERE = 9999999
        first = get_lodging_data_with_lat_lng(40.4259, -86.9081)['results'] # West Lafayette
        second = get_lodging_data_with_lat_lng(42.0778, -87.8223)['results'] # Glenview
        third = get_lodging_data_with_lat_lng(42.0334, -87.8834)['results'] # Des Plaines
        fourth = get_lodging_data_with_lat_lng(30.2241, -92.0198)['results'] # Lafayette
        five = get_lodging_data_with_lat_lng(41.8781, -87.6298)['results'] # Chicago
        six = get_lodging_data_with_lat_lng(40.7128, -74.0060)['results'] # New York
        seven = get_lodging_data_with_lat_lng(34.0522, -118.2437)['results'] # Los Angeles
        eight = get_lodging_data_with_lat_lng(38.9072, -77.0369)['results'] # Washington, D.C.