require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { User, Account } = require("./db");

const demoPassword = "Test@12345";
const demoUsers = [
    { username: "maya.sharma@example.com", firstName: "Maya", lastName: "Sharma", balance: 125000 },
    { username: "arjun.mehta@example.com", firstName: "Arjun", lastName: "Mehta", balance: 48750.5 },
    { username: "priya.nair@example.com", firstName: "Priya", lastName: "Nair", balance: 9200 },
    { username: "rohan.kapoor@example.com", firstName: "Rohan", lastName: "Kapoor", balance: 1560.75 },
    { username: "ananya.iyer@example.com", firstName: "Ananya", lastName: "Iyer", balance: 73500 },
    { username: "vikram.singh@example.com", firstName: "Vikram", lastName: "Singh", balance: 250 },
    { username: "neha.patel@example.com", firstName: "Neha", lastName: "Patel", balance: 18400 },
    { username: "kabir.verma@example.com", firstName: "Kabir", lastName: "Verma", balance: 0 }
];

async function seed() {
    await mongoose.connection.asPromise();
    const hashedPassword = await bcrypt.hash(demoPassword, 10);

    for (const demoUser of demoUsers) {
        const user = await User.findOneAndUpdate(
            { username: demoUser.username },
            {
                $set: {
                    firstName: demoUser.firstName,
                    lastName: demoUser.lastName
                },
                $setOnInsert: {
                    username: demoUser.username,
                    password: hashedPassword
                }
            },
            { new: true, upsert: true, runValidators: true }
        );

        await Account.findOneAndUpdate(
            { userId: user._id },
            { $set: { balance: demoUser.balance } },
            { upsert: true, runValidators: true }
        );
    }

    console.log(`Seeded ${demoUsers.length} demo users.`);
    console.log(`Demo password for every user: ${demoPassword}`);
}

seed()
    .catch(error => {
        console.error("Database seed failed:", error.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.disconnect();
    });