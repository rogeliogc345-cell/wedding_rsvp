import React from 'react'
import Image from 'next/image'


interface ImageProps {
    id: number;
    url: string;
    alt: string;
    aspectRatio: number;
}

const imagenes: ImageProps[] = [
    {
        id: 10,
        url: '/hanni/imagenes/calendario_hani.jpeg',
        alt: 'calendario',
        aspectRatio: 4 / 3,
    },
    {
        id: 12,
        url: '/hanni/imagenes/sobre1.jpeg',
        alt: 'sobre1',
        aspectRatio: 4 / 3,
    },
]


const HanniSobresDinero = () => {
    return (
        <section className="relative w-full py-20 px-4 bg-[url('/hanni/fondo_10.jpeg')] bg-cover bg-top ">
            {/* Soft overlay */}
            <div className="absolute inset-0 bg-white/10" />

            <div className="relative max-w-xl mx-auto flex flex-col items-center gap-8">
                {/* Header */}
                <div className="text-center mb-4">
                    <h2 className="font-savoir text-4xl md:text-5xl font-light text-gray-900 tracking-wide mb-3">

                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
                </div>

                {/* Images */}
                {imagenes.map((img, index) => (
                    <div
                        key={img.id}
                        className="w-full rounded-2xl overflow-hidden shadow-xl border border-white/60"
                    >
                        <Image
                            src={img.url}
                            alt={img.alt}
                            width={1600}
                            height={Math.round(1600 / img.aspectRatio)}
                            className="w-full h-auto"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default HanniSobresDinero