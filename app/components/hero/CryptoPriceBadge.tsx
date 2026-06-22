'use client';

import { CryptoData } from '../../lib/crypto-api';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface CryptoPriceBadgeProps {
  crypto: CryptoData;
}

export function CryptoPriceBadge({ crypto }: CryptoPriceBadgeProps) {
  const isPositive = crypto.price_change_percentage_24h >= 0;
  
  return (
    <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/10 hover:border-primary/30 transition-all hover:scale-105 cursor-pointer">
      <img 
        src={crypto.image} 
        alt={crypto.name} 
        className="w-5 h-5 rounded-full"
      />
      <span className="font-medium text-sm">{crypto.symbol.toUpperCase()}</span>
      <span className="text-sm font-mono">
        ${crypto.current_price.toLocaleString(undefined, { 
          minimumFractionDigits: 2,
          maximumFractionDigits: 2 
        })}
      </span>
      <span className={`text-xs flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
      </span>
    </div>
  );
}