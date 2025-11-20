const express = require('express');
const { default: mongoose } = require('mongoose');
const { user } = require("../db");

const { authMiddleware } = require("../middlewares");
const { Account } = require("../db");

const router = express.Router();

router.get("/balance", authMiddleware, async(req,res)=>{
     const account = await Account.findOne({
        userId: req.query.userId
    });

    res.json({
        balance: account.balance
    })

})

router.post("/transfer", authMiddleware, async(req,res)=>{
    const session = await mongooose.startSession();

    session.startTransaction();

    const to = req.body.to;
    const amount = req.body.amount;

    //Fetch teh accounts
    const account = await Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficient balance"
        });
    }

    const toaccount = await Account.findOne({userId:to}).session(session);

    if(!account) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Invalid account"
        })
    }

    //perform the transaction
    await Account.updateOne({userId: req.userId}, {$inc:{balance: -amount} }).session(session);
    await Account.updateOne({userId:to}, {$inc: {balance: amount} }).session(session);

    //commit the transaction
    await session.commitTransaction();
    res.json({
        msg:"Transfer successful"
    });

});

module.exports = router;