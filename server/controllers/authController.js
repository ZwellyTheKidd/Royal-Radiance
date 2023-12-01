const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports.getUsers = (req,res) => {
    collection.find({}).toArray((error, result) => {
        response.send(result);
    });
};

module.exports.register = async (req,res) => {
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
};

module.exports.login =async (req,res) => {
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
};

module.exports.currentUser =async (req,res) => {
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

};

module.exports.logout = (req,res) => {
    response.cookie('jwt', '', { maxAge: 0 })

    response.send({
        message: 'Logout successful',
    });

};