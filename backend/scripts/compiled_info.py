import concurrent.futures
import json
from os import path
from os import system
from FBI_Crime_Data import get_crime_data_with_lat_lng, get_crime_data_with_address
from restraunt import get_nearby_restaurants, get_nearby_restaurants_with_address, address_to_lon_and_lat
from population_data import get_population_data_with_lat_lng, get_population_data_with_address
from weather import get_weather_data_with_latitude_and_longitude, get_weather_data_with_address
from lodging import get_lodging_data_with_lat_lng, get_lodging_data_with_address
from elevation import get_elevation_data_with_lat_lng, get_elevation_data_with_address
from roadwork import get_roadwork_data_with_lat_lng, get_roadwork_data_with_address


# NOTE: YOUR PYTHON SCRIPT MUST HAVE ONLY TWO FUNCTIONS.
# BOTH FUNCTIONS MUST RETURN THE SAME DATA. THEY BOTH MUST RETURN A DICT. ONE FUNCTION MUST TAKE IN
# LATITUDE AND LONGITUDE. THE OTHER MUST TAKE IN ADDRESS.
# EXTRACT_LOCATION_DETAILS.py PROVIDES MANY METHODS FOR MANIPULATING LOCATION DETAILS. CHECK THERE BEFORE
# IMPLEMENTING YOUR OWN ALGORITHM FOR SPECIFYING GEOGRAPHICALLY.

def compile_info_lat_long(lat, longt, identifier):
    # set up multithreading
    executor = concurrent.futures.ThreadPoolExecutor()

    # create object which will hold the return value of the threaded get_crime_data_with_lat_lng
    try:
        crime_thread_obj = executor.submit(get_crime_data_with_lat_lng, lat, longt)
    except:
        crime_thread_obj = None # default value if exception is thrown

    try:
        restraunt_thread_obj = executor.submit(get_nearby_restaurants, lat, longt)
    except:
        restraunt_thread_obj = None # default value if exception is thrown

    try:
        population_thread_obj = executor.submit(get_population_data_with_lat_lng, lat, longt)
    except:
        population_thread_obj = None # default value if exception is thrown

    try:
        weather_thread_obj = executor.submit(get_weather_data_with_latitude_and_longitude, lat, longt)
    except:
        weather_thread_obj = None

    try:
        lodging_thread_obj = executor.submit(get_lodging_data_with_lat_lng, lat, longt)
    except:
        lodging_thread_obj = None

    try:
        elevation_thread_obj = executor.submit(get_elevation_data_with_lat_lng, lat, longt)
    except:
        elevation_thread_obj = None

    try:
        roadwork_thread_obj = executor.submit(get_roadwork_data_with_lat_lng, lat, longt)
    except:
        roadwork_thread_obj = None

    # NEW DATA SOURCES: add data_source_obj above that does the same thing

    generate_report(lat, longt, crime_thread_obj, restraunt_thread_obj, population_thread_obj,
                    weather_thread_obj, lodging_thread_obj, elevation_thread_obj, roadwork_thread_obj, identifier)
    # NEW DATA SOURCES: add another argument above and then modify the parameters of generate_report below


def compile_info_addr(addr, identifier):
    # set up multithreading
    executor = concurrent.futures.ThreadPoolExecutor()

    # create object which will hold the return value of get_crime_data_with_lat_lng
    try:
        crime_thread_obj = executor.submit(get_crime_data_with_address, addr)
    except:
        crime_thread_obj = None # default value if exception is thrown

    try:
        restraunt_thread_obj = executor.submit(get_nearby_restaurants_with_address, addr)
    except:
        restraunt_thread_obj = None # default value if exception is thrown

    try:
        population_thread_obj = executor.submit(get_population_data_with_address, addr)
    except:
        population_thread_obj = None # default value if exception is thrown

    try:
        weather_thread_obj = executor.submit(get_weather_data_with_address, addr)
    except:
        weather_thread_obj = None

    try:
        lodging_thread_obj = executor.submit(get_lodging_data_with_address, addr)
    except:
        lodging_thread_obj = None

    try:
        elevation_thread_obj = executor.submit(get_elevation_data_with_address, addr)
    except:
        elevation_thread_obj = None

    try:
        roadwork_thread_obj = executor.submit(get_roadwork_data_with_address, addr)
    except:
        roadwork_thread_obj = None

    # NEW DATA SOURCES: add data_source_obj above that does the same thing

    # TODO: lat and longt is needed for the ListingPage component 
    generate_report(-1, -1, crime_thread_obj, restraunt_thread_obj, population_thread_obj,
                    weather_thread_obj, lodging_thread_obj, elevation_thread_obj, roadwork_thread_obj, identifier)

    # NEW DATA SOURCES: add another argument above and then modify the parameters of generate_report below


def generate_report(lat, longt, crime_thread_obj, restraunt_thread_obj, population_thread_obj, weather_thread_obj, lodging_thread_obj, elevation_thread_obj, roadwork_thread_obj, identifier):
    if (path.exists("compiled_data.txt")):
        system("rm compiled_data.txt")

    try:
        write_population = population_thread_obj.result()  # THIS IS AN OUTLIER BECAUSE IT WILL RETURN ONLY ONE VALUE. ALL OF THESE SHOULD BE DICTS.
    except:
        write_population = (0, 0) # value if an exception is raised

    try:
        write_restraunt_dict = restraunt_thread_obj.result()
    except:
        write_restraunt_dict = {} # value if an exception is raised

    try:
        write_crime_dict = crime_thread_obj.result()
    except:
        write_crime_dict = {} # value if an exception is raised

    try:
        write_weather_dict = weather_thread_obj.result()
    except:
        write_weather_dict = {} # value if an exception is raised

    try:
        write_lodging_dict = lodging_thread_obj.result()
    except:
        write_lodging_dict = {} # value if an exception is raised

    try:
        write_elevation_dict = elevation_thread_obj.result()
    except:
        write_elevation_dict = {} # value if an exception is raised

    try:
        write_roadwork_dict = roadwork_thread_obj.result()
    except:
        write_elevation_dict = {} # value if an exception is raised

    # NEW DATA SOURCES: ADD SIMILAR CALL TO ABOVE. THE RETURN TYPE OF YOUR FUNCTIONS SHOULD BE A DICT.
    
    compiled_dict = {} # initialize dict that will be turned to json
    compiled_dict["lat"] = lat
    compiled_dict["longt"] = longt
    compiled_dict['population_size'] = write_population[0] # the first return value of population_data.py (population size of zipcode)
    compiled_dict['population_information'] = {"population_density_per_sq_mi": write_population[1]} # the second return value of population_data.py (population density per sq mi)



    compiled_dict['crime_data'] = write_crime_dict         # like this one
    compiled_dict['restraunt_data'] = write_restraunt_dict # or like this one
    compiled_dict['weather_data'] = write_weather_dict
    compiled_dict['lodging_data'] = write_lodging_dict
    compiled_dict['elevation_data'] = write_elevation_dict
    compiled_dict['roadwork_data'] = write_roadwork_dict
    # NEW DATA SOURCES: compiled_dict['TYPE_OF_DATA'] = DATA_DICT <--------- THIS IS AN EXAMPLE. ADD THIS IF YOU'RE ADDING A NEW API.
    
    filename = "compiled_data" + identifier + ".json"
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(compiled_dict, f, ensure_ascii=False, indent=4)