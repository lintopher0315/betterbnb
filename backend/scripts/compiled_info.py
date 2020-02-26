import concurrent.futures
import json
from os import path
from os import system
from FBI_Crime_Data import get_crime_data_with_lat_lng, get_crime_data_with_address


def compile_info_lat_long(lat, longt):
    # set up multithreading
    executor = concurrent.futures.ThreadPoolExecutor()

    # create object which will hold the return value of the threaded get_crime_data_with_lat_lng
    crime_thread_obj = executor.submit(get_crime_data_with_lat_lng, lat, longt)
    # NEW DATA SOURCES: add data_source_obj above that does the same thing

    generate_report(crime_thread_obj)
    # NEW DATA SOURCES: add another argument above and then modify the parameters of generate_report below


def compile_info_addr(addr):
    # set up multithreading
    executor = concurrent.futures.ThreadPoolExecutor()

    # create object which will hold the return value of get_crime_data_with_lat_lng
    crime_thread_obj = executor.submit(get_crime_data_with_address, addr)
    # NEW DATA SOURCES: add data_source_obj above that does the same thing

    generate_report(crime_thread_obj)
    # NEW DATA SOURCES: add another argument above and then modify the parameters of generate_report below


def generate_report(crime_thread_obj):
    if (path.exists("compiled_data.txt")):
        system("rm compiled_data.txt")

    write_crime_dict = crime_thread_obj.result()
    # NEW DATA SOURCES: ADD SIMILAR CALL TO ABOVE
    
    compiled_dict = {}
    compiled_dict['crime_data'] = write_crime_dict
    # NEW DATA SOURCES: compiled_dict['TYPE_OF_DATA'] = DATA_DICT <--------- THIS IS AN EXAMPLE. ADD THIS IF YOU'RE ADDING A NEW API.
    
    f = open("compiled_data.txt", "w")
    json.dump(compiled_dict, f)
