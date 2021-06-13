const mongo = require('mongodb');

const url = "mongodb://localhost:27017";
const db_name = "test";
const collection_name = "test";

mongo.connect(url,(err, client)=>{
	if (err) throw err;
	const db = client.db(db_name);
	db.collection(collection_name).deleteMany({ },(err, collection)=>{
		if (err) throw err;
		console.log(collection);
	})
})
function delete1() {
    mongo.connect(url, (err, client) => { // connect database 
        if (err) throw err;
        console.log("Connect database successfully!");
        let query = { name: "PhuocThanh" };
        const db = client.db(db_name); // connect into database name
        db.collection("Summer").deleteMany({ }, (error, collection) => { // connect collection name and add data;
            if (error) throw error;
            console.log("Delete data successfully!");
            console.log(collection);
        });
    });
};
