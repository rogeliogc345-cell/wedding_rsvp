"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type AboutMeProps = {
  name: string;
  description: string;
  image: string;
};

export default function AboutMe({ name, description, image }: AboutMeProps) {
  return (
    <section className="relative w-full py-20 px-6 md:px-16 bg-gradient-to-b from-white to-pink-50">
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl"
        >
          <Image
            src={image}
            alt={`${name} photo`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h2 className="text-3xl md:text-5xl font-light tracking-wide text-gray-800">
            Sobre mí
          </h2>

          <h3 className="mt-4 text-xl md:text-2xl font-medium text-pink-500 tracking-widest uppercase">
            {name}
          </h3>

          <p className="mt-6 text-gray-600 leading-relaxed text-justify text-base md:text-lg">
            {description}
          </p>

          {/* Decorative line */}
          <div className="mt-8 w-20 h-[2px] bg-pink-400 mx-auto md:mx-0" />
        </motion.div>

      </div>
    </section>
  );
}