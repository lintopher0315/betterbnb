import json
import requests

def jprint(obj):
    # create a formatted string of the Python JSON object
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)

#Codes are needed to get a specific language
#For reference all language codes available found here:
#https://www.census.gov/hhes/socdemo/language/about/02_Primary_list.pdf
#Commmon codes include Spanish (625) French (620) Hindi (663) Arabic (777) Mandarin (712)
language_codes = ["620", "625", "663", "712", "777"]

#Can add a switch statment here to determine language code in future
#Once UI for language is further implemented


url = "https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=metropolitan%20statistical%20area/micropolitan%20statistical%20area:*&LAN=" + language_codes[0] + "&key=2de98270881029a50d90a8e6f4d56c6fb6216872"
response = requests.get(url)
print(response.json())

