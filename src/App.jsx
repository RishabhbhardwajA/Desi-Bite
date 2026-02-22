import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import StatsCounter from './components/StatsCounter';
import SpecialOffers from './components/SpecialOffers';
import About from './components/About';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';

export default function App() {
    return (
        <CartProvider>
            <div className="min-h-screen bg-offwhite">
                <Navbar />
                <Hero />
                <MenuSection />
                <StatsCounter />
                <SpecialOffers />
                <About />
                <Gallery />
                <Testimonials />
                <Contact />
                <Footer />
                <CartSidebar />
            </div>
        </CartProvider>
    );
}
