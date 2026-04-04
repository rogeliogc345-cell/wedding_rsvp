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
        id: 11,
        url: '/hanni/imagenes/sobre.jpeg',
        alt: 'sobre',
        aspectRatio: 4 / 3,
    },
    {
        id: 12,
        url: '/hanni/imagenes/sobre1.jpeg',
        alt: 'sobre1',
        aspectRatio: 4 / 3,
    },
    {
        id: 13,
        url: '/hanni/imagenes/hashtag.jpeg',
        alt: 'hashtag',
        aspectRatio: 4 / 3,
    }
]


const HanniSobresDinero = () => {
    return (
        <div className="w-full flex flex-col">
            {imagenes.map((img, index) => (
                <div key={img.id} className="w-full">
                    <Image
                        src={img.url}
                        alt={img.alt}
                        width={1600}
                        height={1200}
                        className="w-full h-auto"
                        priority={index === 0}
                    />
                </div>
            ))}
        </div>
    )
}

export default HanniSobresDinero