from extract_location_details import extract_lat_lng_with_address
import requests
import unittest


FIRST_HALF_QUERY = "https://maps.googleapis.com/maps/api/elevation/json?locations="
SECOND_HALF_QUERY = "&key="
CONSTANT_GOOGLE_API_KEY = "AIzaSyACEj7IvA9oyKaApQikJKvSVm1B_nmFSUw"

def get_elevation_data_with_lat_lng(lat, lng): # elevation is in meters
    elevation_data_json = requests.get(
        FIRST_HALF_QUERY + str(lat) + "," + str(lng) + SECOND_HALF_QUERY + CONSTANT_GOOGLE_API_KEY).json()
    elevation_data_dict = dict(elevation_data_json)
    elevation_value = round(elevation_data_dict['results'][0]['elevation'])
    created_dict = {'elevation':elevation_value}
    return created_dict # dict object containing only one key-value pair - 'elevation':elevation_value
    # each index is a dict corresponding to each result (i.e. each place of lodging)

def get_elevation_data_with_address(address):
    stored_lat_lng = extract_lat_lng_with_address(address)
    return get_elevation_data_with_lat_lng(stored_lat_lng[0], stored_lat_lng[1])

# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #

class TestElevation(unittest.TestCase):

    def test_Elevation(self): # Make sure that their difference is no greater than 50 meters (approximating elevation)
        self.assertTrue(abs(get_elevation_data_with_lat_lng(42.0145, -87.8992)['elevation'] - 196) < 50) # 60018, 196 grabbed from Wikipedia elevation
        self.assertTrue(abs(get_elevation_data_with_lat_lng(40.4933, -86.9624)['elevation'] - 187) < 50) # 47906, 187 grabbed from Wikipedia elevation
        self.assertTrue(abs(get_elevation_data_with_lat_lng(35.3700, -98.4294)['elevation'] - 499) < 50) # 73053, 499 grabbed from Wikipedia elevation
        self.assertTrue(abs(get_elevation_data_with_lat_lng(46.5930, -98.9297)['elevation'] - 530) < 50) # 58454, 530 grabbed from Wikipedia elevation