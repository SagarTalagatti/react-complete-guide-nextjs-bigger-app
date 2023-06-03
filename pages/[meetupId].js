import { MongoClient, ObjectId } from "mongodb";

import Head from "next/head";
import { Fragment } from "react";

import MeetupDetail from "../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

// this function is needed when we are using getStaticProps for dynamic path pages.
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://sagar_talagatti:test123@firstcluster.wggvzes.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db("meetups");
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  // we could fetch data for single meetup
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://sagar_talagatti:test123@firstcluster.wggvzes.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db("meetups");
  const meetupsCollection = db.collection("meetups");

  const meetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
      },
    },
  };
}

export default MeetupDetails;
