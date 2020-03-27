import os
import sys
from extract_location_details import extract_lat_lng_with_url
from compiled_info import compile_info_lat_long
import json
# this python script will be called to handle a request from a Node.js endpoint
# the script will then return the necessary information to the Node.js endpoint 
# the script employs the use of threads in order to serve clients in the fastest
# possible way

if __name__ == "__main__":
    
    try:
        url = sys.argv[1] 
        latlong = list(extract_lat_lng_with_url(url))
        compile_info_lat_long(latlong[0], latlong[1])
        print("success", end="")
        sys.stdout.flush()
    except Exception as err: 
        print(err)
        print("error", end="")
        sys.stdout.flush()


    '''
    with open("compiled_data.txt") as json_file:
        data = json.load(json_file)
        some_str = json.dumps(data)
        print(some_str, end="")
        sys.stdout.flush()
    '''
    '''
    somefile = open("compiled_data.txt", "r")
    for line in somefile:
        if "{" in line:
            print(line, end="")
            sys.stdout.flush()
    somefile.close() 
    '''

'''
    except Exception as e:
        print(e.)
        print("error")
'''