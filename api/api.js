// const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
// const cors = require('cors');
// const cookieParser = require('cookie-parser');

// const routes = require('./routes/routes')


// const app = express();
// app.use(cookieParser());
// app.use(cors({
//     credentials: true,
//     origin: ['http://localhost:4200']
// }));
// app.use(express.json());


// const CONNECTION_STRING = 'mongodb+srv://zwellydeveloper:zwelly45@cluster0.cnp7hel.mongodb.net/?retryWrites=true&w=majority';
// const DATABASE_NAME = 'royaldb';

// let database;
// let collection;

// MongoClient.connect(CONNECTION_STRING, (error, client) => {
//     if (error) {
//         console.error("Error connecting to the database:", error);
//         return;
//     }

//     database = client.db(DATABASE_NAME);
//     collection = database.collection("royalcollection");
//     console.log("Connection to the database successful");
    
//     // Start the server only after the MongoDB connection is established
//     app.listen(5038, () => {
//         console.log("Server is running on port 5038");
//     });
// });

// app.use(routes);




// // app.listen(5038, () => {
// //     MongoClient.connect(CONNECTION_STRING, (error, client) => {
// //         if (error) {
// //             console.error("Error connecting to the database:", error);
// //             return;
// //         }

// //         database = client.db(DATABASE_NAME);
// //         collection = database.collection("royalcollection");
// //         console.log("connection to the database successful");

// //     });
// // })
