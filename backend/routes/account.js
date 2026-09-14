const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const mongoose = require('mongoose'); 
const zod = require("zod");

const router = express.Router();

const transferSchema = zod.object({
    amount: zod.number().finite().positive(),
    to: zod.string().refine(value => mongoose.Types.ObjectId.isValid(value))
});

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            })
        }

        res.json({
            balance: account.balance,
        })
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const parsedBody = transferSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Amount must be a positive number and recipient must be valid"
        });
    }

    const { amount, to } = parsedBody.data;
    if (to === req.userId.toString()) {
        return res.status(400).json({
            message: "Cannot transfer money to yourself"
        });
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const account = await Account.findOneAndUpdate(
            { userId: req.userId, balance: { $gte: amount } },
            { $inc: { balance: -amount } },
            { new: true, session }
        );

        if (!account) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });
    }
    catch (err) {
        console.error("Transfer error:", err);
        if (session.inTransaction()) {
            await session.abortTransaction();
        }

        res.status(500).json({
            success: false,
            message: "Transfer failed"
        });
    } finally {
        await session.endSession();
    }
});

module.exports = router;