from uszipcode import SearchEngine, SimpleZipcode
import requests
import json

def extract_zipcode_with_url(website_url):

    # upper case variables are constants
    # 'r' means raw, doesn't worry about escape characters etc
    
    FIRST_HALF_URL = r'https://www.airbnb.com/api/v2/pdp_listing_details/'
    SECOND_HALF_URL = r'?_format=for_rooms_show&_p3_impression_id=p3_1579738698_5K3M9yAF%2FiR%2BU%2BHj&key=d306zoyjsyarp7ifhu67rjxn52tv0t20&'

    # ONLY airbnb right now
    # in the future define different methods with the 
    # different ways of retrieving the zipcode from the site

    # strip the first 29 characters (get to beginning of listing id)
    listing_id = website_url[29:]

    # isolate the listing id
    listing_id = listing_id[0:listing_id.find('?')]

    # call the api, store the json + retrieve latitude and longitude
    listing_json = requests.get(FIRST_HALF_URL + listing_id + SECOND_HALF_URL).json()
    return extract_zipcode_with_lat_lng(listing_json['pdp_listing_detail']['lat'],
                                        listing_json['pdp_listing_detail']['lng'])


def extract_zipcode_with_lat_lng(lat, lng):

    listing_latitude = lat
    listing_longitude = lng

    # find list of zipcodes within 2 miles of the listing
    # latitude and longitude

    search = SearchEngine()
    list_of_zipcodes = search.by_coordinates(listing_latitude, listing_longitude, 2)

    # retrieve first zipcode found
    first_zipcode = list_of_zipcodes[0].zipcode

    return first_zipcode

def extract_city_and_state_with_lat_lng(lat, lng):
    listing_latitude = lat
    listing_longitude = lng

    # find list of zipcodes within 2 miles of the listing
    # latitude and longitude

    search = SearchEngine()
    list_of_zipcodes = search.by_coordinates(listing_latitude, listing_longitude, 2)

    # retrieve first zipcode found (closest zipcode)
    first_zipcode = list_of_zipcodes[0]

    return first_zipcode.city, first_zipcode.state
