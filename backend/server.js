const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

dotenv.config();

// Connection URL
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

// Database Name
const dbName = 'SwapiT';
const app = express();
const port = 3000;

app.use(bodyParser.json());

client.connect();

app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult); // Corrected variable name
});

app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    await collection.insertOne(password);
    res.send({success: true, result: findResult});
});

app.delete('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  await collection.deleteOneOne(password);
  res.send({success: true, result: findResult});
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
