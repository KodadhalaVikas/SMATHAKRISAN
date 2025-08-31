const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://zany-journey-5grgww797wg37pxp-3000.app.github.dev/",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB Atlas");

    const db = mongoose.connection.useDb("smathakrisanDemo2");

    const userCollectionCount = await db
      .collection("users_details")
      .estimatedDocumentCount();
    if (userCollectionCount === 0) {
      await db.createCollection("users_details");
      console.log("User collection created");
    } else {
      console.log("User collection already exists");
    }

    app.post("/api/chatbot/query", async (req, res) => {
      const { question } = req.body;
      const ChatBotQuestion = db.collection("chat_botQuestions");

      try {
        const foundQuestion = await ChatBotQuestion.findOne({ question });

        if (foundQuestion) {
          res.json({ answer: foundQuestion.answer });
        } else {
          res.json({
            answer:
              "Hey, this is Smathakrisan. I am still learning. Need some time!!!",
          });
        }
      } catch (error) {
        console.error("Error while querying the database:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });
