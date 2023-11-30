const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const multer = require('multer'); // Add this line
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const app = express();
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}));
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


                const successMessage = "User registered successfully";
                response.send({ success: true, message: successMessage });
            });
        });

        //  login user  to the database

        app.post('/api/royalapp/login', multer().none(), async (request, response) => {
            ` `
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

                // const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET);
                const token = jwt.sign({ id: userData.id }, "secret");

                response.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                })



                response.send({
                    success: true,
                    message: 'Login successful',
                  });

            } catch (error) {
                console.error("Error during login:", error);
                response.status(500).send({
                    message: 'Internal Server Error'
                });
            }
        });

        //  authicated users 
        app.get('/api/royalapp/user', async (request, response) => {
            try {
                const cookie = request.cookies['jwt']

                const claims = jwt.verify(cookie, "secret")

                if (!claims) {
                    return response.status(401).send({
                        message: 'Unauthorized'
                    });
                }

                const user = await collection.findOne({ id: claims.id });
                const { password, ...userData } = await user;

                response.send(userData)

            } catch (error) {
                return response.status(401).send({
                    message: 'Unauthorized'
                });
            }

        });


        //  logout user
        app.post('/api/royalapp/logout', (request, response) => {
            response.cookie('jwt', '', { maxAge: 0 })

            response.send({
                message: 'Logout successful',
            });

        })










    });
})
