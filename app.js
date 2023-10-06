const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3500; // You can choose any port you like

const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'test1';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectToMongoDB();



//  create operation
//  const dataToInsert = { name: 'D', price: "15" };
//  const result = await db.collection('myCollection').insertOne(dataToInsert);
//  console.log('Inserted document with _id:', result.insertedId);

// // Read query data
// const query = {name:'D'}
// const documents = await db.collection("myCollection").find(query).toArray();
// console.log("Found Documents", documents);


// Update data
// const filter = {name:'John'}
// const update = { $set: { age: 31 } };
// const result = await db.collection("myCollection").updateOne(filter, update)
// console.log("data updated:", result.modifiedCount);

// delete dtat
// const filter = {name: "John"};
// const result = await db.collection('myCollection').deleteOne(filter);
// console.log("Delete document:", result.deletedCount);


// Define a GET route to fetch data from MongoDB
app.get('/api/fetchData', async (req, res) => {
  try {
    const db = client.db(dbName);
    const query = { name: 'A' };
    const documents = await db.collection('myCollection').find(query).toArray();
    res.json(documents);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/fetchAllData', async (req, res) => {
  try {
    const db = client.db(dbName);
    const documents = await db.collection('myCollection').find({}).toArray();
    res.json(documents);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




