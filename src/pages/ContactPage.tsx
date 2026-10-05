import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  MessageCircle,
  Calendar,
  Send,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { SalonInfoState, SalonService, SalonAppointment } from '../data/salonConfig';
import { PageHeaderBanner } from '../components/PageHeaderBanner';

interface ContactPageProps {
  salonInfo: SalonInfoState;
  services: SalonService[];
  onNewBookingCreated: (appointment: SalonAppointment) => void;
  onNavigateHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  salonInfo,
  services,
  onNewBookingCreated,
  onNavigateHome,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [serviceName, setServiceName] = useState(services[0]?.name || 'Hairstyling');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('Afternoon (2 PM - 5 PM)');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    const newApt: SalonAppointment = {
      id: `apt-${Date.now()}`,
      clientName,
      clientPhone,
      serviceName,
      date,
      timeSlot,
      notes,
      status: 'Pending',
      createdAt: new Date().toLocaleString(),
    };

    onNewBookingCreated(newApt);
    setSubmitted(true);
  };

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salonInfo.address)}`;

  const contactWhatsAppUrl = `https://wa.me/923226516291?text=${encodeURIComponent(
    'Hello Khusboo Beauty Salon,\n\nI would like to inquire about booking an appointment at your salon located in 102/A, Block A, Satellite Town, Gujranwala.\n\nCould you please share your availability?\n\nThank you!'
  )}`;

  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFFFF] font-primary">
      <PageHeaderBanner
        badge="SALON LOCATION"
        title="VISIT & CONTACT US"
        subtitle="Conveniently situated in Satellite Town, Gujranwala. Call or message us on WhatsApp for appointments."
        onNavigateHome={onNavigateHome}
      />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#C9A227]">
                GUJRANWALA SALON
              </span>
              <h2 className="font-primary text-3xl sm:text-5xl font-black uppercase text-[#FFFFFF] mt-2 mb-4">
                FIND OUR <span className="text-metallic-gold">SANCTUARY</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#A6A6A6] leading-relaxed">
                We welcome walk-ins and reserved consultations. For the most tailored experience, we recommend reserving your preferred slot in advance.
              </p>
            </div>

            {/* Address */}
            <div className="p-6 rounded-xl bg-[#111111] border border-[rgba(201,162,39,0.3)] flex items-start gap-4">
              <div className="w-12 h-12 bg-[#080808] border border-[#C9A227]/40 rounded-lg flex items-center justify-center text-[#C9A227] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-[#D8C27A] mb-1">
                  Salon Address
                </h3>
                <p className="text-base text-[#FFFFFF] font-bold">
                  {salonInfo.address}
                </p>
                <p className="text-xs text-[#A6A6A6] mt-0.5">
                  Block A, Satellite Town, Gujranwala, Punjab
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="p-6 rounded-xl bg-[#111111] border border-[rgba(201,162,39,0.3)] flex items-start gap-4">
              <div className="w-12 h-12 bg-[#080808] border border-[#C9A227]/40 rounded-lg flex items-center justify-center text-[#C9A227] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-[#D8C27A] mb-1">
                  Reception Telephone
                </h3>
                <a
                  href={salonInfo.phoneTel}
                  className="text-2xl text-[#FFFFFF] font-black hover:text-[#D8C27A] transition-colors tabular-nums block"
                >
                  {salonInfo.phone}
                </a>
                <p className="text-xs text-[#A6A6A6] mt-0.5">
                  Direct telephone line for reservations and inquiries
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="p-6 rounded-xl bg-[#111111] border border-[rgba(201,162,39,0.3)] flex items-start gap-4">
              <div className="w-12 h-12 bg-[#080808] border border-[#C9A227]/40 rounded-lg flex items-center justify-center text-[#C9A227] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                    {salonInfo.statusText}
                  </span>
                </div>
                <p className="text-base text-[#FFFFFF] font-bold">
                  {salonInfo.hoursDisplay}
                </p>
                <p className="text-xs text-[#A6A6A6] mt-0.5">
                  Monday to Sunday continuous service
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#C9A227] hover:bg-[#D8C27A] text-[#080808] text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href={contactWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-emerald-950/70 border border-emerald-600/50 hover:bg-emerald-900 text-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:col-span-6 bg-[#111111] border border-[rgba(201,162,39,0.35)] p-8 sm:p-10 rounded-2xl shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#C9A227]/20 border border-[#C9A227] flex items-center justify-center mx-auto text-[#D8C27A]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-primary text-2xl font-black uppercase text-[#FFFFFF]">
                  INQUIRY SUBMITTED
                </h3>
                <p className="text-xs text-[#A6A6A6] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#FFFFFF]">{clientName}</strong>. Your inquiry has been sent to our front desk.
                </p>

                <div className="pt-4 space-y-3">
                  <a
                    href={`https://wa.me/923226516291?text=${encodeURIComponent(
                      `Hello Khusboo Beauty Salon, I have submitted an appointment inquiry for ${serviceName} on ${date}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm via WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#A6A6A6] hover:text-[#FFFFFF] underline uppercase tracking-wider block mx-auto"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-primary text-2xl font-black uppercase text-[#FFFFFF] mb-2">
                  REQUEST AN <span className="text-metallic-gold">APPOINTMENT</span>
                </h3>
                <p className="text-xs text-[#A6A6A6] mb-6">
                  Fill in your details below and our reception will schedule your slot.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block uppercase font-bold tracking-wider text-[10px] text-[#D8C27A] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima Ali"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227] rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-bold tracking-wider text-[10px] text-[#D8C27A] mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0322 0000000"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227] rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-bold tracking-wider text-[10px] text-[#D8C27A] mb-1.5">
                      Service Interested In *
                    </label>
                    <select
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227] rounded-sm"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.name} className="bg-[#111111] text-[#FFFFFF]">
                          {s.category}: {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase font-bold tracking-wider text-[10px] text-[#D8C27A] mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227] rounded-sm"
                      />
                    </div>

                    <div>
                      <label className="block uppercase font-bold tracking-wider text-[10px] text-[#D8C27A] mb-1.5">
                        Preferred Time Slot
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227] rounded-sm"
                      >
                        <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                        <option value="Afternoon (2 PM - 5 PM)">Afternoon (2 PM - 5 PM)</option>
                        <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase font-bold tracking-wider text-[10px] text-[#D8C27A] mb-1.5">
                      Notes or Special Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share any special preferences, bridal date, or questions..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227] rounded-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#C9A227] hover:bg-[#D8C27A] text-[#080808] text-xs font-black uppercase tracking-[0.2em] shadow-lg transition-all rounded-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Booking Request</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Embedded Interactive Map */}
        <div className="relative aspect-[16/8] sm:aspect-[16/7] border border-[rgba(201,162,39,0.35)] shadow-2xl rounded-xl overflow-hidden">
          <iframe
            title="Khusboo Beauty Salon Map"
            src="https://maps.google.com/maps?q=102%2FA%2C+Block+A%2C+Satellite+Town%2C+Gujranwala&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-125 brightness-90"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="absolute top-4 left-4 bg-[#080808]/95 backdrop-blur-md p-4 border border-[rgba(201,162,39,0.35)] text-xs max-w-xs shadow-lg pointer-events-none rounded">
            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-4 h-4 text-[#C9A227]" />
              <span className="font-primary text-sm font-black text-metallic-gold">
                {salonInfo.name}
              </span>
            </div>
            <p className="text-[11px] text-[#A6A6A6]">
              {salonInfo.shortAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
