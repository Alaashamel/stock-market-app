import { useState } from "react";

const Watchlist = () => {
  const [watchlists, setWatchlists] = useState([
    {
      id: 1,
      name: "My Watchlist",
      stocks: [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          price: 176.08,
          change: 1.24,
          marketCap: "2.7T",
          sector: "Technology",
        },
        {
          symbol: "MSFT",
          name: "Microsoft Corporation",
          price: 337.69,
          change: -0.56,
          marketCap: "2.5T",
          sector: "Technology",
        },
        {
          symbol: "GOOGL",
          name: "Alphabet Inc.",
          price: 138.21,
          change: 2.31,
          marketCap: "1.7T",
          sector: "Technology",
        },
      ],
    },
    {
      id: 2,
      name: "Dividend Stocks",
      stocks: [
        {
          symbol: "JNJ",
          name: "Johnson & Johnson",
          price: 152.34,
          change: 0.89,
          marketCap: "395B",
          sector: "Healthcare",
        },
        {
          symbol: "XOM",
          name: "Exxon Mobil Corporation",
          price: 118.72,
          change: 2.31,
          marketCap: "475B",
          sector: "Energy",
        },
        {
          symbol: "JPM",
          name: "JPMorgan Chase & Co.",
          price: 168.32,
          change: 1.15,
          marketCap: "490B",
          sector: "Financial Services",
        },
      ],
    },
  ]);

  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeWatchlist, setActiveWatchlist] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const createWatchlist = () => {
    if (newWatchlistName.trim()) {
      const newWatchlist = {
        id: Date.now(),
        name: newWatchlistName,
        stocks: [],
      };
      setWatchlists([...watchlists, newWatchlist]);
      setNewWatchlistName("");
      setShowCreateForm(false);
    }
  };

  const removeWatchlist = (id) => {
    setWatchlists(watchlists.filter((wl) => wl.id !== id));
  };

  const removeStock = (watchlistId, symbol) => {
    setWatchlists(
      watchlists.map((wl) =>
        wl.id === watchlistId
          ? {
              ...wl,
              stocks: wl.stocks.filter((stock) => stock.symbol !== symbol),
            }
          : wl
      )
    );
  };

  // Filter stocks based on search term
  const filteredStocks = activeWatchlist
    ? activeWatchlist.stocks.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Watchlists</h2>
          <p className="text-gray-600">
            Track your favorite stocks and create custom lists
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mt-4 sm:mt-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          New Watchlist
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-200 mb-6">
          <h4 className="font-semibold text-blue-800 mb-3">
            Create New Watchlist
          </h4>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newWatchlistName}
              onChange={(e) => setNewWatchlistName(e.target.value)}
              placeholder="Enter watchlist name"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={createWatchlist}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                disabled={!newWatchlistName.trim()}
              >
                Create
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {activeWatchlist ? (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <button
                onClick={() => setActiveWatchlist(null)}
                className="mr-3 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h3 className="text-xl font-semibold text-gray-800">
                {activeWatchlist.name}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 absolute left-3 top-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                onClick={() => removeWatchlist(activeWatchlist.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete watchlist"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {filteredStocks.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredStocks.map((stock, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-2 rounded-lg mr-4">
                          <span className="font-bold text-gray-700">
                            {stock.symbol}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {stock.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                            <span>{stock.sector}</span>
                            <span className="text-gray-300">•</span>
                            <span>{stock.marketCap}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          ${stock.price.toFixed(2)}
                        </div>
                        <div
                          className={`text-sm font-medium ${
                            stock.change >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {stock.change >= 0 ? "+" : ""}
                          {stock.change.toFixed(2)}%
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          removeStock(activeWatchlist.id, stock.symbol)
                        }
                        className="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove from watchlist"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="text-gray-400 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">
                  No stocks in this watchlist
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Add stocks to start tracking
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlists.map((watchlist) => (
            <div
              key={watchlist.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setActiveWatchlist(watchlist)}
            >
              <div className="p-5 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-800">
                    {watchlist.name}
                  </h4>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {watchlist.stocks.length} stocks
                  </span>
                </div>
              </div>
              <div className="p-5">
                {watchlist.stocks.length > 0 ? (
                  <div className="space-y-4">
                    {watchlist.stocks.slice(0, 3).map((stock, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-1.5 rounded-md mr-3">
                            <span className="font-medium text-gray-700 text-sm">
                              {stock.symbol}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            ${stock.price.toFixed(2)}
                          </div>
                        </div>
                        <div
                          className={`text-xs font-medium ${
                            stock.change >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {stock.change >= 0 ? "+" : ""}
                          {stock.change.toFixed(2)}%
                        </div>
                      </div>
                    ))}
                    {watchlist.stocks.length > 3 && (
                      <div className="text-center pt-2">
                        <span className="text-blue-600 text-sm font-medium">
                          +{watchlist.stocks.length - 3} more
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>No stocks in this watchlist</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
