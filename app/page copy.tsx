'use client';

import { useEffect, useState } from 'react';
import { CryptoData } from './types/crypto';
import { fetchTopCryptos } from './lib/crypto-api';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';

export default function Home() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopCryptos(200).then(data => {
      setCryptos(data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">📊 Crypto Watch</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Cryptocurrencies</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>24h Change</TableHead>
                <TableHead>Market Cap</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cryptos.map((crypto, index) => (
                <TableRow key={crypto.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
                      {crypto.name} ({crypto.symbol.toUpperCase()})
                    </div>
                  </TableCell>
                  <TableCell>${crypto.current_price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={crypto.price_change_percentage_24h >= 0 ? 'default' : 'destructive'}>
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </Badge>
                  </TableCell>
                  <TableCell>${crypto.market_cap.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}