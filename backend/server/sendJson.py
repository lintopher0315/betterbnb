import json
from pymongo import MongoClient

user = {}
user['username'] = "John Doe"
user['listings'] = []
user['listings'].append({
    'longitude': 3838.200,
    'laditude': 292.288,
    'Safety Index': 6,
    'Address': '3424 Bentbrook ln',
    'Nearby Restraunts': ['Dominos', 'Pizza Hut'],
    'Nearby Cuisines': ['Italian']
})
user['perferences'] = {
    'Wheelchair': True,
    'Language': 'Spanish'
}

with open('data.json', 'w') as outfile:
    json.dump(user, outfile)


with open('data.json') as f:
    file_data = json.load(f)


client = MongoClient("mongodb+srv://Anudeep:abcd1234@cluster0-94hkc.gcp.mongodb.net/test?retryWrites=true&w=majority")
db = client.BetterBNB

db_dataset = db['Users']
db_dataset.insert_one(file_data)

data = db_dataset.find()
for item in data:
    print("Username: " + item["username"] + "\nAddress: " + item["listings"][0]["Address"])
client.close()
