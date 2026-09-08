import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Star, Shield, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

const HERO_SLIDES = [
  {
    id: 1,
    tag: 'SPRING / SUMMER 2026',
    title: 'Architectural Restraint',
    subtitle: 'Sculpted linen blazers, fluid silk slips, and tailored drape cut for modern movement.',
    ctaText: 'Explore New Arrivals',
    category: 'All',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1800&auto=format&fit=crop',
  },
  {
    id: 2,
    tag: 'THE LINEN & MERINO SERIES',
    title: 'Tactile Modernism',
    subtitle: 'Pre-washed Belgian flax and extra-fine Australian merino wool engineered for all-day comfort.',
    ctaText: "Shop Women's Atelier",
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1800&auto=format&fit=crop',
  },
  {
    id: 3,
    tag: 'HOMME STRUCTURE',
    title: 'The Contemporary Layer',
    subtitle: 'Heavyweight organic twill overshirts, Japanese selvedge denim, and European tailored trousers.',
    ctaText: "Shop Men's Homme",
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1800&auto=format&fit=crop',
  },
];

export const HomePage: React.FC = () => {
  const { currentTheme, products, setActivePage, setSelectedCategory } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Carousel Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] max-h-[750px] overflow-hidden bg-neutral-900">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Cinematic Gradient Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            {/* Slide Content */}
            <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
              <div className="max-w-xl space-y-4 sm:space-y-6 text-white">
                <span className="inline-block text-xs uppercase tracking-[0.3em] font-semibold text-neutral-300">
                  {slide.tag}
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] font-heading">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-md">
                  {slide.subtitle}
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      if (slide.category !== 'All') {
                        setSelectedCategory(slide.category as any);
                      }
                      setActivePage('shop');
                    }}
                    className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-xl hover:opacity-95 transition-all flex items-center gap-2"
                    style={{
                      backgroundColor: currentTheme.accentColor,
                      borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '4px',
                    }}
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setActivePage('shop');
                    }}
                    className="px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 transition-colors"
                    style={{
                      borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '4px',
                    }}
                  >
                    View Lookbook
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Controls */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
            }
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm border border-white/20 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm border border-white/20 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 transition-all ${
                i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Categories Bento Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-1">
              Curated Divisions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 font-heading">
              Shop by Department
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActivePage('shop');
            }}
            className="text-xs font-semibold text-neutral-900 hover:text-neutral-600 flex items-center gap-1 group"
          >
            <span>Explore All 30 Pieces</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Women Card */}
          <div
            onClick={() => {
              setSelectedCategory('Women');
              setActivePage('shop');
            }}
            className="group relative h-96 overflow-hidden bg-neutral-100 cursor-pointer"
            style={{
              borderRadius: currentTheme.cardRadius === 'rounded-none' ? '0px' : '12px',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop"
              alt="Women's Collection"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-300">
                Atelier Series
              </span>
              <h3 className="text-2xl font-bold font-heading">Women's Apparel</h3>
              <p className="text-xs text-neutral-300 mt-1 mb-3">
                Virgin wool blazers, linen slip dresses & silk georgette blouses.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-white group-hover:underline">
                <span>Shop Women</span>
                <ArrowRight size={13} />
              </span>
            </div>
          </div>

          {/* Men Card */}
          <div
            onClick={() => {
              setSelectedCategory('Men');
              setActivePage('shop');
            }}
            className="group relative h-96 overflow-hidden bg-neutral-100 cursor-pointer"
            style={{
              borderRadius: currentTheme.cardRadius === 'rounded-none' ? '0px' : '12px',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop"
              alt="Men's Collection"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-300">
                Homme Series
              </span>
              <h3 className="text-2xl font-bold font-heading">Men's Essentials</h3>
              <p className="text-xs text-neutral-300 mt-1 mb-3">
                Heavyweight organic twill overshirts, selvedge denim & merino polo knits.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-white group-hover:underline">
                <span>Shop Men</span>
                <ArrowRight size={13} />
              </span>
            </div>
          </div>

          {/* Unisex & Accessories Card */}
          <div
            onClick={() => {
              setSelectedCategory('Accessories');
              setActivePage('shop');
            }}
            className="group relative h-96 overflow-hidden bg-neutral-100 cursor-pointer"
            style={{
              borderRadius: currentTheme.cardRadius === 'rounded-none' ? '0px' : '12px',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop"
              alt="Leather & Accessories"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-300">
                Craft Studio
              </span>
              <h3 className="text-2xl font-bold font-heading">Leather & Knits</h3>
              <p className="text-xs text-neutral-300 mt-1 mb-3">
                Full-grain Italian leather totes, Mongolian cashmere beanies & scarves.
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-white group-hover:underline">
                <span>Shop Accessories</span>
                <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-1">
              Seasonal Release
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 font-heading">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActivePage('shop');
            }}
            className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-neutral-600 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial Campaign Banner */}
      <section className="bg-neutral-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-neutral-300 text-xs tracking-wider uppercase font-semibold">
              <Sparkles size={12} style={{ color: currentTheme.accentColor }} />
              <span>Sustainable Honest Craft</span>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading leading-tight">
              Pure Fibers. Zero Compromise.
            </h2>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-lg">
              Every garment begins with our commitment to natural fibers: unbleached organic
              cotton, certified Mongolian cashmere, and Belgian flax linen. We believe true luxury is
              how a piece feels against your skin in year ten—not just day one.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-neutral-800">
              <div>
                <p className="text-2xl font-bold font-heading text-white">100%</p>
                <p className="text-xs text-neutral-400 mt-1">Traceable Sourcing</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-heading text-white">0%</p>
                <p className="text-xs text-neutral-400 mt-1">Virgin Polyester</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-heading text-white">30-Day</p>
                <p className="text-xs text-neutral-400 mt-1">Trial In Home</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('Women');
                  setActivePage('shop');
                }}
                className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-opacity"
                style={{
                  backgroundColor: currentTheme.accentColor,
                  borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '4px',
                }}
              >
                Explore The Atelier
              </button>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop"
              alt="AURAQ Craftsmanship"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded">
              <p className="text-xs italic text-neutral-200">
                "AURAQ creates the rare wardrobe pieces you return to every single morning without thinking."
              </p>
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mt-2">
                — British Fashion Review
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-1">
              Client Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 font-heading">
              Most Coveted Pieces
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActivePage('shop');
            }}
            className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-neutral-600 flex items-center gap-1 group"
          >
            <span>Shop All Bestsellers</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
