import requests
import json
import sys


#restraunt_name = zomato.get_nearby_restaurants(41.881832, -87.623177)
  

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
    names = []
    for item in nearby_restaurants:
      rest = item["restaurant"]
      names.append({'name': rest["name"], 'address': rest["location"]["address"], 'rating': rest["user_rating"]["aggregate_rating"]})
      names.sort(reverse=True, key=get_my_key)
    return names[:5]

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



if __name__ == "__main__":
  lat = sys.argv[1]
  lon = sys.argv[2]
  nearby_restaurants = get_nearby_restaurants(lat, lon)
  #print(json.dumps(nearby_restaurants, indent=2, sort_keys=False))
  names = []
  for item in nearby_restaurants:
    names.append(item['name'])
  
  print(names) 
  nearby_cuisines = get_nearby_cuisines(41.881832, -87.623177)
  #python3 restraunt.py 41.881832 -87.623177 
  print(nearby_cuisines)

