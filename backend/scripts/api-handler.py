import os
import sys
from extract_location_details import extract_lat_lng_with_url
from compiled_info import compile_info_lat_long
# this python script will be called to handle a request from a Node.js endpoint
# the script will then return the necessary information to the Node.js endpoint 
# the script employs the use of threads in order to serve clients in the fastest
# possible way

if __name__ == "__main__":
    url = sys.argv[1] 
    latlong = list(extract_lat_lng_with_url(url))
    compile_info_lat_long(latlong[0], latlong[1])

    somefile = open("compiled_data.txt", "r")
    for line in somefile:
        print(line)
        sys.stdout.flush()
    somefile.close() 

'''
    except Exception as e:
        print(e.)
        print("error")
'''