import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { checkBackend } from './services/api';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Ingredients from './pages/Ingredients';
import About from './pages/About';
import Checkout from './pages/Checkout';
import './styles/global.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function AppLayout() {
  useEffect(() => {
    checkBackend()
      .then((data) => {
        console.log("NUTRICO Backend Connected:", data.message);
      })
      .catch((error) => {
        console.error("NUTRICO Backend Connection Failed:", error);
      });
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Cart />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductDetail />} />
        <Route path="/ingredients" element={<Ingredients />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={
          <div style={{ textAlign: 'center', padding: '160px 24px' }}>
            <h1 style={{ fontFamily: 'Playfair Display', fontSize: 48, color: '#3D2B1A' }}>404</h1>
            <p style={{ color: '#6B6B6B', marginBottom: 32, fontSize: 18 }}>This page doesn't exist.</p>
            <a href="/" className="btn-primary">Go Home</a>
          </div>
        } />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppLayout />
      </CartProvider>
    </BrowserRouter>
  );
}
