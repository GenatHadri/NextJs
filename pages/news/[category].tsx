function ArticleListByCategory({ articles, category }) {
  return (
    <div className="justify-center flex flex-col items-center gap-4">
      <h1 className="text-2xl underline">
        Showing news for category <span className="italic">{category}</span>
      </h1>

      {articles.map((article) => (
        <div
          key={article.id}
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 px-5"
        >
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {article.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {article.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArticleListByCategory;

export async function getServerSideProps(context) {
  const { params, req, res, query } = context;
  const { category } = params;
  const response = await fetch(
    `http://localhost:4000/news?category=${category}`
  );
  const data = await response.json();

  // console.log(`Pre-rendering News Articles for category ${category}`);
  res.setHeader("Set-Cookie", ["name=Genat"]);
  // console.log(req.headers.cookie);
  // console.log(query);
  return {
    props: {
      articles: data,
      category,
    },
  };
}
