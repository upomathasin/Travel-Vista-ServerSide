require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000 || process.env.PORT;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running !!!!!");
});
app.listen(port, () => {
  console.log("listening on port ", port);
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.SECRET_USERNAME}:${process.env.SECRET_PASSWORD}@cluster0.2ckafac.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    // app.post("/placeOrder/:email", async (req, res) => {
    //   const collection = client.db("bookings").collection(req.params?.email);

    //   const result = await collection.insertOne(req.body);
    //   res.send(result);
    // });

    app.get("/offers", async (req, res) => {
      const data = client.db("offers").collection("collection").find();
      const result = await data.toArray();
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);
