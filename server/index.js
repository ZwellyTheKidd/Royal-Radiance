const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['https://royal-radiance.vercel.app']
}));
app.use(express.json());

const CONNECTION_STRING = 'mongodb+srv://zwellydeveloper:zwelly45@cluster0.cnp7hel.mongodb.net/?retryWrites=true&w=majority';
const DATABASE_NAME = 'royaldb';

let database;
let collection;

async function connectToDatabase() {
    try {
        const client = new MongoClient(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connection to the database successful");
        database = client.db(DATABASE_NAME);
        collection = database.collection("users");
        setupRoutes();
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

function setupRoutes() {
    // get users from database
    app.get('/api/royalapp/getusers', async (request, response) => {
        try {
            const result = await collection.find({}).toArray();
            response.send(result);
        } catch (error) {
            response.status(500).send({ message: "Error retrieving users" });
        }
    });

    // register user to the database
    app.post('/api/royalapp/register', multer().none(), async (request, response) => {
        try {
            const numOfDocs = await collection.countDocuments({});
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(request.body.password, salt);

            await collection.insertOne({
                id: (numOfDocs + 1).toString(),
                name: request.body.name,
                email: request.body.email,
                password: hashedPassword, // Use the hashed password
            });

            response.send({ success: true, message: "User registered successfully" });
        } catch (error) {
            response.status(500).send({ message: "Error registering user" });
        }
    });

    // login user to the database
    app.post('/api/royalapp/login', multer().none(), async (request, response) => {
        console.log('Login route reached');
        try {
            const user = await collection.findOne({ email: request.body.email });

            if (!user) {
                return response.status(404).send({ message: 'User not found' });
            }

            const passwordMatch = await bcrypt.compare(request.body.password, user.password);

            if (!passwordMatch) {
                return response.status(401).send({ message: 'Invalid credentials' });
            }

            // Send the user data without the password
            const { password, ...userData } = user;

            const token = jwt.sign({ id: userData.id }, "secret");

            response.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });

            response.send({ success: true, message: 'Login successful' });

        } catch (error) {
            console.error("Error during login:", error);
            response.status(500).send({ message: 'Internal Server Error' });
        }
    });

    // check current user
    app.get('/api/royalapp/user', async (request, response) => {
        try {
            const cookie = request.cookies['jwt'];
            const claims = jwt.verify(cookie, "secret");

            if (!claims) {
                return response.status(401).send({ message: 'Unauthorized' });
            }

            const user = await collection.findOne({ id: claims.id });
            const { password, ...userData } = user;

            response.send(userData);

        } catch (error) {
            return response.status(401).send({ message: 'Unauthorized' });
        }
    });

    // logout user
    app.post('/api/royalapp/logout', (request, response) => {
        response.cookie('jwt', '', { maxAge: 0 });
        response.send({ message: 'Logout successful' });
    });
}

connectToDatabase();

module.exports = app;
