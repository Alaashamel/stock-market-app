// src/hooks/useStockData.js
import { useState, useEffect } from 'react'
import { fetchStockData } from '../utils/api'

const useStockData = (symbol) => {
  const [stockData, setStockData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getStockData = async () => {
      try {
        setLoading(true)
        const data = await fetchStockData(symbol)
        setStockData(data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch stock data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (symbol) {
      getStockData()
    }
  }, [symbol])

  return { stockData, loading, error }
}

export default useStockData