const express = require('express');
const fs = require('fs');
const mongo = require('mongodb');
const path = require('path');
const bp = require('body-parser');
const crypto = require('crypto');


const url = "mongodb://localhost:27017/";
const db_name = "test";
const collection_name = "test";
app = express();
const port = 8080;

app.use(bp.json());
app.use(bp.urlencoded({ extend: true }));

function insert() {
    mongo.connect(url, (err, client) => { // connect database 
        if (err) throw err;
        console.log("Connect database successfully!");
        const db = client.db(db_name); // connect into database name
        db.collection("Summer").insertMany(data, (error, collection) => { // connect collection name and add data;
            if (error) throw error;
            console.log("Insert data successfully!");
            console.log(collection);
        })
    })
};

function delete1() {
    mongo.connect(url, (err, client) => { // connect database 
        if (err) throw err;
        console.log("Connect database successfully!");
        let query = { name: "PhuocThanh" };
        const db = client.db(db_name); // connect into database name
        db.collection("Summer").deleteOne(query, (error, collection) => { // connect collection name and add data;
            if (error) throw error;
            console.log("Delete data successfully!");
            console.log(collection);
        });
    });
};

function find() {
    mongo.connect(url, (err, client) => { // connect database 
        if (err) throw err;
        console.log("Connect database successfully!");
        let query = { name: "PhuocThanh" };
        const db = client.db(db_name); // connect into database name
        db.collection("Summer").findOne({}, (error, collection) => { // find data one or many, if many use function toArray
            // else db.collection("Summer").find({},(error, collection))
            if (error) throw error;
            console.log("Delete data successfully!");
            console.log(collection);
        });
    });

}

function update() {
    mongo.connect(url, (err, client) => { // connect database 
        if (err) throw err;
        console.log("Connect database successfully!");
        let query = { name: "PhuocThanh" };
        let data = { name: "Khanh Van", age: "18", mobile: "0973906464" };
        const db = client.db(db_name); // connect into database name
        db.collection("Summer").updateOne({ name: "Khanh Van" }, {
            $set: {
                name: "Phuoc Long"
            }
        }, (error, collection) => { // connect collection name and add data;
            if (error) throw error;
            console.log("Delete data successfully!");
            console.log(collection);
        });
    });

}

app.use(express.static(path.join(__dirname, 'static'))); // add to load static file


app.get('/', (req, res) => {
    res.set({
        'Access-Control-Allow-Origin': '*'
    });
    res.sendFile(path.join(__dirname + '/templates/index.html')); //load html file


});
app.get('/signup', (req, res) => {
    res.set({
        'Access-Control-Allow-Origin': '*'
    });
    res.sendFile(path.join(__dirname + "/templates/signup.html"))
})

app.get('/signin', (req, res) => {
    let user = req.query.user;
    let password = req.query.password;
    console.log("Username: " + user + "\nPassword: " + password);
    if (user === "caophuoclong")
        res.send("This is demo of signup page");
    else
        res.send("Login failed");

})
const alogrithm = "sha512";
let password = fs.readFileSync("password.txt").toString();
function encrypt(password, phone){ // encrypt with password
    let cipher = crypto.createCipher(alogrithm,password);
    let crypted = cipher.update(text,'utf-8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text){ // decrypt with password
    let decipher = crypto.createDecipher(alogrithm,password);
    let decrypted = decipher.updae(text,'hex','utf-8');
    decrypted += decipher.fianl('utf-8');
    return decrypted;
}

function getHash(password, phone){ // tao chuoi hash de luu mat khau
    const hmac = crypto.createHmac(alogrithm, phone);
    const data = hmac.update(password);
    let gen_hash = data.digest('hex');
    return gen_hash;
}
app.post("/signup", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let phone = req.body.phone;
    let pass = getHash(password,phone);
    console.log(pass);
    let data = {
        "username" : username,
        "password" : pass,
        "phone" : phone
    };

    mongo.connect(url,(err, client)=>{
        if (err) throw err;
        console.log("Connect success successfully!")
        let db = client.db(db_name);
        db.collection("test").insertOne(data,(err, collection)=>{
            console.log("Add data successfully!");
        })
    })
    res.sendFile(path.join(__dirname + "/templates/index.html"));
});


app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname + "/templates/login.html"));
})

app.post('/login', (req, res)=>{
    let name = req.body.username;
    let password = req.body.password;
    let data = {"username": name};
    mongo.connect(url, (err, client) => { // connect database 
        if (err) throw err;
        console.log("Connect database successfully!");
        let query = { "username": name };
        const db = client.db(db_name); // connect into database name
        db.collection(collection_name).findOne(query, (error, collection) => { // find data one or many, if many use function toArray
            // else db.collection("Summer").find({},(error, collection))
            if (error) throw error;
            let phone_after = collection.phone;
            let x = getHash(password, phone_after);
            let pass = collection.password;
            if(x === pass) console.log("Xin chao");
            else console.log("Long");
        });
    });

})



app.listen(port, () => {
    console.log('App is running on http://localhost:' + port);
})