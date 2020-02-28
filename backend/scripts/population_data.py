from uszipcode import SearchEngine
from extract_location_details import extract_zipcode_with_lat_lng, extract_zipcode_with_address

def get_population_data_with_lat_lng(lat, lng):
    zipcode = extract_zipcode_with_lat_lng(lat, lng)
    search = SearchEngine(simple_zipcode=False)
    zipcodeDetails = search.by_zipcode(str(zipcode))
    return zipcodeDetails.population

def get_population_data_with_address(address):
    zipcode = extract_zipcode_with_address(address)
    search = SearchEngine(simple_zipcode=False)
    zipcodeDetails = search.by_zipcode(str(zipcode))
    return zipcodeDetails.population

# UNIT TEST CLASS BELOW #

#class TestPopulationData(unittest.TestCase):
