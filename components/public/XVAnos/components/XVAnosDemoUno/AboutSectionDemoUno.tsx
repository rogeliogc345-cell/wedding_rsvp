"use client"

import Image from "next/image"

export function AboutSectionDemoUno({ name, about_me }: { name?: string, about_me?: string | null }) {
    console.log("about", about_me)
    return (
        <section id="about" className="py-20 px-4 bg-background">
            <div className="w-full lg:max-w-4xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-12">
                    <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4 text-left lg:text-center">
                        Conoce a
                    </p>
                    <h2
                        className="text-6xl  md:text-8xl text-primary font-wedding"

                    >
                        La Quinceañera
                    </h2>
                    <div className="mt-4 flex items-center justify-center gap-4 text-center">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                        <div className="w-2 h-2 rotate-45 bg-gold" />
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                    </div>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 to-primary/20 rounded-3xl blur-xl" />
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-4 border-gold/30 shadow-2xl">
                            <Image
                                src="/hanni/hani1.jpeg"
                                alt="Valentina - Quinceañera"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-gold" />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-gold" />
                    </div>

                    {/* Text content */}
                    <div className="space-y-6">
                        <h3
                            className="text-4xl text-primary"
                            style={{ fontFamily: 'var(--font-great-vibes)' }}
                        >
                            Hola, {name || "name"}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {!about_me ? "Hoy celebro una de las etapas más importantes de mi vida. Mis XV años" +
                                " representan el comienzo de una nueva aventura, llena de sueños," +
                                " esperanzas y momentos inolvidables." : about_me}
                        </p>


                        {/* Signature */}
                        <div className="pt-4">
                            <p
                                className="text-3xl text-gold font-wedding"

                            >
                                Con cariño, {name || "name"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
