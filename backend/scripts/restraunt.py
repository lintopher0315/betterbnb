import requests
import json
import sys
import collections
import unittest

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
    Get a list of the top 5 nearby restraunt objects contains the restraunt name, address, and rating. The restraunts are sorted by rating.
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
  
  #print(nearby_restaurants)
  nearby_cuisines = get_nearby_cuisines(lat, lon)
  #python3 restraunt.py 41.881832 -87.623177 
  #print(nearby_cuisines)

  #print(address_to_lon_and_lat("Empire State Bulding"))
 



#### Output of below used to make Unit Tests ###
#print(get_nearby_restaurants(40.427326, -86.917446))
#print(get_nearby_restaurants(41.141101, -73.356775))

#print(get_nearby_cuisines(40.427326, -86.917446))
#print(get_nearby_cuisines(41.141101, -73.356775))


### UNIT TESTS BELOW ###
### UNIT TESTS BELOW ###
### UNIT TESTS BELOW ###
### UNIT TESTS BELOW ###

#To run, do python3 -m unittest restraunt.TestRestaurantData 
class TestRestaurantData(unittest.TestCase):

  def testLocalRestaurants(self):
    #Name tests - For this API, the Name should always equal the key, if it doesn't then the API is not connected
    self.assertEqual("Triple XXX Family Restaurant", get_nearby_restaurants(40.427326, -86.917446).get('Triple XXX Family Restaurant')['name'])
    self.assertEqual("Basil Thai", get_nearby_restaurants(40.427326, -86.917446).get('Basil Thai')['name'])
    self.assertEqual("AJ\'s Burgers and Beef", get_nearby_restaurants(40.427326, -86.917446).get('AJ\'s Burgers and Beef')['name'])

    self.assertEqual("Sakura Japanese Restaurant", get_nearby_restaurants(41.14110, -73.356775).get('Sakura Japanese Restaurant')['name'])
    self.assertEqual("Sherwood Diner", get_nearby_restaurants(41.14110, -73.356775).get('Sherwood Diner')['name'])
    self.assertEqual("The Spotted Horse Tavern", get_nearby_restaurants(41.14110, -73.356775).get('The Spotted Horse Tavern')['name'])


    #Address tests
    self.assertEqual("2 N Salisbury St, West Lafayette 47906", get_nearby_restaurants(40.427326, -86.917446).get('Triple XXX Family Restaurant')['address'])
    self.assertEqual("135 S Chauncey Ave, West Lafayette 47906", get_nearby_restaurants(40.427326, -86.917446).get('Basil Thai')['address'])
    self.assertEqual("134 W State St, West Lafayette 47906", get_nearby_restaurants(40.427326, -86.917446).get('AJ\'s Burgers and Beef')['address'])

    self.assertEqual("680 Post Rd E, Westport 06880", get_nearby_restaurants(41.14110, -73.356775).get('Sakura Japanese Restaurant')['address'])
    self.assertEqual("901 Post Rd E, Westport 06880", get_nearby_restaurants(41.14110, -73.356775).get('Sherwood Diner')['address'])
    self.assertEqual("26 Church Lane, Westport 06880", get_nearby_restaurants(41.14110, -73.356775).get('The Spotted Horse Tavern')['address'])


    #Rating tests
    self.assertEqual('4.3', get_nearby_restaurants(40.427326, -86.917446).get('Triple XXX Family Restaurant')['rating'])
    self.assertEqual('4.4', get_nearby_restaurants(40.427326, -86.917446).get('Basil Thai')['rating'])
    self.assertEqual('4.3', get_nearby_restaurants(40.427326, -86.917446).get('AJ\'s Burgers and Beef')['rating'])

    self.assertEqual('4.5', get_nearby_restaurants(41.14110, -73.356775).get('Sakura Japanese Restaurant')['rating'])
    self.assertEqual('4.2', get_nearby_restaurants(41.14110, -73.356775).get('Sherwood Diner')['rating'])
    self.assertEqual("3.8", get_nearby_restaurants(41.14110, -73.356775).get('The Spotted Horse Tavern')['rating'])

    #Cuisine tests
    self.assertEqual('American, Breakfast, Burger', get_nearby_restaurants(40.427326, -86.917446).get('Triple XXX Family Restaurant')['cuisine'])
    self.assertEqual('Thai, Vegetarian, Tea', get_nearby_restaurants(40.427326, -86.917446).get('Basil Thai')['cuisine'])
    self.assertEqual('American, Burger', get_nearby_restaurants(40.427326, -86.917446).get('AJ\'s Burgers and Beef')['cuisine'])

    self.assertEqual('Japanese, Sushi', get_nearby_restaurants(41.14110, -73.356775).get('Sakura Japanese Restaurant')['cuisine'])
    self.assertEqual('Diner', get_nearby_restaurants(41.14110, -73.356775).get('Sherwood Diner')['cuisine'])
    self.assertEqual('American, Bar Food', get_nearby_restaurants(41.14110, -73.356775).get('The Spotted Horse Tavern')['cuisine'])
    
    
    return 


    def testNearbyCuisines(self):

      #Size should be 5 for what we have right now
      self.assertEqual(5, len(get_nearby_cuisines(40.427326, -86.917446)))
      self.assertEqual(5, len(get_nearby_cuisines(41.141101, -73.356775)))

      #Outputs should match for given Longitudes and latitudes
      self.assertEqual({'Asian', 'Bar Food', 'Japanese', 'Sushi', 'Italian', 'Sandwich', 'Mediterranean', 'Breakfast', 'BBQ', 'American', 'Diner', 'Coffee and Tea', 'Chinese'}, get_nearby_cuisines(41.141101, -73.356775))
      self.assertEqual({'Coffee and Tea', 'Sushi', 'American', 'Thai', 'Breakfast', 'Desserts', 'Japanese', 'Greek', 'Mediterranean', 'Indian', 'Vegetarian', 'Pizza', 'Fast Food', 'Tea', 'Sandwich', 'Burger'}, get_nearby_cuisines(40.427326, -86.917446))
    return

