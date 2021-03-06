import requests
import json
import sys
import collections

"""
This script expects a longitude and latitude passed in as command line arguments. It prints the 
names of the nearby restraunts and cuisines. 
"""
  

def getCategories():
  categories = get("/categories", {})
  return categories


def get_my_key(obj):
  return obj['rating']

def get_nearby_restaurants(lat, lon):
    """
    Get a list of the top 5 nearyby restraunt objects contains the restraunt name, address, and rating. The restraunts are sorted by rating.
    These can be obtaining using the longitude and latitude of a location. 
    """
    params = {"lat": lat, "lon": lon}
    response = get("/geocode", params)
    nearby_restaurants = response["nearby_restaurants"]
    names = {}
    for item in nearby_restaurants:
      rest = item["restaurant"]
      names[rest['name']] ={'name': rest["name"], 'address': rest["location"]["address"], 'rating': rest["user_rating"]["aggregate_rating"], 'cuisine': rest['cuisines']}
      #names[rest['name']] = [rest["location"]["address"], rest["user_rating"]["aggregate_rating"], rest['cuisines']]
      #names.sort(reverse=True, key=get_my_key)
    names = sorted(names.items(), key=lambda x: x[1]['rating'], reverse=True)
    names = dict(collections.OrderedDict(names))
    return names

def get_nearby_restaurants_with_address(addr):
    """
    Get a list of the top 5 nearyby restraunt objects contains the restraunt name, address, and rating. The restraunts are sorted by rating.
    These can be obtaining using the longitude and latitude of a location. 
    """
    arr = address_to_lon_and_lat(addr)
    lat = arr[0]
    lon = arr[1]
    params = {"lat": lat, "lon": lon}
    response = get("/geocode", params)
    nearby_restaurants = response["nearby_restaurants"]
    names = {}
    for item in nearby_restaurants:
      rest = item["restaurant"]
      names[rest['name']] ={'name': rest["name"], 'address': rest["location"]["address"], 'rating': rest["user_rating"]["aggregate_rating"], 'cuisine': rest['cuisines']}
      #names[rest['name']] = [rest["location"]["address"], rest["user_rating"]["aggregate_rating"], rest['cuisines']]
      #names.sort(reverse=True, key=get_my_key)
    names = sorted(names.items(), key=lambda x: x[1]['rating'], reverse=True)
    names = dict(collections.OrderedDict(names))
    return names

def get_nearby_cuisines(lat, lon):
    """
    Get a list of the cuisines avaliable near a location. These can be obtaining using the longitude and latitude of a location. 
    """
    params = {"lat": lat, "lon": lon}
    response = get("/geocode", params)
    nearby_restaurants = response["nearby_restaurants"]
    all_cuisines = []
    for item in nearby_restaurants:
      rest = item["restaurant"]
      all_cuisines.append(rest["cuisines"])
    cus_list = []
    for item in all_cuisines:
      if (',' in item):
        vals = item.split(", ")
        for val in vals:
          cus_list.append(val)
      else:
        cus_list.append(item)
    cuisines = set(cus_list)
    return cuisines



def get(endpoint, params):
  """
  Method used to format API calls made to the Zomato API.
  """
  host = "https://developers.zomato.com/api/v2.1"
  user_key = "423b069e30574cb2f6c6c4da1b5f65ca"
  content_type='application/json'
  headers = {
          "User-agent": "curl/7.43.0",
          'Accept': content_type,
          'X-Zomato-API-Key': user_key
  }
  url = host + endpoint + "?"
  for k,v in params.items():
    url = url + "{}={}&".format(k, v)
  url = url.rstrip("&")
  response = requests.get(url, headers=headers)
  return response.json()


def address_to_lon_and_lat(addr):
  url = "https://us1.locationiq.com/v1/search.php"
  data = {
      'key': '89f839c5bfa44e',
      'q': addr,
      'format': 'json'
  }
  response = requests.get(url, params=data)
  lat = response.json()[0]['lat']
  lon = response.json()[0]['lon']
  return [lat, lon]

if __name__ == "__main__":
  if (len(sys.argv) == 2):
    lon_and_lat = address_to_lon_and_lat(sys.argv[1])
  else:
    lat = sys.argv[1]
    lon = sys.argv[2]
  nearby_restaurants = get_nearby_restaurants(lat, lon)
  #names = []
  #for item in nearby_restaurants:
  #  names.append(item['name'])
  
  print(nearby_restaurants)
  nearby_cuisines = get_nearby_cuisines(lat, lon)
  #python3 restraunt.py 41.881832 -87.623177 
  #print(nearby_cuisines)

  #print(address_to_lon_and_lat("Empire State Bulding"))

