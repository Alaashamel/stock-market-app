const NewsCard = ({ newsItem }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return `${Math.floor(diffInHours / 24)} days ago`;
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img 
            src={newsItem.image} 
            alt={newsItem.title} 
            className="w-20 h-20 object-cover rounded-lg" 
          />
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-lg leading-tight">
            {newsItem.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {newsItem.summary}
          </p>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              <span className="font-medium">{newsItem.source}</span>
              <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">
                {newsItem.readTime}
              </span>
            </div>
            <span>{formatDate(newsItem.date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;