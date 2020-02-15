import requests
import ast

base_url = "https://developers.zomato.com/api/v2.1/"


def initialize_app(config):
    return Zomato(config)


class Zomato:
    def __init__(self, config):
        self.user_key = config["user_key"]


    def get_categories(self):
        headers = {'Accept': 'application/json', 'user-key': self.user_key}
        r = (requests.get(base_url + "categories", headers=headers).content).decode("utf-8")
        a = ast.literal_eval(r)

        categories = {}
        for category in a['categories']:
            categories.update({category['categories']['id'] : category['categories']['name']})

        return categories

    def get_nearby_restaurants(self, lat, lon):
        headers = {'Accept': 'application/json', 'user-key': self.user_key}
        r = (requests.get(base_url + "geocode?lat=" + str(lat) + "&lon=" + str(lon), headers=headers).content).decode("utf-8")
        a = ast.literal_eval(r)

        restaurants = a["nearby_restaurants"]
        names = []
        for rest in restaurants:
            names.append(rest["name"])
        return names

    def get_nearby_cuisines(self, lat, lon):
        headers = {'Accept': 'application/json', 'user-key': self.user_key}
        r = (requests.get(base_url + "geocode?lat=" + str(lat) + "&lon=" + str(lon), headers=headers).content).decode("utf-8")
        a = ast.literal_eval(r)

        restaurants = a["nearby_restaurants"]
        cuisines = []
        for rest in restaurants:
            cuisines.append(rest["cuisines"])
        return cuisines
