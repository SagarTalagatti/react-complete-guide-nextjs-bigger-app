import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is the very first meetup!",
  },
  {
    id: "m2",
    title: "Second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 251, 12345 Some City",
    description: "This is the second meetup!!",
  },
];

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return <MeetupList meetups={props.meetups} />;
}

// this function has to be named as such, because it is reserved. Next.js looks for this function, if it is defined in the page and calls it before rendering the page. Its important to note that we can define this function only in files present in pages directory as it only works over there, and not any other directory. The job of this function is to prepare props for this page. It can also be async.
export function getStaticProps() {
  // this function is executed on server-side or to be precise, on the 'during the build process side'.

  // need to reutrn an object always
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    // with revalidate, the page will be generated after specified interval
    revalidate: 10,
  };
}

// difference between getStaticProps and below function is that getServerSideProps will not run during build process, but instead on the server after deployment. It runs for every incoming request, hence no use of revalidate here.
// export function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
