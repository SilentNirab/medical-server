const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json());

// DocHouse
// ar6oNsopU4xhueOc

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const doctorsServices = client.db('docHouse').collection('services')
    const doctorsServiceItems = client.db('docHouse').collection('service_items')
    const doctorsAppontment = client.db('docHouse').collection('appointments')

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

    app.get('/doctors/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await doctorsCollection.findOne(query);
      res.send(result)
    })

    // services api 
    app.get('/services', async (req, res) => {
      const services = doctorsServices.find()
      const result = await services.toArray()
      res.send(result)
    })

    // service_item api
    // app.get('/service_items', async (req, res) => {
    //   const service_items = doctorsServiceItems.find()
    //   const result = await service_items.toArray()
    //   res.send(result)
    // })
    app.get('/service_items/:category', async (req, res) => {
      const category = req.params.category;
      const items = doctorsServiceItems.find({ service_category: category });
      const result = await items.toArray()
      res.json(result);
    });

    // appointment api
    app.get('/appointments', async(req, res) => {
      const appointment = doctorsAppontment.find();
      const result = await appointment.toArray()
      res.send(result)
    })

    app.get('/appointments/:user_email', async (req, res) => {
      const email = req.params.category;
      const items = doctorsAppontment.find({ user_email: email });
      const result = await items.toArray()
      res.json(result);
    });
    app.post('/appointments', async(req, res) => {
      const appointment = req.body;
      const result = await doctorsAppontment.insertOne(appointment)
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