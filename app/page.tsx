import { HeroSection } from './components/hero/HeroSection';
import { Header } from './components/Header';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
    </main>
  );
}