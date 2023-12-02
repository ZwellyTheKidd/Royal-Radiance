// const express = require('express');
// const Router = express.Router();
// const User = require('../models/user');
// const bcrypt = require('bcryptjs');

// app.post('/api/royalapp/register', async(req, res)=> {
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword=await bcrypt.hash(req.body.password,salt)

//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword,
//     })

// const result = await user.save()

// const {password, ...data} = await result.JSON()
//     res.send(await user.save())
// })



app.post('/api/royalapp/register', async(req, res)=> {
   const user = await UserActivation.
    })


// module.exports =Router;