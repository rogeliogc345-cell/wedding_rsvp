"use client";

import { motion } from "framer-motion";
import { Clock, Heart, Music, Camera, Utensils, Sparkles } from "lucide-react";

type EventItem = {
  time: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
};

type ItineraryProps = {
  events: EventItem[];
};

export default function ItineraryQuinceanera ({ events }: ItineraryProps)  {
  return (
    <section className="w-full py-20 px-6 md:px-16 bg-white">
      
    
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-light tracking-wide text-gray-800">
          Itinerario
        </h2>
        <div className="mt-4 w-20 h-[2px] bg-pink-400 mx-auto" />
      </div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-pink-200 -translate-x-1/2" />

        <div className="space-y-4">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative flex items-center justify-between ${
                  isLeft ? "flex-row" : "flex-row-reverse"
                }`}
              >
                
                {/* Content Card */}
                <div className="w-[45%]">
                  <div className="bg-pink-50/60 backdrop-blur-md p-6 rounded-2xl shadow-md border border-pink-100 hover:shadow-lg transition-shadow duration-300">
                    
                    {/* Icon and Time */}
                    <div className="flex items-center gap-3 mb-3">
                      {event.icon && (
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-pink-400"
                        >
                          {event.icon}
                        </motion.div>
                      )}
                      <p className="text-sm text-pink-400 tracking-widest uppercase font-medium">
                        {event.time}
                      </p>
                    </div>

                    <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                      {event.title}
                    </h3>

                    {event.description && (
                      <p className="mt-2 text-gray-600 text-sm">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Dot */}
                <div className="relative z-10 w-4 h-4 bg-pink-400 rounded-full border-4 border-white shadow-md" />

                {/* Spacer */}
                <div className="w-[45%]" />
              </motion.div>
            );
          })}
        </div>
      </div> 
    </section>
  );
}


