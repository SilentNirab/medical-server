const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json());

// DocHouse
// ar6oNsopU4xhueOc

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://DocHouse:ar6oNsopU4xhueOc@cluster0.ezxu64p.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const testimonialsCollection = client.db('docHouse').collection('testimonials')
    const doctorsCollection = client.db('docHouse').collection('doctors')

    // Testimonials api

    app.get('/testimonials', async (req, res) => {
      const cursor = testimonialsCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    // Doctors api

    app.get('/doctors', async (req, res) => {
      const cursor = doctorsCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  const cursor = 'dochouse is runnig';
  const result = cursor
  res.send(result)
})
app.listen(port, () => {
  console.log(`docHouse server is running on port : ${port}`);
})