from uszipcode import SearchEngine
from extract_location_details import extract_zipcode_with_lat_lng, extract_zipcode_with_address
import unittest

def get_population_data_with_lat_lng(lat, lng):
    zipcode = extract_zipcode_with_lat_lng(lat, lng)
    search = SearchEngine(simple_zipcode=False)
    zipcodeDetails = search.by_zipcode(str(zipcode))
    return zipcodeDetails.population, zipcodeDetails.population_density # population density is per square mile

def get_population_data_with_address(address):
    zipcode = extract_zipcode_with_address(address)
    search = SearchEngine(simple_zipcode=False)
    zipcodeDetails = search.by_zipcode(str(zipcode))
    return zipcodeDetails.population, zipcodeDetails.population_density # population density is per square mile


class TestPopulation(unittest.TestCase):

    def test_ExtractPopulation(self): # (2010 census) https://factfinder.census.gov/faces/nav/jsf/pages/community_facts.xhtml?src=bkmk
        self.assertEqual(30099, get_population_data_with_lat_lng(42.0145, -87.8992)[0])
        self.assertEqual(66972, get_population_data_with_lat_lng(40.4933, -86.9624)[0])
        self.assertEqual(745, get_population_data_with_lat_lng(35.3700, -98.4294)[0])
        self.assertEqual(291, get_population_data_with_lat_lng(46.5990, -96.8030)[0])



