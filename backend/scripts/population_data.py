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

# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #
# UNIT TEST CLASS BELOW #

class TestPopulation(unittest.TestCase):

    def test_ExtractPopulationSize(self): # (2010 census) https://factfinder.census.gov/faces/nav/jsf/pages/community_facts.xhtml?src=bkmk
        self.assertEqual(30099, get_population_data_with_lat_lng(42.0145, -87.8992)[0]) # 60018
        self.assertEqual(66972, get_population_data_with_lat_lng(40.4933, -86.9624)[0]) # 47906
        self.assertEqual(745, get_population_data_with_lat_lng(35.3700, -98.4294)[0]) # 73053
        self.assertEqual(360, get_population_data_with_lat_lng(46.5930, -98.9297)[0]) # 58454

    def test_ExtractPopulationDensity(self): # density retrieved from Wikipedia which cites the Census
        self.assertTrue(abs(1572.3 - get_population_data_with_lat_lng(42.0145, -87.8992)[1]) < 300) # 60018, ensure the retrieved and the expected are within 300 people of eachother (old data)
        self.assertTrue(abs(543 - get_population_data_with_lat_lng(40.4933, -86.9624)[1]) < 300) # 47906, ensure the retrieved and the expected are within 300 people of eachother (old data)
        self.assertTrue(abs(10 - get_population_data_with_lat_lng(35.3700, -98.4294)[1]) < 300) # 73053, ensure the retrieved and the expected are within 300 people of eachother (old data)
        self.assertTrue(abs(301 - get_population_data_with_lat_lng(46.5990, -96.8030)[1]) < 300) # 58454, ensure the retrieved and the expected are within 300 people of eachother (old data)


