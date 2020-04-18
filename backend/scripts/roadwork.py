from extract_location_details import extract_lat_lng_with_address
import requests
import unittest

FIRST_HALF_QUERY = "https://traffic.ls.hereapi.com/traffic/6.3/incidents.json?prox="
SECOND_HALF_QUERY = ",1609&apiKey="
CONST_HERE_API_KEY = "VVFhmzTWPVfpEAhSudPHH2cDCjAOUYwqXL8YVDquDYQ"

def get_roadwork_data_with_lat_lng(lat, lng):
    request_url = FIRST_HALF_QUERY + str(lat) + "," + str(lng) + SECOND_HALF_QUERY + CONST_HERE_API_KEY
    roadwork_data_dict = dict(requests.get(request_url).json())
    traffic_item_list = roadwork_data_dict['TRAFFIC_ITEMS']['TRAFFIC_ITEM']

    construction_bool = False

    for i in range(len(traffic_item_list)):
        if traffic_item_list[i]['TRAFFIC_ITEM_TYPE_DESC'] == 'CONSTRUCTION':
            construction_bool = True
            break

    return_dict = {}
    return_dict['nearby_roadwork_boolean'] = str(construction_bool).lower()

    return return_dict



def get_roadwork_data_with_address(address):
    return get_roadwork_data_with_lat_lng(extract_lat_lng_with_address(address))

get_roadwork_data_with_lat_lng(41.8781, -87.6298)