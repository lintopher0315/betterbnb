import concurrent.futures
import sys
import json
from FBI_Crime_Data import get_crime_data_with_lat_lng, get_crime_data_with_address

# set up multithreading
executor = concurrent.futures.ThreadPoolExecutor()

# initialize all return values in global scope
crime_thread_obj = {}

# initialize the compiled_dict which we will change to json pre-file write
compiled_dict = {}

# INITIALIZE GLOBAL THREAD OBJS FOR OTHER APIS UNDER crime_thread_obj ABOVE



# if the only passed argument is an address
if len(sys.argv) == 2:
    # starts running the thread to get crime data, stores in object to later get return value
    crime_thread_obj = executor.submit(get_crime_data_with_address, sys.argv[1])
    # ADD SIMILAR CALL TO ABOVE FOR OTHER APIs HERE
# otherwise there are 2 more passed arguments where the first is lat and the second is lng
elif len(sys.argv) == 3:
    # starts running the thread, stores in object to later get return value
    crime_thread_obj = executor.submit(get_crime_data_with_lat_lng, sys.argv[1], sys.argv[2])
    # ADD SIMILAR CALL TO ABOVE FOR OTHER APIs HERE
else:
    # otherwise there are a malformed number of arguments
    f = open("compiled_data.txt", "w")
    f.write("Problem with arguments.")



write_crime_dict = crime_thread_obj.result()
# ADD SIMILAR CALL TO ABOVE

compiled_dict['crime_data'] = write_crime_dict
#compiled_dict['TYPE_OF_DATA'] = DATA_DICT <--------- THIS IS AN EXAMPLE. ADD THIS IF YOU'RE ADDING A NEW API.


f = open("compiled_data.txt", "w")
json.dump(compiled_dict, f)

