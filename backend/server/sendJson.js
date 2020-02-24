const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Anudeep:abcd1234@cluster0-94hkc.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
var myobj = { name: "Test User", address: "28923 Betterbrook ln" };
client.connect(err => {
  const collection = client.db("BetterBNB").collection("Users");
  collection.insertOne(myobj);
  client.close();
});
