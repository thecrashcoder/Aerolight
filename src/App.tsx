import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { PopularDestinations } from './components/PopularDestinations';
import { HowItWorks } from './components/HowItWorks';
import { HotDeals } from './components/HotDeals';
import { Reviews } from './components/Reviews';
import { CTABanner } from './components/CTABanner';
import { Footer } from './components/Footer';
import { PlaceholderPage } from './components/PlaceholderPage';
import { ScrollToTop } from './components/ScrollToTop';

function Home() {
  return (
    <>
      <Hero />
      <PopularDestinations />
      <HowItWorks />
      <HotDeals />
      <Reviews />
      <CTABanner />
    </>
  );
}

function Layout() {
  return (
    <div className="w-full min-h-screen bg-ink-900 text-white selection:bg-azure-500/30 flex flex-col">
      <ScrollToTop />
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="flights" element={<PlaceholderPage title="Flights" />} />
          <Route path="hotels" element={<PlaceholderPage title="Hotels" />} />
          <Route path="packages" element={<PlaceholderPage title="Packages" />} />
          <Route path="deals" element={<PlaceholderPage title="Deals" />} />
          <Route path="about" element={<PlaceholderPage title="About Us" />} />
          <Route path="login" element={<PlaceholderPage title="Login" />} />
          <Route path="signup" element={<PlaceholderPage title="Sign Up" />} />
          <Route path="search" element={<PlaceholderPage title="Search Results" />} />
          <Route path="booking" element={<PlaceholderPage title="Booking" />} />
          <Route path="destination/:id" element={<PlaceholderPage title="Destination Detail" />} />
          <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
