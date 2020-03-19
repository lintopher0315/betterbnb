from extract_location_details import extract_lat_lng_with_address
import requests
import unittest
import time

FIRST_HALF_QUERY = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
SECOND_HALF_QUERY = "&radius=500&keyword=lodging&key="
CONSTANT_GOOGLE_API_KEY = "AIzaSyACEj7IvA9oyKaApQikJKvSVm1B_nmFSUw"

def get_lodging_data_with_lat_lng(lat, lng):
    lodging_data_json = requests.get(FIRST_HALF_QUERY + str(lat) + "," + str(lng)+ SECOND_HALF_QUERY + CONSTANT_GOOGLE_API_KEY).json()
    return lodging_data_json # dict object, contains a list named 'results'
                             # each index is a dict corresponding to each result (i.e. each place of lodging)

def get_lodging_data_with_address(address):
    stored_lat_lng = extract_lat_lng_with_address(address)
    return get_lodging_data_with_lat_lng(stored_lat_lng[0], stored_lat_lng[1])

# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #

class TestLodging(unittest.TestCase):

    def testLodgingData(self): # Not flexible; tests will break when new lodging becomes available; if failed, must also check that there isn't new lodging
        # Test with anecdotally KNOWN locations; find lodgings within 500m of the given latitude/longitude
        self.assertEqual(3, len(get_lodging_data_with_lat_lng(40.4259, -86.9081)['results'])) # West Lafayette
        time.sleep(0.25) # sleep in an attempt to avoid getting results limited
        self.assertEqual(0, len(get_lodging_data_with_lat_lng(42.0778, -87.8223)['results'])) # Glenview
        time.sleep(0.25) # sleep in an attempt to avoid getting results limited
        self.assertEqual(0, len(get_lodging_data_with_lat_lng(42.0334, -87.8834)['results'])) # Des Plaines
        time.sleep(0.25) # sleep in an attempt to avoid getting results limited
        self.assertEqual(5, len(get_lodging_data_with_lat_lng(30.2241, -92.0198)['results'])) # Lafayette

# Supplementary (manual, extra thorough): Verify specific data to make sure that the CORRECT lodgings are being returned; not just the number.