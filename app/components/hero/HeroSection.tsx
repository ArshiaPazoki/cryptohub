'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { 
  Search, 
  ArrowRight, 
  TrendingUp, 
  Shield, 
  Zap, 
  Coins,
  Activity,
  DollarSign,
  Globe,
  Loader2
} from 'lucide-react';
import { fetchTopCryptos, fetchGlobalStats, CryptoData, GlobalStats } from '../../lib/crypto-api';
import { CryptoPriceBadge } from './CryptoPriceBadge';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cryptoData, statsData] = await Promise.all([
          fetchTopCryptos(6),
          fetchGlobalStats()
        ]);
        setCryptos(cryptoData);
        setGlobalStats(statsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    return `$${(value / 1e6).toFixed(2)}M`;
  };

  const stats = [
    { 
      label: 'Total Market Cap', 
      value: globalStats ? formatMarketCap(globalStats.total_market_cap) : '...',
      change: globalStats?.market_cap_change_percentage_24h,
      icon: DollarSign
    },
    { 
      label: '24h Volume', 
      value: globalStats ? formatMarketCap(globalStats.total_volume) : '...',
      icon: Activity
    },
    { 
      label: 'Active Coins', 
      value: '12,345',
      icon: Globe
    },
  ];

  const popularCoins = cryptos.slice(0, 5).map(c => c.name);

  return (
    <section className="relative overflow-hidden pb-20 pt-4 min-h-[90vh] flex items-center">
      {/* Background Container */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid" />
        
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-mesh" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl animate-pulse-slow" />
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-particle"
              style={{
                left: `${Math.random() * 50}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Brand Badge */}
          {/* <Badge variant="outline" className="px-4 py-2 text-sm border-primary/30 bg-primary/5 animate-fade-in backdrop-blur-sm">
            <Coins className="h-4 w-4 mr-2" />
            CryptoHub • Live Crypto Data
          </Badge> */}

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight animate-fade-in-up">
            Your Gateway to{' '}
            <span className="bg-gradient-to-r from-primary via-primary to-blue-500 bg-clip-text text-transparent animate-gradient">
              Crypto
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up delay-100">
            Live prices, market trends, and real-time data for thousands of cryptocurrencies.
            All in one place.
          </p>

          {/* Real-time Crypto Prices */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up delay-200">
            {loading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading prices...</span>
              </div>
            ) : (
              cryptos.map((crypto) => (
                <CryptoPriceBadge key={crypto.id} crypto={crypto} />
              ))
            )}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-300">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search any cryptocurrency..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-14 text-lg bg-background/50 backdrop-blur-sm border-primary/20 focus-visible:ring-primary/50"
              />
            </div>
            <Button type="submit" size="lg" className="h-14 px-8">
              Search
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          {/* Popular Tags */}
          <div className="flex flex-wrap justify-center gap-2 animate-fade-in-up delay-400">
            <span className="text-sm text-muted-foreground mr-1">Popular:</span>
            {loading ? (
              <span className="text-sm text-muted-foreground">Loading...</span>
            ) : (
              popularCoins.map((coin) => (
                <Badge
                  key={coin}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary/20 transition-colors px-3 py-1.5 backdrop-blur-sm"
                  onClick={() => setSearchQuery(coin)}
                >
                  {coin}
                </Badge>
              ))
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-in-up delay-500">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.change && stat.change > 0;
            
            return (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-xl p-4 text-center border border-primary/5 hover:border-primary/20 transition-all hover:scale-105 group"
              >
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-1">
                  <Icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>{stat.label}</span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                {stat.change !== undefined && (
                  <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? '↑' : '↓'} {Math.abs(stat.change).toFixed(2)}%
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Features */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 max-w-3xl mx-auto animate-fade-in-up delay-600">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-5 w-5 text-primary" />
            <span>Real-time updates</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Market analytics</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-5 w-5 text-primary" />
            <span>Secure & reliable</span>
          </div>
        </div>
      </div>
    </section>
  );
}