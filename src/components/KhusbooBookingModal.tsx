import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, Clock, MapPin, Check, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { SalonInfoState, SalonService, SalonAppointment } from '../data/salonConfig';

interface KhusbooBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  salonInfo: SalonInfoState;
  services: SalonService[];
  preselectedService?: string;
  onNewBookingCreated: (appointment: SalonAppointment) => void;
}

export const KhusbooBookingModal: React.FC<KhusbooBookingModalProps> = ({
  isOpen,
  onClose,
  salonInfo,
  services,
  preselectedService = '',
  onNewBookingCreated,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [serviceName, setServiceName] = useState(preselectedService || services[0]?.name || 'Hairstyling');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('Afternoon (2 PM - 5 PM)');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (preselectedService) {
      setServiceName(preselectedService);
    }
  }, [preselectedService]);

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

  const resetForm = () => {
    setSubmitted(false);
    setClientName('');
    setClientPhone('');
    setNotes('');
    onClose();
  };

  const whatsappInquiryUrl = `${salonInfo.whatsappUrl}%0A*Appointment%20Booking%20Request*%0AName:%20${encodeURIComponent(clientName)}%0APhone:%20${encodeURIComponent(clientPhone)}%0AService:%20${encodeURIComponent(serviceName)}%0ADate:%20${encodeURIComponent(date)}%0ATime:%20${encodeURIComponent(timeSlot)}%0ANotes:%20${encodeURIComponent(notes || 'None')}`;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#080808]/90 backdrop-blur-md"
        onClick={resetForm}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg bg-[#111111] border border-[rgba(201,162,39,0.35)] shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-6 sm:p-8 text-[#FFFFFF] my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={resetForm}
            className="absolute top-5 right-5 p-1 text-[#A6A6A6] hover:text-[#FFFFFF]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-[#C9A227]/20 border border-[#C9A227] flex items-center justify-center mx-auto text-[#D8C27A]">
                <Check className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A227] block mb-1">
                  REQUEST LOGGED
                </span>
                <h3 className="font-primary text-2xl font-black uppercase text-[#FFFFFF]">
                  APPOINTMENT SUBMITTED
                </h3>
                <p className="text-xs text-[#A6A6A6] mt-2 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#FFFFFF]">{clientName}</strong>. Your request for{' '}
                  <strong className="text-[#D8C27A]">{serviceName}</strong> has been forwarded to our salon reception in Satellite Town, Gujranwala.
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 text-xs font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation via WhatsApp</span>
                </a>

                <a
                  href={salonInfo.phoneTel}
                  className="w-full py-3.5 px-4 text-xs font-bold tracking-[0.2em] uppercase border border-[rgba(201,162,39,0.35)] hover:border-[#C9A227] text-[#FFFFFF] hover:text-[#D8C27A] flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#C9A227]" />
                  <span>Call Salon ({salonInfo.phone})</span>
                </a>
              </div>

              <button
                onClick={resetForm}
                className="text-xs text-[#A6A6A6] hover:text-[#FFFFFF] uppercase tracking-wider pt-2 block mx-auto"
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              {/* Modal Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#C9A227]" />
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D8C27A]">
                    RESERVE YOUR VISIT
                  </span>
                </div>
                <h3 className="font-primary text-2xl font-black uppercase text-[#FFFFFF]">
                  BOOK AN <span className="text-metallic-gold">APPOINTMENT</span>
                </h3>
                <p className="text-xs text-[#A6A6A6] mt-1">
                  Choose your service. Our reception will confirm your slot promptly.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Desired Service */}
                <div>
                  <label className="block uppercase font-bold tracking-wider text-[10px] text-[#D8C27A] mb-1.5">
                    Select Desired Service *
                  </label>
                  <select
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227]"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.name} className="bg-[#111111] text-[#FFFFFF]">
                        {s.category}: {s.name} ({s.duration})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block uppercase font-bold tracking-wider text-[10px] text-[#D8C27A] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Khan"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227] placeholder:text-[#555555]"
                  />
                </div>

                {/* Phone */}
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
                    className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227] placeholder:text-[#555555]"
                  />
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase font-bold tracking-wider text-[10px] text-[#D8C27A] mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-bold tracking-wider text-[10px] text-[#D8C27A] mb-1.5">
                      Preferred Time Slot
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227]"
                    >
                      <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                      <option value="Afternoon (2 PM - 5 PM)">Afternoon (2 PM - 5 PM)</option>
                      <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block uppercase font-bold tracking-wider text-[10px] text-[#D8C27A] mb-1.5">
                    Special Requests (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bridal consultation, sensitive skin, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227] placeholder:text-[#555555]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-3 space-y-3">
                  <button
                    type="submit"
                    className="w-full py-4 text-xs font-black tracking-[0.22em] uppercase bg-[#C9A227] hover:bg-[#D8C27A] text-[#080808] transition-all duration-300 shadow-[0_0_20px_rgba(201,162,39,0.35)] flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Submit Appointment Request</span>
                  </button>

                  <p className="text-[10px] text-[#A6A6A6] text-center">
                    {salonInfo.shortAddress} · Call reception anytime at {salonInfo.phone}
                  </p>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
