import Link from "next/link";

function NewsArticleList({ articles }) {
  return (
    <div className="justify-center flex flex-col items-center gap-4">
      <h1 className="text-2xl underline">List of News Articles</h1>
      {articles.map((article) => {
        return (
          <Link
            key={article.id}
            href={`news/${article.category}`}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 px-5"
          >
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {article.title}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                • {article.category}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default NewsArticleList;

export async function getServerSideProps() {
  console.log("Pre-rendering NewsArticleList");
  const response = await fetch("http://localhost:4000/news");
  const data = await response.json();

  return {
    props: {
      articles: data,
    },
  };
}
