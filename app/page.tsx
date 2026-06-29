// src/app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Smartphone, Music2, PanelsRightBottom } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen selection:bg-rose-200 selection:text-rose-950 text-rose-900">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/60 via-white to-amber-50/60 -z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-rose-50/10 via-transparent to-transparent opacity-60 -z-0"></div>

        <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          <div className="text-2xl font-serif tracking-tighter italic">XVBoda</div>
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-rose-700">
            <Link href="#features" className="hover:text-rose-900 transition">Características</Link>
            <Link href="#pricing" className="hover:text-rose-900 transition">Precios</Link>
          </div>
        </nav>

        <section className="relative flex items-center justify-center text-center px-6 pt-24 pb-32">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 justify-center mb-6 opacity-90">
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span className="uppercase tracking-[0.35em] text-[11px] text-rose-600">Tu historia, nuestra pasión</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.12)]">
              Invitaciones Digitales Cinemáticas
              <div className="mt-4 text-2xl md:text-3xl italic text-rose-600/90 font-semibold">Tan únicas como tu historia — elegancia, música y recuerdo</div>
            </h1>

            <p className="text-lg text-rose-700/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Crea una experiencia para tus invitados: confirmaciones personalizadas, galería de recuerdos y una atmósfera sonora que emociona.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-gradient-to-br from-rose-700 to-rose-500 text-white hover:from-rose-800 hover:to-rose-600 px-8 py-4 rounded-full text-lg shadow-2xl shadow-rose-900/20">
                  Comenzar ahora <ArrowRight className="ml-2" />
                </Button>
              </Link>

              <Button variant="outline" className="px-8 py-4 rounded-full text-lg border-amber-300 text-rose-700 hover:bg-amber-50">
                Ver Demo
              </Button>
            </div>
          </div>

          {/* Decorative cinematic glow */}
          <div className="pointer-events-none absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[80%] h-72 bg-gradient-to-t from-transparent via-amber-100/30 to-transparent blur-3xl opacity-60 rounded-full" />
        </section>
      </header>

      {/* --- FEATURE GRID --- */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">

            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-amber-400" />}
              title="RSVP Seguro"
              description="Confirmaciones con códigos únicos y privacidad para tus invitados."
            />

            <FeatureCard
              icon={<Smartphone className="w-8 h-8 text-amber-400" />}
              title="Mobile First"
              description="Experiencias adaptadas a dispositivos, con navegación simple y elegante."
            />

            <FeatureCard
              icon={<PanelsRightBottom className="w-8 h-8 text-amber-400" />}
              title="Galería de recuerdos"
              description="Comparte fotos y videos con un diseño limpio que realza tus momentos."
            />

            <FeatureCard
              icon={<Music2 className="w-8 h-8 text-amber-400" />}
              title="Música de ambiente"
              description="Incluye tu canción favorita; reproduce automáticamente para crear ambiente."
            />

            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-amber-400" />}
              title="Detalles personalizados"
              description="Tipografías, paletas y toques dorados para una identidad única."
            />

            <FeatureCard
              icon={<ArrowRight className="w-8 h-8 text-amber-400" />}
              title="Fácil de enviar"
              description="Compartir invitaciones por link o QR en segundos."
            />

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 text-center text-rose-700 border-t border-rose-100 bg-gradient-to-t from-transparent to-amber-50">
        <p className="font-serif italic text-2xl text-rose-900 mb-4">XVBoda</p>
        <p className="text-xs uppercase tracking-widest">&copy; 2026 Creado con Amor — Inspirando recuerdos</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-start bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-rose-50">
      <div className="mb-4 p-3 bg-amber-50 rounded-lg inline-flex items-center justify-center text-amber-600">{icon}</div>
      <h3 className="text-xl font-serif text-rose-900 mb-2">{title}</h3>
      <p className="text-rose-700/80 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
