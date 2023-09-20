import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function EventList({ eventList }) {
  const [events, setEvents] = useState(eventList);
  const router = useRouter();

  const fetchSportsEvents = async () => {
    const response = await fetch(
      "http://localhost:4000/events?category=sports"
    );
    const data = await response.json();
    setEvents(data);
    router.push("/events?category=sports", undefined, { shallow: true });
  };

  return (
    <div className="justify-center flex flex-col items-center gap-4 mt-4">
      <h1 className="text-2xl underline">List of Events</h1>

      <button
        className="border border-black rounded-md p-2"
        onClick={fetchSportsEvents}
      >
        Sports Events
      </button>

      {events.map((event) => (
        <Link
          key={event.id}
          href={``}
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 px-5"
        >
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {event.title} - {event.date} | {event.category}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              • {event.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default EventList;

export async function getServerSideProps(context) {
  const { query } = context;
  const { category } = query;

  const queryString = category ? "category=sports" : "";

  const response = await fetch(`http://localhost:4000/events?${queryString}`);
  const data = await response.json();

  console.log("category: ", category);

  return {
    props: {
      eventList: data,
    },
  };
}
