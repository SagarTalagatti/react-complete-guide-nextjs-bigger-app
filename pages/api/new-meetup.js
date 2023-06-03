import { MongoClient, ServerApiVersion } from "mongodb";

// url: /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const { title, image, address, description } = data;

    const mongoClient = new MongoClient(
      "mongodb+srv://sagar_talagatti:test123@firstcluster.wggvzes.mongodb.net/?retryWrites=true&w=majority",
      {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      }
    );
    const client = await mongoClient.connect();

    console.log(data);
    const db = client.db('meetups');

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    await client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
