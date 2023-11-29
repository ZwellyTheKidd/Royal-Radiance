const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const multer = require('multer'); // Add this line
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const CONNECTION_STRING = 'mongodb+srv://zwellydeveloper:zwelly45@cluster0.cnp7hel.mongodb.net/?retryWrites=true&w=majority';
const DATABASE_NAME = 'royaldb';

let database;
let collection;

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        if (error) {
            console.error("Error connecting to the database:", error);
            return;
        }

        database = client.db(DATABASE_NAME);
        collection = database.collection("royalcollection");
        console.log("connection to the database successful");
   

// get method - get from database
        app.get('/api/royalapp/getusers', (request, response) => {
            collection.find({}).toArray((error, result) => {
                response.send(result);
            });
        });

//  register user  to the database
        app.post('/api/royalapp/register', multer().none(), async (request, response) => {
            collection.countDocuments({}, async (error, numOfDocs) => {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(request.body.password, salt);

                collection.insertOne({
                    id: (numOfDocs + 1).toString(),
                    name: request.body.name,
                    email: request.body.email,
                    password: hashedPassword, // Use the hashed password
                });

                response.send("User registered successfully");
            });
        });

        //  login user  to the database
    
        app.post('/api/royalapp/login', multer().none(), async (request, response) => {
            console.log('Login route reached'); // Add this line
        
            try {
                const user = await collection.findOne({ email: request.body.email });

        if (!user) {
            return response.status(404).send({
                message: 'User not found'
            });
        }

        const passwordMatch = await bcrypt.compare(request.body.password, user.password);

        if (!passwordMatch) {
            return response.status(401).send({
                message: 'Invalid credentials'
            });
        }

        // Send the user data without the password
        const { password, ...userData } = user;
        response.send(userData);
        
            } catch (error) {
                console.error("Error during login:", error);
                response.status(500).send({
                    message: 'Internal Server Error'
                });
            }
        });
        


        // app.post('/api/royalapp/login',multer().none(), async(request,response) => {
        //     const user = await collection.findOne({ email: request.body.email });
        //         if (!user) {
        //             return response.status(404).send({
        //                 message:'user not found'})
                    
        //         }
        //         const passwordMatch=await bcrypt.compare(req.body.password, user.password)

        //         if (!passwordMatch){
        //             return response.status(404).send({
        //                 message:'Invalid credentials'})
        //         }
        //         response.send(result);

        //  });
         





        
    });
})
