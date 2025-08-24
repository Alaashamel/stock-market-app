import NewsFeed from '../components/news/NewsFeed'

const News = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Market News</h1>
      <NewsFeed />
    </div>
  )
}

export default News