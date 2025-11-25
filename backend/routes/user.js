const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User } = require("../db");
const { Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middlewares");


const signupbody = zod.object({
    username : zod.string(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string(),
    email : zod.string().email(),
    Age : zod.number()
});

router.post("/signup", async (req,res)=>{
      const result = signupbody.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({
            message: "Email already taken / incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        email: req.body.email
    })

    if(existingUser) {
        return res.status(411).json({
            message: "Email already taken/incorrect inputs"
        })
    }
    
    
    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            Age: req.body.Age,
            email: req.body.email
        });

        const userId = user._id;

        await Account.create({
            userId: userId,
            balance: 1 + Math.random() * 10000
        });

    } catch (error) {
        console.log("User creation failed:",error);
        return res.status(500).json({
            message: "Internal server error"
        });    
    }


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

const updatebody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})

router.put("/user" , authMiddleware, async(req,res)=>{
    const { success } = updatebody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            msg: "error while updating the information"
        })
    }

    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.json({
        msg: "updated successfully"
    })

})

router.get("/bulk" , async(req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
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
