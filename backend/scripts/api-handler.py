import os
import sys
from extract_location_details import extract_zip_code_from_airbnb
from compiled_info import compile_info_lat_long
# this python script will be called to handle a request from a Node.js endpoint
# the script will then return the necessary information to the Node.js endpoint 
# the script employs the use of threads in order to serve clients in the fastest
# possible way

if __name__ == "__main__":
    try:
        url = sys.argv[1] 
        #latlong = list(extract_zip_code_from_airbnb(url))
        compile_info_lat_long(str(40.77078), str(-111.90048))

        somefile = open("compiled_data.txt", "r")
        for line in somefile:
            print(line)
            sys.stdout.flush()
        somefile.close() 


    except Exception as e:
        print(e)
        print("error")