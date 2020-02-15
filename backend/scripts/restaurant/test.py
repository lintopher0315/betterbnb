import zomatopy

config={
  "user_key":"423b069e30574cb2f6c6c4da1b5f65ca"
}
    
zomato = zomatopy.initialize_app(config)
category_dictionary = zomato.get_categories()

for item in category_dictionary:
    print(item)