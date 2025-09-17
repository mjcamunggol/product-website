// app/page.js
"use client";

import { useEffect, useRef, useState } from "react";

const FEATURES = [
  {
    icon: (
      <svg
        className="w-10 h-10 text-pink-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M12 20l9-5-9-5-9 5 9 5z" />
        <path d="M12 12v8" />
        <path d="M3 7l9 5 9-5" />
      </svg>
    ),
    title: "Ergonomic Design",
    description:
      "Contours perfectly to your body, reducing strain and improving posture.",
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-pink-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Adjustable Comfort",
    description:
      "Multiple adjustment points to customize height, tilt, and lumbar support.",
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-pink-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M3 3h18v18H3z" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    title: "Premium Materials",
    description:
      "Soft-touch pink fabric with durable, sustainable frame materials.",
  },
];

const SPECS = [
  { label: "Height Range", value: "38 - 44 inches" },
  { label: "Weight Capacity", value: "Up to 250 lbs" },
  { label: "Material", value: "Breathable mesh & aluminum frame" },
  { label: "Adjustments", value: "Height, tilt, lumbar support" },
  { label: "Colors", value: "Soft Pink (this edition)" },
  { label: "Warranty", value: "5 years limited" },
];

export default function Page() {
  const scrollRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  // Texts for hero side text, alternating left/right
  const HERO_TEXTS = [
    "Introducing the Pink Ergonomic Chair",
    "Designed Specifically for Women & Girls",
    "Experience Comfort Like Never Before",
    "Sleek. Modern. Thoughtfully Crafted.",
  ];

  // Handle scroll to rotate 3D model and alternate text fade
  useEffect(() => {
    const onScroll = () => {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress through hero section (0 to 1)
      let progress = 1 - Math.max(0, rect.bottom) / (rect.height + windowHeight);
      progress = Math.min(Math.max(progress, 0), 1);

      // Rotate model from 0 to 360 degrees as user scrolls hero
      setRotation(progress * 360);

      // Change text every 25% scroll progress
      const newIndex = Math.min(
        HERO_TEXTS.length - 1,
        Math.floor(progress * HERO_TEXTS.length)
      );
      if (newIndex !== textIndex) {
        setFadeIn(false);
        setTimeout(() => {
          setTextIndex(newIndex);
          setFadeIn(true);
        }, 300);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [textIndex]);

  return (
    <>
      <style>{`
        /* Scrollbar hidden for clean look */
        ::-webkit-scrollbar {
          display: none;
        }
        /* Smooth fade animation */
        .fade-enter {
          opacity: 0;
          transform: translateY(10px);
        }
        .fade-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .fade-exit {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-exit-active {
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
      `}</style>

      <main className="bg-white text-gray-900 font-sans select-none">
        {/* Hero Section */}
        <section
          ref={scrollRef}
          className="relative flex flex-col md:flex-row items-center justify-center h-screen max-w-7xl mx-auto px-6 md:px-12 overflow-hidden"
        >
          {/* Left/Right Text */}
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 max-w-xs md:max-w-sm text-3xl md:text-5xl font-extrabold leading-tight text-gray-900 transition-opacity duration-500 ${
              fadeIn ? "opacity-100" : "opacity-0"
            } ${
              textIndex % 2 === 0
                ? "left-6 text-left"
                : "right-6 text-right"
            }`}
            style={{ willChange: "opacity, transform" }}
            aria-live="polite"
          >
            {HERO_TEXTS[textIndex]}
          </div>

          {/* Center 3D Model */}
          <div
            aria-label="3D rotating ergonomic chair model"
            role="img"
            className="w-72 h-72 md:w-[400px] md:h-[400px] relative"
            style={{
              perspective: "1200px",
            }}
          >
            {/* Simplified 3D chair model using SVG and CSS transform */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${rotation}deg) rotateX(10deg)`,
                transition: "transform 0.1s linear",
              }}
              aria-hidden="true"
            >
              {/* Base */}
              <rect
                x="70"
                y="150"
                width="60"
                height="10"
                fill="#f9c5d1"
                rx="5"
                ry="5"
                style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.1))" }}
              />
              {/* Seat */}
              <rect
                x="60"
                y="110"
                width="80"
                height="40"
                fill="#f7a8b8"
                rx="15"
                ry="15"
                style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))" }}
              />
              {/* Backrest */}
              <rect
                x="75"
                y="40"
                width="50"
                height="80"
                fill="#f48cae"
                rx="20"
                ry="20"
                style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))" }}
              />
              {/* Armrests */}
              <rect
                x="50"
                y="110"
                width="15"
                height="10"
                fill="#f48cae"
                rx="5"
                ry="5"
              />
              <rect
                x="135"
                y="110"
                width="15"
                height="10"
                fill="#f48cae"
                rx="5"
                ry="5"
              />
              {/* Wheels */}
              {[80, 120].map((x) => (
                <circle
                  key={x}
                  cx={x}
                  cy="165"
                  r="7"
                  fill="#d46a7e"
                  stroke="#b04f66"
                  strokeWidth="2"
                />
              ))}
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <h2 className="text-4xl font-extrabold text-center mb-16 tracking-tight">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {FEATURES.map(({ icon, title, description }, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center space-y-4 opacity-0 animate-fadeInUp animation-delay-[calc(200ms*var(--i))]"
                style={{ "--i": i }}
              >
                <div>{icon}</div>
                <h3 className="text-xl font-semibold text-pink-600">{title}</h3>
                <p className="text-gray-700 max-w-xs">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lifestyle Imagery Section */}
        <section className="bg-gray-50 py-20 px-6 md:px-12">
          <h2 className="text-4xl font-extrabold text-center mb-12 tracking-tight">
            In Your Space
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-xl overflow-hidden shadow-lg opacity-0 animate-fadeInUp animation-delay-[calc(200ms*var(--i))]"
                style={{ "--i": n }}
              >
                <img
                  src={`/lifestyle-${n}.jpg`}
                  alt={`Lifestyle image ${n} showing the ergonomic chair in a modern workspace`}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Specs Section */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
          <h2 className="text-4xl font-extrabold text-center mb-16 tracking-tight">
            Technical Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 text-gray-800 text-lg">
            {SPECS.map(({ label, value }, i) => (
              <div
                key={i}
                className="flex justify-between border-b border-gray-200 py-3 opacity-0 animate-fadeInUp animation-delay-[calc(100ms*var(--i))]"
                style={{ "--i": i }}
              >
                <dt className="font-semibold">{label}</dt>
                <dd className="text-right text-pink-600">{value}</dd>
              </div>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold text-lg px-10 py-4 rounded-full shadow-lg transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300"
              aria-label="Pre-order the pink ergonomic chair"
            >
              Pre-order Now
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8 px-6 md:px-12 text-gray-600 text-sm flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
          <div className="font-semibold text-pink-600 text-lg mb-4 md:mb-0">
            Pink Ergonomic Chair
          </div>
          <nav className="space-x-6">
            <a
              href="#"
              className="hover:text-pink-600 transition-colors duration-200"
              tabIndex={-1}
              aria-disabled="true"
            >
              About
            </a>
            <a
              href="#"
              className="hover:text-pink-600 transition-colors duration-200"
              tabIndex={-1}
              aria-disabled="true"
            >
              Support
            </a>
            <a
              href="#"
              className="hover:text-pink-600 transition-colors duration-200"
              tabIndex={-1}
              aria-disabled="true"
            >
              Contact
            </a>
          </nav>
        </footer>

        <style>{`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation-name: fadeInUp;
            animation-fill-mode: forwards;
            animation-duration: 0.6s;
            animation-timing-function: ease-out;
            animation-delay: var(--delay, 0ms);
          }
          /* Delay utility for animation */
          [style*="--i"] {
            --delay: calc(var(--i) * 150ms);
            animation-delay: var(--delay);
          }
        `}</style>
      </main>
    </>
  );
}