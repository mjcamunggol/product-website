"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { hover, motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";

const SCROLL_SECTION_HEIGHT = 1000; // px, approximate height of hero scroll section

// 3D Model component that rotates based on scroll progress (0 to 1)
function ErgonomicChairModel({ scrollProgress }) {
  const { scene } = useGLTF("/3d/scene.gltf");
  const ref = useRef();

  // Smooth rotation interpolation
  useFrame(() => {
    if (!ref.current) return;
    // Rotate around Y axis from 0 to 2*PI as scrollProgress goes 0 to 1
    const targetRotation = scrollProgress * Math.PI * 2;
    ref.current.rotation.y += (targetRotation - ref.current.rotation.y) * 0.1;
  });

  return <primitive ref={ref} object={scene} position={[0, -0.5, 0]} scale={1.3} />;
}

// Text block that fades in and slides from left or right
function ScrollTextBlock({ children, side = "left", scrollProgress, appearAt }) {
  // appearAt: scrollProgress value (0 to 1) when this text should appear
  // We'll fade in when scrollProgress is near appearAt ± 0.15

  const distance = Math.abs(scrollProgress - appearAt);
  const visible = distance < 0.15;

  const xOffset = side === "left" ? -50 : 50;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : xOffset }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`absolute top-1/2 transform -translate-y-1/2 max-w-xs md:max-w-md ${
        side === "left" ? "left-10 text-left" : "right-10 text-right"
      }`}
    >
      <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-gray-900 select-none">
        {children}
      </h2>
    </motion.div>
  );
}

export default function Page() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef();

  // Track scroll position relative to hero section
  useEffect(() => {
    function onScroll() {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      // Calculate scroll progress from 0 (top of hero visible) to 1 (hero scrolled past)
      // When rect.bottom <= 0, progress = 1
      // When rect.top >= window.innerHeight, progress = 0
      const progress = 1 - Math.min(Math.max(rect.bottom / window.innerHeight, 0), 1);
      setScrollY(progress);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Features data
  const features = [
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
          <path d="M3 10l9-5 9 5" />
        </svg>
      ),
      title: "Ergonomic Design",
      description:
        "Contours and support tailored specifically for women and girls, promoting healthy posture all day.",
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
        "Multiple adjustment points to customize height, tilt, and lumbar support for your unique needs.",
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
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ),
      title: "Premium Materials",
      description:
        "Soft-touch pink fabric with breathable mesh and durable frame built to last.",
    },
  ];

  // Specs data
  const specs = [
    { label: "Weight", value: "15 kg" },
    { label: "Dimensions", value: "120cm x 65cm x 65cm" },
    { label: "Material", value: "Breathable mesh & aluminum frame" },
    { label: "Adjustments", value: "Height, tilt, lumbar support" },
    { label: "Color", value: "Soft Pink" },
    { label: "Warranty", value: "5 years" },
  ];

  return (
    <>
      <style>{`
        /* Hide scrollbar for hero scroll effect */
        ::-webkit-scrollbar {
          display: none;
        }
        /* Scrollbar for other sections */
        body {
          scrollbar-width: thin;
          scrollbar-color: #f9a8d4 transparent;
        }
      `}</style>
      <main className="bg-white text-gray-900 font-sans selection:bg-pink-300 selection:text-white">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative h-screen max-h-[100vh] overflow-hidden flex items-center justify-center bg-white"
        >
          {/* Large intro text fixed top center */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            className="absolute top-20 left-1/2 transform -translate-x-1/2 text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-pink-600 select-none"
          >
            All-new Pink Ergo
          </motion.h1>

          {/* 3D Model Canvas */}
          <div className="w-full max-w-4xl h-[480px] md:h-[600px] mx-auto mt-25">
            <Canvas
              shadows
              camera={{ position: [0, 0, 3], fov: 40 }}
              style={{ touchAction: "none" }}
            >
              <ambientLight intensity={2} />
              <directionalLight position={[5, 5, 5]} intensity={3} />
              <ErgonomicChairModel scrollProgress={scrollY} />
              {/* Disable orbit controls for pure scroll rotation */}
            </Canvas>
          </div>

          {/* Scroll Text Blocks */}
          <ScrollTextBlock side="left" scrollProgress={scrollY} appearAt={0.15}>
            Ergonomic Support <br /> Tailored for You
          </ScrollTextBlock>
          <ScrollTextBlock side="right" scrollProgress={scrollY} appearAt={0.4}>
            Soft Pink <br /> Meets Strength
          </ScrollTextBlock>
          <ScrollTextBlock side="left" scrollProgress={scrollY} appearAt={0.65}>
            Adjustable <br /> For Every Body
          </ScrollTextBlock>
          <ScrollTextBlock side="right" scrollProgress={scrollY} appearAt={0.9}>
            Elevate Your <br /> Workspace Style
          </ScrollTextBlock>

          {/* Navigation-style buttons (non-functional) */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-6 select-none">
            {["Features", "Specs", "Pre-Order"].map((label, i) => (
              <button
                key={label}
                type="button"
                className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:border-pink-500 hover:text-pink-600 transition-colors duration-300"
                aria-label={`${label} section button (non-functional)`}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 bg-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-extrabold text-center mb-16 select-none"
          >
            Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map(({ icon, title, description }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center text-center space-y-4 px-4"
              >
                <div className="mb-2">{icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600 max-w-sm">{description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Lifestyle Imagery Section */}
        <section className="bg-gray-50 py-20 px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-extrabold text-center mb-16 select-none"
          >
            In Your Space
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              "/image.jpg",
              "/image2.jpg",
              "/image3.jpg",
            ].map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.2 }}
                className="rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src={src}
                  alt={`Lifestyle image ${i + 1}`}
                  width={600}
                  height={400}
                  className="object-cover w-full h-64 md:h-80"
                  priority={i === 0}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Specs Section */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-20 bg-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-extrabold text-center mb-12 select-none"
          >
            Technical Specifications
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8 text-gray-800">
            {specs.map(({ label, value }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="border-b border-gray-200 pb-3"
              >
                <dt className="text-sm font-medium text-gray-500">{label}</dt>
                <dd className="mt-1 text-lg font-semibold">{value}</dd>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pre-order Section */}
        <section className="bg-pink-50 py-20 flex flex-col items-center px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-extrabold mb-8 select-none text-pink-700"
          >
            Ready to Elevate Your Comfort?
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-pink-600 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-pink-700 transition-colors duration-300 select-none"
            aria-label="Pre-order button (non-functional)"
          >
            Pre-Order Now
          </motion.button>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8 px-6 md:px-12 max-w-7xl mx-auto select-none">
          {/* Brand + Nav */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-pink-600 font-extrabold text-xl tracking-wide mb-4 md:mb-0">
              PinkErgo
            </div>
            <nav className="flex space-x-8 text-gray-600 text-sm font-medium">
              <a href="#" className="hover:text-pink-600 transition-colors duration-300">
                Privacy
              </a>
              <a href="#" className="hover:text-pink-600 transition-colors duration-300">
                Terms
              </a>
              <a href="#" className="hover:text-pink-600 transition-colors duration-300">
                Contact
              </a>
            </nav>
          </div>
          {/* Disclaimer */}
          <div className="text-gray-500 text-xs mt-3 mb-4 text-center">
            Assets © creators — 3D model by{" "}
            <a
              href="https://sketchfab.com/MOUSIOON"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline cursor-pointer"
            >
              MUSKONGE
            </a>{" "}
            (CC BY 4.0), <br></br> images of SIHOO M18 Pink Ergonomic Chair.
          </div>
        </footer>
      </main>
    </>
  );
}