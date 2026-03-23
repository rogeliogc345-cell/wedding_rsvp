'use client'
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';


  type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const targetDate = new Date("2026-12-20T18:00:00");

function getTimeLeft(): Countdown {
  const difference = +targetDate - +new Date();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}
const XVHeroComponent = () => {
  const [timeLeft, setTimeLeft] = useState<Countdown | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Set initial time and mark as hydrated
    setTimeLeft(getTimeLeft());
    setIsHydrated(true);

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  


  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center text-white">
    {/* Background Image */}
      <Image
        src="/XVAnos_5.jpg"
        alt="Wedding background"
        fill
        priority
       
      
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Names */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-light tracking-widest uppercase"
        >
          Fernanda
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-sm md:text-lg tracking-[0.3em] uppercase text-gray-200"
        >
          Mis XV años.
        </motion.p>

        {/* Countdown */}
        {isHydrated && timeLeft && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-10 flex justify-center gap-4 md:gap-8"
          >
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center 
                           w-16 h-16 md:w-24 md:h-24 
                           rounded-full border border-white/40 
                           backdrop-blur-md bg-white/10 shadow-lg"
              >
                <span className="text-lg md:text-2xl font-semibold">
                  {item.value}
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-200">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
    
  )
}

export default XVHeroComponent