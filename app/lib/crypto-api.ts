// CoinGecko API - Free, no API key needed
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
  high_24h?: number;
  low_24h?: number;
  ath?: number;
  ath_change_percentage?: number;
  atl?: number;
  atl_change_percentage?: number;
  circulating_supply?: number;
}

export interface GlobalStats {
  total_market_cap: number;
  total_volume: number;
  market_cap_change_percentage_24h: number;
}

export async function fetchTopCryptos(limit: number = 10): Promise<CryptoData[]> {
  const response = await fetch(
    `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`
  );
  
  if (!response.ok) throw new Error('Failed to fetch crypto data');
  return response.json();
}

export async function fetchGlobalStats(): Promise<GlobalStats> {
  const response = await fetch(`${COINGECKO_API}/global`);
  
  if (!response.ok) throw new Error('Failed to fetch global stats');
  const data = await response.json();
  
  return {
    total_market_cap: data.data.total_market_cap.usd,
    total_volume: data.data.total_volume.usd,
    market_cap_change_percentage_24h: data.data.market_cap_change_percentage_24h_usd
  };
}

export async function fetchCryptoHistory(id: string, days: number = 7) {
  const response = await fetch(
    `${COINGECKO_API}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  );
  
  if (!response.ok) throw new Error('Failed to fetch crypto history');
  return response.json();
}