const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const uri =
  "mongodb+srv://sumonmia4526:ry7cI7qFcAijgVKk@cluster0.xhl2h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  const newDatabase = client.db("styloClientDB").collection("styloData");
  try {
    app.post("/", async (req, res) => {
      const users = req.body;
      const query = await newDatabase.insertOne(users);
      res.send(query);
    });

    app.get("/users", async (req, res) => {
      const findusers = newDatabase.find();
      const result = await findusers.toArray();
      //   console.log(result);
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await newDatabase.deleteOne(query);
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const findit = { _id: new ObjectId(id) };
      const result = await newDatabase.findOne(findit);
      //   console.log(result);
      res.send(result);
    });

    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: user.name,
          email: user.email,
        },
      };
      const result = await newDatabase.updateOne(filter, updateDoc, options);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.log);

app.listen(port, () => {
  console.log(`the server site is runing in Port:${port}`);
});
