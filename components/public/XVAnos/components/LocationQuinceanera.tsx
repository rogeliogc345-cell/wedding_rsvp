"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Calendar,
  Church,
  Music,
  Car,
  Info,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Constants
const ANIMATION_CONFIG = {
  staggerDelay: 0.1,
  initialDelay: 0.2,
};

// Types
type EventLocation = {
  id: string;
  type: "ceremony" | "reception";
  name: string;
  venue: string;
  address: string;
  time: string;
  date: string;
  googleMapsUrl: string;
  embedUrl?: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  details: {
    parking?: string;
    dressCode?: string;
    notes?: string[];
  };
};

// Location Card Component
function LocationCard({ 
  location, 
  index, 
  onShowDetails 
}: { 
  location: EventLocation; 
  index: number;
  onShowDetails: (location: EventLocation) => void;
}) {
  const openDirections = useCallback(() => {
    window.open(location.googleMapsUrl, "_blank");
  }, [location.googleMapsUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * ANIMATION_CONFIG.staggerDelay }}
      className="group relative"
    >
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-rose-100 overflow-hidden">
        {/* Card Header */}
        <div className={cn(
          "p-8 bg-gradient-to-br relative overflow-hidden",
          location.color
        )}>
          {/* Subtle decorative circles */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full" />
          
          <div className="relative z-10 text-black">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center">
                {location.icon}
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end text-xs mb-2 font-light">
                  <Calendar className="w-4 h-4" />
                  <span>{location.date}</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <Clock className="w-4 h-4" />
                  <span className="text-2xl font-light">{location.time}</span>
                </div>
              </div>
            </div>
            
            <h3 className="font-light text-2xl  text-black mb-1">{location.name}</h3>
            <p className=" font-light text-base text-black mb-2">{location.venue}</p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-8">
          {/* Address */}
          <div className="flex items-start gap-3 mb-6">
            <MapPin className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-600 leading-relaxed text-sm font-light">{location.address}</p>
          </div>

          {/* Map Preview */}
          {location.embedUrl && (
            <div className="mb-6 rounded-lg overflow-hidden shadow-sm h-40 bg-gray-100">
              <iframe
                src={location.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}

          {/* Quick Info Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {location.details.parking && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 text-rose-700 rounded-full text-xs font-light">
                <Car className="w-3.5 h-3.5" />
                <span>Estacionamiento</span>
              </div>
            )}
            {location.details.dressCode && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-pink-50 text-pink-700 rounded-full text-xs font-light">
                <Info className="w-3.5 h-3.5" />
                <span>{location.details.dressCode}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {/* <Button
              onClick={openDirections}
              className={cn(
                "w-full bg-gradient-to-r text-white shadow-sm hover:shadow-md transition-all duration-300 font-light",
                location.color
              )}
              size="sm"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Cómo llegar
            </Button>
            
            <Button
              onClick={() => onShowDetails(location)}
              variant="outline"
              className="w-full border border-gray-200 hover:border-rose-200 hover:bg-rose-50 transition-all duration-300 font-light"
              size="sm"
            >
              <Info className="w-4 h-4 mr-2" />
              Detalles
            </Button> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Details Modal Component
function LocationDetailsModal({ 
  location, 
  open, 
  onOpenChange 
}: { 
  location: EventLocation | null; 
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const openDirections = useCallback(() => {
    if (location) {
      window.open(location.googleMapsUrl, "_blank");
    }
  }, [location]);

  if (!location) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br",
            location.color,
            "text-white"
          )}>
            {location.icon}
          </div>
          <DialogTitle className="text-2xl font-light">
            {location.name}
          </DialogTitle>
          <DialogDescription className="font-light">
            {location.venue}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-6">
          {/* Time */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Horario</p>
              <p className="font-medium text-gray-900 text-sm">{location.time}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Dirección</p>
              <p className="text-sm text-gray-600 font-light">{location.address}</p>
            </div>
          </div>

          {/* Parking */}
          {location.details.parking && (
            <div className="flex items-start gap-3 p-4 bg-rose-50 rounded-lg border border-rose-100">
              <Car className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-rose-700 uppercase tracking-wide font-medium mb-1">
                  Estacionamiento
                </p>
                <p className="text-sm text-rose-900 font-light">
                  {location.details.parking}
                </p>
              </div>
            </div>
          )}

          {/* Notes */}
          {location.details.notes && location.details.notes.length > 0 && (
            <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
              <p className="text-xs text-pink-700 uppercase tracking-wide font-medium mb-3">
                Información adicional
              </p>
              <ul className="space-y-2">
                {location.details.notes.map((note, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-pink-900 font-light">
                    <span className="text-pink-400 mt-0.5 flex-shrink-0">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Directions Button */}
          <Button
            onClick={openDirections}
            className={cn(
              "w-full bg-gradient-to-r text-white shadow-sm hover:shadow-md transition-all duration-300 font-light",
              location.color
            )}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Abrir en Google Maps
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Main Component
export function EventLocations() {
  const [selectedLocation, setSelectedLocation] = useState<EventLocation | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const locations: EventLocation[] = useMemo(() => [
    {
      id: "ceremony",
      type: "ceremony",
      name: "Ceremonia Religiosa",
      venue: "Parroquia de San Miguel Arcángel",
      address: "Av. Constitución 123, Centro Histórico, Ciudad de México, 06000",
      time: "4:00 PM",
      date: "Sábado, 12 de Septiembre 2026",
      googleMapsUrl: "https://maps.google.com/?q=19.4326,-99.1332",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.9234!2d-99.1332!3d19.4326",
      icon: <Church className="w-6 h-6" />,
      color: "bg-pink-100",
      gradient: "bg-gradient-to-br from-rose-50 to-pink-50",
      details: {
        parking: "Estacionamiento disponible en la parte trasera de la iglesia",
        dressCode: "Formal",
        notes: [
          "Por favor llegar 15 minutos antes",
          "La ceremonia tiene una duración aproximada de 45 minutos",
          "Se recomienda silenciar dispositivos móviles"
        ]
      }
    },
    {
      id: "reception",
      type: "reception",
      name: "Recepción",
      venue: "Jardín Hacienda Los Laureles",
      address: "Km 28.5 Carretera México-Cuernavaca, Tlalpan, 14380",
      time: "7:00 PM",
      date: "Sábado, 12 de Septiembre 2026",
      googleMapsUrl: "https://maps.google.com/?q=19.2845,-99.1621",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.1234!2d-99.1621!3d19.2845",
      icon: <Music className="w-6 h-6" />,
      color: "bg-pink-100",
      gradient: "bg-gradient-to-br from-rose-50 to-pink-50",
      details: {
        parking: "Valet parking gratuito disponible",
        dressCode: "Formal / Cocktail",
        notes: [
          "Cena y barra libre incluidas",
          "Pista de baile al aire libre",
          "Servicio de taxi disponible al finalizar el evento"
        ]
      }
    }
  ], []);

  const handleShowDetails = useCallback((location: EventLocation) => {
    setSelectedLocation(location);
    setShowDetails(true);
  }, []);

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white py-24 px-6 overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-100/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-100/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="font-light text-5xl md:text-6xl lg:text-6xl text-gray-900 mb-6 tracking-wide">
              ¿Dónde y cuándo?
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-8" />
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Acompáñanos en estos momentos especiales
            </p>
          </motion.div>

          {/* Location Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {locations.map((location, index) => (
              <LocationCard
                key={location.id}
                location={location}
                index={index}
                onShowDetails={handleShowDetails}
              />
            ))}
          </div>

          {/* Important Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-lg p-6 shadow-sm border border-rose-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Nota importante</h4>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">
                    Estaremos iniciando puntualmente ambas eventos.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Details Modal */}
      <LocationDetailsModal
        location={selectedLocation}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </>
  );
}