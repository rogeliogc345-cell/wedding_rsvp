// src/app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Smartphone, Music2, PanelsRightBottom } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-[#FFF5F7] text-rose-950 min-h-screen selection:bg-rose-200 selection:text-rose-950">
      <p className="text-center text-sm uppercase bg-rose-900 text-rose-50 tracking-widest py-2">Pagina en construcción </p>
      {/* --- NAVIGATION --- */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">

        <div className="text-2xl font-serif tracking-tighter italic">XVBoda</div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-rose-700">
          <Link href="#features" className="hover:text-rose-950 transition">Características</Link>
          <Link href="#pricing" className="hover:text-rose-950 transition">Precios</Link>
        </div>
        {/* <Link href="/login">
          <Button variant="outline" className="rounded-full border-stone-300">Admin Login</Button>
        </Link> */}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-32 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-rose-400 mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          <span className="uppercase tracking-[0.3em] text-[10px]">Tu historia, nuestra pasión</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
          Invitaciones Digitales <br />
          <span className="italic text-rose-600 underline decoration-rose-200 underline-offset-8">Tan únicas como tu historia</span>
        </h1>
        <p className="text-lg text-rose-700/80 mb-10 max-w-xl leading-relaxed">
          Más que un simple link. Una experiencia interactiva con confirmación segura, galería de fotos, música y mucho más.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/">
            <Button className="bg-rose-800 text-white hover:bg-rose-900 px-8 py-6 rounded-full text-lg group shadow-lg shadow-rose-900/20">
              Empezar ahora <ArrowRight className="ml-2 group-hover:translate-x-1 transition" />
            </Button>
          </Link>
          <Button variant="ghost" className="px-8 py-6 rounded-full text-lg text-rose-500 hover:text-rose-700 hover:bg-rose-100/50">
            Ver Demo
          </Button>
        </div>
      </section>

      {/* --- FEATURE GRID --- */}
      <section id="features" className="bg-white py-24 border-y border-rose-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">

            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-rose-400" />}
              title="RSVP Seguro"
              description="Confirmaciones con códigos únicos para que nadie que no esté en la lista pueda acceder."
            />

            <FeatureCard
              icon={<Smartphone className="w-8 h-8 text-rose-400" />}
              title="Mobile First"
              description="Diseñado para lucir impecable en iPhone y Android. Tus invitados lo amarán."
            />

            <FeatureCard
              icon={<PanelsRightBottom className="w-8 h-8 text-rose-400" />}
              title="Galleria de fotos"
              description="Comparte tus mejores momentos con tus invitados."
            />

            <FeatureCard
              icon={<Music2 className="w-8 h-8 text-rose-400" />}
              title="Música"
              description="El soundtrack de su historia. Sorprende a tus invitados con tu canción especial sonando de fondo al abrir tu invitación."
            />







          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 text-center text-rose-400 border-t border-rose-100">
        <p className="font-serif italic text-xl text-rose-900 mb-4">XVBoda</p>
        <p className="text-xs uppercase tracking-widest">&copy; 2026 Creado con Amor para hermosos momentos</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="mb-2 p-4 bg-rose-50/80 rounded-2xl text-rose-600 shadow-sm border border-rose-100/50">{icon}</div>
      <h3 className="text-xl font-serif text-rose-900">{title}</h3>
      <p className="text-rose-700/80 text-sm leading-relaxed">{description}</p>
    </div>
  );
}