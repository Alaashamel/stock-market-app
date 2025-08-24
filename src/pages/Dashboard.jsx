import { useState, useEffect } from "react";
import MarketOverview from "../components/market/MarketOverview";
import NewsFeed from "../components/news/NewsFeed";
import PortfolioSummary from "../components/portfolio/PortfolioSummary";
import AssetAllocation from "../components/portfolio/AssetAllocation";
import PerformanceAnalytics from "../components/portfolio/PerformanceAnalytics";


const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [greeting, setGreeting] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Tab navigation items
  const tabs = [
    {
      id: "overview",
      label: "Market Overview",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: "portfolio",
      label: "Portfolio",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: "performance",
      label: "Performance",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  // Quick watchlist data (replacing the missing Watchlist component)
  const watchlistStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 176.08, change: 1.24 },
    { symbol: 'MSFT', name: 'Microsoft', price: 337.69, change: -0.56 },
    { symbol: 'GOOGL', name: 'Alphabet', price: 138.21, change: 2.31 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 209.14, change: 3.42 }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            {greeting}! Here's your market overview.
          </p>
        </div>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Watchlist - Quick Overview (replacement for missing component) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Watchlist</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {watchlistStocks.map((stock) => (
                <div key={stock.symbol} className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="font-semibold text-gray-800">{stock.symbol}</div>
                  <div className="text-sm text-gray-600 truncate">{stock.name}</div>
                  <div className="font-bold text-lg mt-1">${stock.price.toFixed(2)}</div>
                  <div className={`text-sm font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabbed Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`py-4 px-6 text-center font-medium text-sm border-b-2 flex items-center transition-colors duration-200 ${
                      activeSection === tab.id
                        ? "border-blue-500 text-blue-600 bg-blue-50"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeSection === "overview" && <MarketOverview />}
              {activeSection === "portfolio" && <PortfolioSummary />}
              {activeSection === "performance" && <PerformanceAnalytics />}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* News Feed */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Market News</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                View All
              </button>
            </div>
            <NewsFeed limit={4} />
          </div>

          {/* Asset Allocation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Asset Allocation</h2>
            <AssetAllocation />
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-5 text-white">
            <h2 className="text-lg font-semibold mb-4">Portfolio Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Total Value</span>
                <span className="font-semibold">$145,678.23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Today's Change</span>
                <span className="font-semibold text-green-300">+$2,456.78 (+1.72%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Total Gain/Loss</span>
                <span className="font-semibold text-green-300">+$23,456.78 (+19.2%)</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-white text-blue-600 font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
              View Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;