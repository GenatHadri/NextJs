import { useRouter } from "next/router";

export default function Photo({ photo }) {
  // const router = useRouter();

  // if (router.isFallback) return <>Loading...</>;
  return (
    <div className="justify-center flex flex-col items-center gap-4">
      <h1 className="text-2xl underline">Single photo</h1>

      <div
        key={photo.id}
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
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  const data = await response.json();

  const first100Items = data.slice(0, 100);

  const paths = first100Items.map((post) => ({
    params: {
      photoId: `${post.id}`,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos/${params.photoId}`
  );
  const data = await response.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      photo: data,
    },
  };
}
