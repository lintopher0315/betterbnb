import concurrent.futures
import json
from os import path
from os import system
from FBI_Crime_Data import get_crime_data_with_lat_lng, get_crime_data_with_address
from restraunt import get_nearby_restaurants, get_nearby_restaurants_with_address, address_to_lon_and_lat
from population_data import get_population_data_with_lat_lng, get_population_data_with_address


# NOTE: YOUR PYTHON SCRIPT MUST HAVE ONLY TWO FUNCTIONS.
# BOTH FUNCTIONS MUST RETURN THE SAME DATA. THEY BOTH MUST RETURN A DICT. ONE FUNCTION MUST TAKE IN
# LATITUDE AND LONGITUDE. THE OTHER MUST TAKE IN ADDRESS. THIS IS EASILY SIMPLIFIED BUT THATS FOR SPRINT 2.
# EXTRACT_LOCATION_DETAILS.py PROVIDES MANY METHODS FOR MANIPULATING LOCATION DETAILS. CHECK THERE BEFORE
# IMPLEMENTING YOUR OWN ALGORITHM FOR SPECIFYING GEOGRAPHICALLY.

def compile_info_lat_long(lat, longt):
    # set up multithreading
    executor = concurrent.futures.ThreadPoolExecutor()

    # create object which will hold the return value of the threaded get_crime_data_with_lat_lng
    crime_thread_obj = executor.submit(get_crime_data_with_lat_lng, lat, longt)
    restraunt_thread_obj = executor.submit(get_nearby_restaurants, lat, longt)
    population_thread_obj = executor.submit(get_population_data_with_lat_lng, lat, longt)
    # NEW DATA SOURCES: add data_source_obj above that does the same thing

    generate_report(crime_thread_obj, restraunt_thread_obj, population_thread_obj)
    # NEW DATA SOURCES: add another argument above and then modify the parameters of generate_report below


def compile_info_addr(addr):
    # set up multithreading
    executor = concurrent.futures.ThreadPoolExecutor()

    # create object which will hold the return value of get_crime_data_with_lat_lng
    crime_thread_obj = executor.submit(get_crime_data_with_address, addr)
    restraunt_thread_obj = executor.submit(get_nearby_restaurants_with_address, addr)
    population_thread_obj = executor.submit(get_population_data_with_address, addr)
    # NEW DATA SOURCES: add data_source_obj above that does the same thing

    generate_report(crime_thread_obj,restraunt_thread_obj, population_thread_obj)
    # NEW DATA SOURCES: add another argument above and then modify the parameters of generate_report below


def generate_report(crime_thread_obj, restraunt_thread_obj, population_thread_obj):
    if (path.exists("compiled_data.txt")):
        system("rm compiled_data.txt")

    write_population = population_thread_obj.result() # THIS IS AN OUTLIER BECAUSE IT WILL RETURN ONLY ONE VALUE. ALL OF THESE SHOULD BE DICTS.
    write_restraunt_dict = restraunt_thread_obj.result()
    write_crime_dict = crime_thread_obj.result()
    # NEW DATA SOURCES: ADD SIMILAR CALL TO ABOVE. THE RETURN TYPE OF YOUR FUNCTIONS SHOULD BE A DICT.
    
    compiled_dict = {}
    compiled_dict['population_size'] = write_population[0] # the first return value of population_data.py (population size of zipcode)
    compiled_dict['population_information'] = {"population_density_per_sq_mi": write_population[1]} # the second return value of population_data.py (population density per sq mi)
    compiled_dict['crime_data'] = write_crime_dict
    compiled_dict['restraunt_data'] = write_restraunt_dict
    # NEW DATA SOURCES: compiled_dict['TYPE_OF_DATA'] = DATA_DICT <--------- THIS IS AN EXAMPLE. ADD THIS IF YOU'RE ADDING A NEW API.
    
    f = open("compiled_data.txt", "w")
    json.dump(compiled_dict, f)


#compile_info_lat_long(40.4259, -86.9081)
