
const express = require('express');

const router = express.Router();
const zod  = require('zod');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");
const {authMiddleware} = require('../middleware');

// const bcrypt = require('bcrypt');
// const config = require("../config");
// require("dotenv").config();
 


const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6)
})

const bcrypt = require("bcryptjs");


router.post("/signup",async (req,res) => {
    const {success} = signupSchema.safeParse(req.body)
    if(!success){
        return res.status(411).json({ 
            message: "Email already taken ",
        })
        
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser){
        return res.status(411).json({ 
            message: "Email already taken / Incorrect inputs",
        })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
        username: req.body.username,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() *10000
    })


    const token = jwt.sign({
        userId
    },JWT_SECRET)

    
    res.json({
        message: "User created successfully",
        token:token
    })
})


const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username
    });

    if (!user) {
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (isValid) {
        const token = jwt.sign({
            userId: user._id,
        }, JWT_SECRET)

        res.json({
            token: token
        })
        return
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})



const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information",
        })
    }

    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await User.updateOne({ _id: req.userId }, { $set: req.body })

    res.json({
        message: "Updated successfully",
    })
})


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter,
                "$options": "i"
            }
        }, {
            lastName: {
                "$regex": filter,
                "$options": "i"
            }
        }]
    })


    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;