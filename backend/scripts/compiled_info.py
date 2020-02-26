import concurrent.futures
import json
from FBI_Crime_Data import get_crime_data_with_lat_lng, get_crime_data_with_address


def compile_info_lat_long(lat, longt):
    # set up multithreading
    executor = concurrent.futures.ThreadPoolExecutor()
    # initialize the compiled_dict which we will change to json pre-file write
    crime_thread_obj = executor.submit(get_crime_data_with_lat_lng, lat, longt)

    generate_report(crime_thread_obj)

def compile_info_addr(addr):
    executor = concurrent.futures.ThreadPoolExecutor()
    crime_thread_obj = executor.submit(get_crime_data_with_address, addr)

    generate_report(crime_thread_obj)


def generate_report(crime_thread_obj):
    write_crime_dict = crime_thread_obj.result()
    # ADD SIMILAR CALL TO ABOVE
    #compiled_dict['TYPE_OF_DATA'] = DATA_DICT <--------- THIS IS AN EXAMPLE. ADD THIS IF YOU'RE ADDING A NEW API.
    
    compiled_dict = {}
    compiled_dict['crime_data'] = write_crime_dict
    
    f = open("compiled_data.txt", "w")
    json.dump(compiled_dict, f)