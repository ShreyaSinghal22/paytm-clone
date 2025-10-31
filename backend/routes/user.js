const express = require('express');
const router = express.Router();
const zod = require("zod");
const { user } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const signupbody = zod.object({
    username : zod.string(),
    password : zod.string(),
    firstname : zod.string(),
    Lastname : zod.string(),
    email : zod.string().email(),
    Age : zod.number()
});

router.post("/signup", async (req,res)=>{
      const { success } = signupbody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Email already taken / incorrect inputs"
        })
    }

    const existingUser = await user.findOne({
        username: req.body.username
    })

    if(existingUser) {
        return res.status(411).json({
            message: "Email already taken/incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId = user._id;
    const token = jwt.sign({userId}, JWT_SECRET);
    
    res.json({
        msg: "user created",
        token: token
    })

});
    

const signinbody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})



router.post("/signin", async (req,res) => {
   const { success } = signinbody.safeParse(req.body)
   if(!success) {
    res.status(411).json({
        msg: "Incrorrect inputs"
    })
   }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })

});



module.exports = router;
