import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';

const NewsFeed = ({ limit }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllNews, setShowAllNews] = useState(false);

  // Simulate API call
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock news data
        const mockNews = [
          {
            id: 1,
            title: 'Federal Reserve Holds Interest Rates Steady Amid Inflation Concerns',
            summary: 'The Federal Reserve decided to maintain current interest rates while monitoring persistent inflation signals in the economy.',
            source: 'Financial Times',
            date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
            image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'economy',
            readTime: '3 min read'
          },
          {
            id: 2,
            title: 'Tech Stocks Rally as AI Investments Surge',
            summary: 'Major technology companies see significant stock gains following announcements of increased AI research and development budgets.',
            source: 'Bloomberg',
            date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'technology',
            readTime: '4 min read'
          },
          {
            id: 3,
            title: 'Oil Prices Climb Amid Supply Chain Disruptions',
            summary: 'Global oil prices increase by 4% as supply chain issues persist in key production regions.',
            source: 'Reuters',
            date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
            image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'energy',
            readTime: '2 min read'
          },
          {
            id: 4,
            title: 'Banking Sector Shows Resilience in Latest Stress Tests',
            summary: 'Major financial institutions demonstrate strong capital positions in the latest regulatory stress testing results.',
            source: 'Wall Street Journal',
            date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'finance',
            readTime: '5 min read'
          },
          {
            id: 5,
            title: 'Retail Sales Exceed Expectations in Q2 Report',
            summary: 'Consumer spending remains strong with retail sales growing 3.2% in the second quarter, surpassing analyst predictions.',
            source: 'CNBC',
            date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
            image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'retail',
            readTime: '3 min read'
          }
        ];

        setNews(mockNews);
        setLoading(false);
      } catch (err) {
        setError('Failed to load news. Please try again later.');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Filter news by category
  const filteredNews = activeCategory === 'all' 
    ? news 
    : news.filter(item => item.category === activeCategory);

  // Apply limit if provided and not showing all news
  const displayedNews = showAllNews ? filteredNews : filteredNews.slice(0, limit);

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'economy', name: 'Economy' },
    { id: 'technology', name: 'Technology' },
    { id: 'finance', name: 'Finance' },
    { id: 'energy', name: 'Energy' },
    { id: 'retail', name: 'Retail' }
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Market News</h2>
          <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-500">Loading latest news...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Market News</h2>
        <div className="text-center py-10">
          <div className="text-red-500 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load news</h3>
          <p className="text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      {/* Header with balanced spacing */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Market News</h2>
        <div className="flex flex-wrap gap-2 bg-gray-100 p-2 rounded-lg">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeCategory === category.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* News cards with balanced spacing */}
      <div className="space-y-5">
        {displayedNews.map((item) => (
          <NewsCard key={item.id} newsItem={item} />
        ))}
      </div>

      {/* View more button with balanced spacing */}
      {limit && filteredNews.length > limit && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAllNews(!showAllNews)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center mx-auto"
          >
            {showAllNews ? 'Show Less' : `View All News (${filteredNews.length})`}
            <svg 
              className={`ml-2 h-4 w-4 transition-transform ${showAllNews ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Empty state with balanced spacing */}
      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-5">
            <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">No news found</h3>
          <p className="text-gray-500">Try selecting a different category</p>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;