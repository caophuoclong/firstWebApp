const mongo = require('mongodb');

const url = "mongodb+srv://phuoclong:51648951354@cluster0.fyage.mongodb.net/User?retryWrites=true&w=majority"
const db_name = "User";
const collection_name = "Test";

mongo.connect(url,(err, client)=>{
	if (err) throw err;
	const db = client.db("User");
	db.collection(collection_name).findOne({},(err, collection)=>{
		if(err) throw err;
		console.log(collection);
	})


})