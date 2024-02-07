// const express = require('express');
// const MongoClient = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;

// const app = express();
// const port = 3000;

// // const url = ' https://docs.mongodb.com/mongodb-shell/';
// const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6';
// const dbName = 'm_indicator_uts';

// MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
//   if (err) return console.error(err);
//   console.log('Connected successfully to server');

//   const db = client.db(dbName);
//   const collection = db.collection('Train');

//   // Define API endpoints for ticket booking history
//   app.get('/Train', (req, res) => {
//     collection.find({}).toArray((err, result) => {
//       if (err) return console.error(err);
//       res.send(result);
//     });
//   });

//   app.post('/m_indicator_uts', (req, res) => {
//     const { sourceStation, destinationStation, departureTime, passengerName } = req.body;
  
//     // Create a new ticket booking object
//     const newTicketBooking = {
//       sourceStation,
//       destinationStation,
//       bookingTime: new Date() // Add the current timestamp as the booking time
//     };
  
//     // Insert the new ticket booking into the collection
//     collection.insertOne(newTicketBooking, (err, result) => {
//       if (err) return console.error(err);
//       console.log('Ticket booking created successfully:', result.ops[0]);
//       res.send('Ticket booking created successfully');
//     });
//   });

//   // More API endpoints for updating and deleting ticket bookings can be added similarly

//   app.listen(port, () => console.log(`Server is running on port ${port}`));
// });
// console.log({port});


const express = require('express');
const mongoose = require('mongoose');
const ObjectId = require('mongodb');

const app = express();
const port = 3000;

const url = 'mongodb://127.0.0.1:27017/m_indicator_uts'; // URL should specify the database name directly
const dbName = 'm_indicator_uts';

mongoose.connect(url);
const db = mongoose.connection;
const collect=db.collection('trains');
// const rand=collect.insertOne({
//   id:"2",
//   name:"premanshu"
// })
// console.log(rand)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected successfully to server');

  const trainsSchema = new mongoose.Schema({
    sourceStation: String,
    destinationStation: String,
    bookingTime: Date
  });

  const Train = mongoose.model('trains', trainsSchema);

  app.get('/trains', (req, res) => {
    Train.find({}, (err, result) => {
      if (err) return console.error(err);
      res.send(result);
    });
  });

  app.post('/m_indicator_uts', (req, res) => {
    const { sourceStation, destinationStation, departureTime, passengerName } = req.body;

    const newTicketBooking = new Train({
      sourceStation,
      destinationStation,
      bookingTime: new Date()
    });

    newTicketBooking.save((err, result) => {
      if (err) return console.error(err);
      console.log('Ticket booking created successfully:', result);
      res.send('Ticket booking created successfully');
    });
  });

  app.listen(port, () => console.log(`Server is running on port ${port}`));
});
console.log({port});
