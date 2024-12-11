const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const uri =
  "mongodb+srv://sumonmia4526:nerniSMAshiO@cluster0.xhl2h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    app.get("/", (req, res) => {
      res.send("sumon bangladesh");
    });
  } finally {
  }
}
run().catch(console.log);

app.listen(port, () => {
  console.log(`the server site is runing in Port:${port}`);
});
