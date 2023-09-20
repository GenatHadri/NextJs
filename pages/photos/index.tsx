import Link from "next/link";

export default function PhotoList({ photos }) {
  return (
    <div className="justify-center flex flex-col items-center gap-4">
      <h1 className="text-2xl underline">List of Photos</h1>
      {photos.map((photo) => {
        return (
          <Link
            key={photo.id}
            href={`photos/${photo.id}`}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 px-5"
          >
            <img
              className="object-cover w-full rounded-lg h-96 md:h-auto md:w-48 md:rounded-lg"
              src={photo.thumbnailUrl}
              alt={photo.title}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  const data = await response.json();

  return {
    props: {
      photos: data.slice(0, 200),
    },
  };
}
