import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Settings,
  Scissors,
  Users,
  CheckCircle2,
  Clock,
  Trash2,
  Plus,
  ArrowLeft,
  MessageCircle,
  Save,
  RotateCcw,
  Star,
  Sparkles,
  Phone,
  MapPin,
} from 'lucide-react';
import {
  SalonAppointment,
  SalonService,
  SalonInfoState,
  INITIAL_SALON_INFO,
  INITIAL_SERVICES,
} from '../data/salonConfig';

interface AdminPortalProps {
  onClose: () => void;
  onLogout: () => void;
  salonInfo: SalonInfoState;
  onUpdateSalonInfo: (info: SalonInfoState) => void;
  services: SalonService[];
  onUpdateServices: (services: SalonService[]) => void;
  appointments: SalonAppointment[];
  onUpdateAppointments: (appointments: SalonAppointment[]) => void;
  adminUsername: string;
  adminPassword: string;
  onUpdateCredentials: (u: string, p: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  onClose,
  onLogout,
  salonInfo,
  onUpdateSalonInfo,
  services,
  onUpdateServices,
  appointments,
  onUpdateAppointments,
  adminUsername,
  adminPassword,
  onUpdateCredentials,
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'settings'>('appointments');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // New appointment form state
  const [showAddAptModal, setShowAddAptModal] = useState<boolean>(false);
  const [newApt, setNewApt] = useState({
    clientName: '',
    clientPhone: '',
    serviceName: services[0]?.name || 'Hairstyling',
    date: new Date().toISOString().split('T')[0],
    timeSlot: 'Afternoon (2 PM - 5 PM)',
    notes: '',
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<SalonInfoState>({ ...salonInfo });
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Security Credentials state
  const [newAdminUsername, setNewAdminUsername] = useState(adminUsername);
  const [newAdminPassword, setNewAdminPassword] = useState(adminPassword);
  const [credSuccess, setCredSuccess] = useState<string | null>(null);

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminUsername.trim() || !newAdminPassword.trim()) return;
    onUpdateCredentials(newAdminUsername.trim(), newAdminPassword.trim());
    setCredSuccess('Admin login credentials updated successfully!');
    setTimeout(() => setCredSuccess(null), 3000);
  };

  // New service form state
  const [showAddServiceModal, setShowAddServiceModal] = useState<boolean>(false);
  const [newService, setNewService] = useState<Partial<SalonService>>({
    name: '',
    category: 'Hair',
    description: '',
    duration: '45 - 60 min',
  });

  const handleStatusChange = (aptId: string, newStatus: SalonAppointment['status']) => {
    const updated = appointments.map((apt) =>
      apt.id === aptId ? { ...apt, status: newStatus } : apt
    );
    onUpdateAppointments(updated);
  };

  const handleDeleteAppointment = (aptId: string) => {
    if (window.confirm('Delete this appointment record?')) {
      onUpdateAppointments(appointments.filter((apt) => apt.id !== aptId));
    }
  };

  const handleClearAllAppointments = () => {
    if (appointments.length === 0) return;
    if (window.confirm('Are you sure you want to clear all appointment records?')) {
      onUpdateAppointments([]);
    }
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApt.clientName || !newApt.clientPhone) return;

    const created: SalonAppointment = {
      id: `apt-${Date.now()}`,
      clientName: newApt.clientName,
      clientPhone: newApt.clientPhone,
      serviceName: newApt.serviceName,
      date: newApt.date,
      timeSlot: newApt.timeSlot,
      notes: newApt.notes,
      status: 'Confirmed',
      createdAt: new Date().toLocaleString(),
    };

    onUpdateAppointments([created, ...appointments]);
    setShowAddAptModal(false);
    setNewApt({
      clientName: '',
      clientPhone: '',
      serviceName: services[0]?.name || 'Hairstyling',
      date: new Date().toISOString().split('T')[0],
      timeSlot: 'Afternoon (2 PM - 5 PM)',
      notes: '',
    });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSalonInfo(settingsForm);
    setSaveSuccess('Salon details updated successfully!');
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  const handleResetSettings = () => {
    if (window.confirm('Reset salon details to initial verified values?')) {
      setSettingsForm(INITIAL_SALON_INFO);
      onUpdateSalonInfo(INITIAL_SALON_INFO);
      onUpdateServices(INITIAL_SERVICES);
      setSaveSuccess('Reset to defaults.');
      setTimeout(() => setSaveSuccess(null), 3000);
    }
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name || !newService.description) return;

    const created: SalonService = {
      id: `serv-${Date.now()}`,
      name: newService.name,
      category: (newService.category as SalonService['category']) || 'Hair',
      description: newService.description,
      duration: newService.duration || '45 min',
    };

    onUpdateServices([...services, created]);
    setShowAddServiceModal(false);
    setNewService({
      name: '',
      category: 'Hair',
      description: '',
      duration: '45 - 60 min',
    });
  };

  const handleDeleteService = (serviceId: string) => {
    if (window.confirm('Delete this service from the salon menu?')) {
      onUpdateServices(services.filter((s) => s.id !== serviceId));
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesSearch =
      apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.clientPhone.includes(searchTerm) ||
      apt.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = appointments.filter((a) => a.status === 'Pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'Confirmed').length;

  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFFFF] flex flex-col font-primary">
      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#111111] border-b border-[rgba(201,162,39,0.3)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1614] border border-[rgba(201,162,39,0.3)] hover:border-[#C9A227] text-xs font-bold text-[#FFFFFF] hover:text-[#D8C27A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Live Website</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-primary text-lg sm:text-xl font-black text-metallic-gold uppercase">
              {salonInfo.name}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-[#C9A227] text-[#080808] px-2 py-0.5 rounded-sm">
              ADMIN PORTAL
            </span>
          </div>
        </div>

        {/* Status Indicators & Actions */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="hidden sm:flex items-center gap-2 text-[#D8C27A] mr-2">
            <Star className="w-4 h-4 fill-[#C9A227] text-[#C9A227]" />
            <span>4.1 ★ (77 Google Reviews)</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold tracking-wider uppercase border border-[rgba(201,162,39,0.35)] hover:border-[#C9A227] text-[#FFFFFF] hover:text-[#D8C27A] transition-colors"
          >
            Live Site
          </button>

          <button
            onClick={onLogout}
            className="px-4 py-2 text-xs font-black tracking-wider uppercase bg-red-950/80 hover:bg-red-900 border border-red-700 text-red-200 transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-[1280px] w-full mx-auto px-6 sm:px-8 py-8">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-[#111111] border border-[rgba(201,162,39,0.25)] rounded-lg">
            <span className="text-[11px] uppercase tracking-wider text-[#A6A6A6] font-bold block mb-1">
              TOTAL INQUIRIES
            </span>
            <div className="font-primary text-3xl font-black text-[#FFFFFF] tabular-nums">
              {appointments.length}
            </div>
          </div>

          <div className="p-5 bg-[#111111] border border-[rgba(201,162,39,0.25)] rounded-lg">
            <span className="text-[11px] uppercase tracking-wider text-[#A6A6A6] font-bold block mb-1">
              PENDING REVIEW
            </span>
            <div className="font-primary text-3xl font-black text-[#D8C27A] tabular-nums">
              {pendingCount}
            </div>
          </div>

          <div className="p-5 bg-[#111111] border border-[rgba(201,162,39,0.25)] rounded-lg">
            <span className="text-[11px] uppercase tracking-wider text-[#A6A6A6] font-bold block mb-1">
              CONFIRMED
            </span>
            <div className="font-primary text-3xl font-black text-emerald-400 tabular-nums">
              {confirmedCount}
            </div>
          </div>

          <div className="p-5 bg-[#111111] border border-[rgba(201,162,39,0.25)] rounded-lg">
            <span className="text-[11px] uppercase tracking-wider text-[#A6A6A6] font-bold block mb-1">
              ACTIVE SERVICES
            </span>
            <div className="font-primary text-3xl font-black text-[#FFFFFF] tabular-nums">
              {services.length}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[rgba(201,162,39,0.25)] mb-8 gap-2">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-3 text-xs font-black tracking-widest uppercase transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'appointments'
                ? 'border-[#C9A227] text-[#D8C27A] bg-[#111111]'
                : 'border-transparent text-[#A6A6A6] hover:text-[#FFFFFF]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Appointments & Inquiries ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-6 py-3 text-xs font-black tracking-widest uppercase transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'services'
                ? 'border-[#C9A227] text-[#D8C27A] bg-[#111111]'
                : 'border-transparent text-[#A6A6A6] hover:text-[#FFFFFF]'
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>Salon Services ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 text-xs font-black tracking-widest uppercase transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'settings'
                ? 'border-[#C9A227] text-[#D8C27A] bg-[#111111]'
                : 'border-transparent text-[#A6A6A6] hover:text-[#FFFFFF]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Salon Settings & Info</span>
          </button>
        </div>

        {/* TAB 1: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            {/* Filters Bar & Add Appointment Trigger */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase transition-colors rounded ${
                      statusFilter === st
                        ? 'bg-[#C9A227] text-[#080808]'
                        : 'bg-[#111111] text-[#A6A6A6] hover:text-[#FFFFFF] border border-[rgba(201,162,39,0.2)]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search client, phone, or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#111111] border border-[rgba(201,162,39,0.25)] px-4 py-2 text-xs text-[#FFFFFF] focus:border-[#C9A227] outline-none"
                />

                {appointments.length > 0 && (
                  <button
                    onClick={handleClearAllAppointments}
                    className="px-3 py-2 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap"
                    title="Clear all appointment records"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                )}

                <button
                  onClick={() => setShowAddAptModal(true)}
                  className="px-4 py-2 bg-[#C9A227] hover:bg-[#D8C27A] text-[#080808] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Appointment</span>
                </button>
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-[#111111] border border-[rgba(201,162,39,0.25)] rounded-lg overflow-x-auto shadow-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[rgba(201,162,39,0.2)] text-[10px] font-black uppercase tracking-wider text-[#D8C27A] bg-[#0A0A0A]">
                    <th className="p-4">Client Name</th>
                    <th className="p-4">Phone / WhatsApp</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Notes</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-[#A6A6A6]">
                        <div className="w-12 h-12 rounded-full border border-[rgba(201,162,39,0.25)] flex items-center justify-center mx-auto mb-3 text-[#D8C27A]">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <p className="font-bold text-[#FFFFFF] text-sm mb-1 uppercase tracking-wider">
                          No Appointment Records
                        </p>
                        <p className="text-xs max-w-sm mx-auto text-[#777777]">
                          Records are currently clear. Inquiries booked on the website or added manually will appear here in real time.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((apt) => {
                      const cleanPhone = apt.clientPhone.replace(/\D/g, '');
                      const clientWaUrl = `https://wa.me/92${cleanPhone.startsWith('0') ? cleanPhone.slice(1) : cleanPhone}?text=Hello%20${encodeURIComponent(apt.clientName)}%2C%20regarding%20your%20appointment%20for%20${encodeURIComponent(apt.serviceName)}%20at%20Khusboo%20Beauty%20Salon...`;

                      return (
                        <tr key={apt.id} className="hover:bg-[#161412] transition-colors">
                          <td className="p-4 font-bold text-[#FFFFFF] whitespace-nowrap">
                            {apt.clientName}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="text-[#A6A6A6] tabular-nums font-mono">{apt.clientPhone}</span>
                              <a
                                href={clientWaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-[#080808] transition-colors"
                                title="Open WhatsApp Chat with client"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                          <td className="p-4 text-[#D8C27A] font-bold whitespace-nowrap">
                            {apt.serviceName}
                          </td>
                          <td className="p-4 whitespace-nowrap text-[#FFFFFF]">
                            <div>{apt.date}</div>
                            <div className="text-[10px] text-[#A6A6A6]">{apt.timeSlot}</div>
                          </td>
                          <td className="p-4 text-[#A6A6A6] max-w-xs truncate">
                            {apt.notes || '—'}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <select
                              value={apt.status}
                              onChange={(e) =>
                                handleStatusChange(apt.id, e.target.value as SalonAppointment['status'])
                              }
                              className={`px-2.5 py-1 text-[11px] font-bold rounded uppercase outline-none border ${
                                apt.status === 'Confirmed'
                                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                                  : apt.status === 'Pending'
                                  ? 'bg-amber-950/60 text-amber-300 border-amber-700'
                                  : apt.status === 'Completed'
                                  ? 'bg-blue-950/60 text-blue-300 border-blue-700'
                                  : 'bg-red-950/60 text-red-300 border-red-700'
                              }`}
                            >
                              <option value="Pending" className="bg-[#111111] text-[#FFFFFF]">Pending</option>
                              <option value="Confirmed" className="bg-[#111111] text-[#FFFFFF]">Confirmed</option>
                              <option value="Completed" className="bg-[#111111] text-[#FFFFFF]">Completed</option>
                              <option value="Cancelled" className="bg-[#111111] text-[#FFFFFF]">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteAppointment(apt.id)}
                              className="p-1.5 text-[#A6A6A6] hover:text-red-400 transition-colors"
                              title="Delete appointment"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES MANAGER */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-primary text-xl font-black text-[#FFFFFF] uppercase">
                  MANAGE SALON SERVICES
                </h3>
                <p className="text-xs text-[#A6A6A6]">
                  All services reflect live on the website immediately.
                </p>
              </div>

              <button
                onClick={() => setShowAddServiceModal(true)}
                className="px-4 py-2 bg-[#C9A227] hover:bg-[#D8C27A] text-[#080808] text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((serv) => (
                <div
                  key={serv.id}
                  className="p-5 bg-[#111111] border border-[rgba(201,162,39,0.25)] rounded-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-widest bg-[#1A1614] text-[#C9A227] px-2 py-0.5 rounded border border-[#C9A227]/30">
                        {serv.category}
                      </span>
                      <span className="text-xs text-[#A6A6A6] font-mono">{serv.duration}</span>
                    </div>

                    <h4 className="font-primary text-lg font-black text-[#FFFFFF] uppercase mb-2">
                      {serv.name}
                    </h4>

                    <p className="text-xs text-[#A6A6A6] leading-relaxed mb-4">
                      {serv.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-end">
                    <button
                      onClick={() => handleDeleteService(serv.id)}
                      className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SALON SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-[#111111] border border-[rgba(201,162,39,0.3)] p-8 rounded-xl">
            <h3 className="font-primary text-xl font-black text-[#FFFFFF] uppercase mb-2">
              SALON BUSINESS SETTINGS
            </h3>
            <p className="text-xs text-[#A6A6A6] mb-6">
              Updates saved here automatically synchronize across the live client website.
            </p>

            {saveSuccess && (
              <div className="p-3 mb-6 bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-bold rounded flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{saveSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-5 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D8C27A] mb-1.5">
                  Business Name
                </label>
                <input
                  type="text"
                  value={settingsForm.name}
                  onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                  className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D8C27A] mb-1.5">
                  Phone / Reception Number
                </label>
                <input
                  type="text"
                  value={settingsForm.phone}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      phone: e.target.value,
                      phoneTel: `tel:${e.target.value.replace(/\s+/g, '')}`,
                    })
                  }
                  className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D8C27A] mb-1.5">
                  WhatsApp Number (with country code if needed)
                </label>
                <input
                  type="text"
                  value={settingsForm.whatsappNumber}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      whatsappNumber: e.target.value,
                      whatsappUrl: `https://wa.me/92${e.target.value.replace(/\D/g, '')}?text=Hello%20Khusboo%20Beauty%20Salon%2C%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment`,
                    })
                  }
                  className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D8C27A] mb-1.5">
                  Salon Full Address
                </label>
                <input
                  type="text"
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D8C27A] mb-1.5">
                  Business Hours Display
                </label>
                <input
                  type="text"
                  value={settingsForm.hoursDisplay}
                  onChange={(e) => setSettingsForm({ ...settingsForm, hoursDisplay: e.target.value })}
                  className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D8C27A] mb-1.5">
                  Announcement Notice (Banner)
                </label>
                <input
                  type="text"
                  value={settingsForm.announcementNotice}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, announcementNotice: e.target.value })
                  }
                  className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-3 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C9A227] hover:bg-[#D8C27A] text-[#080808] font-black uppercase tracking-wider text-xs flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetSettings}
                  className="px-4 py-3 border border-red-800 text-red-400 hover:bg-red-950 font-bold uppercase text-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Defaults</span>
                </button>
              </div>
            </form>

            {/* Administrator Password & Credentials Form */}
            <div className="mt-10 pt-8 border-t border-[rgba(201,162,39,0.25)]">
              <h4 className="font-primary text-base font-black text-[#D8C27A] uppercase mb-1">
                ADMIN ACCESS CREDENTIALS
              </h4>
              <p className="text-xs text-[#A6A6A6] mb-4">
                Update the authorized username and password used to access this Admin Portal.
              </p>

              {credSuccess && (
                <div className="p-3 mb-4 bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-bold rounded flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{credSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSaveCredentials} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D8C27A] mb-1">
                      Admin Username
                    </label>
                    <input
                      type="text"
                      required
                      value={newAdminUsername}
                      onChange={(e) => setNewAdminUsername(e.target.value)}
                      className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-2.5 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D8C27A] mb-1">
                      Admin Password
                    </label>
                    <input
                      type="text"
                      required
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-2.5 text-xs text-[#FFFFFF] outline-none focus:border-[#C9A227] font-mono text-[#D8C27A]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#C9A227] hover:bg-[#D8C27A] text-[#080808] font-bold uppercase text-xs tracking-wider"
                >
                  Update Credentials
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Add Appointment Modal */}
      {showAddAptModal && (
        <div className="fixed inset-0 z-50 bg-[#080808]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[rgba(201,162,39,0.4)] p-6 max-w-md w-full rounded-xl">
            <h4 className="font-primary text-lg font-black uppercase text-[#FFFFFF] mb-4">
              Add Manual Appointment
            </h4>

            <form onSubmit={handleAddAppointment} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#D8C27A] uppercase font-bold mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={newApt.clientName}
                  onChange={(e) => setNewApt({ ...newApt, clientName: e.target.value })}
                  className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-2.5 text-xs text-[#FFFFFF]"
                />
              </div>

              <div>
                <label className="block text-[#D8C27A] uppercase font-bold mb-1">Client Phone *</label>
                <input
                  type="text"
                  required
                  placeholder="0322 0000000"
                  value={newApt.clientPhone}
                  onChange={(e) => setNewApt({ ...newApt, clientPhone: e.target.value })}
                  className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-2.5 text-xs text-[#FFFFFF]"
                />
              </div>

              <div>
                <label className="block text-[#D8C27A] uppercase font-bold mb-1">Service</label>
                <select
                  value={newApt.serviceName}
                  onChange={(e) => setNewApt({ ...newApt, serviceName: e.target.value })}
                  className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-2.5 text-xs text-[#FFFFFF]"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.category}: {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#D8C27A] uppercase font-bold mb-1">Date</label>
                  <input
                    type="date"
                    value={newApt.date}
                    onChange={(e) => setNewApt({ ...newApt, date: e.target.value })}
                    className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-2.5 text-xs text-[#FFFFFF]"
                  />
                </div>
                <div>
                  <label className="block text-[#D8C27A] uppercase font-bold mb-1">Time Slot</label>
                  <select
                    value={newApt.timeSlot}
                    onChange={(e) => setNewApt({ ...newApt, timeSlot: e.target.value })}
                    className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-2.5 text-xs text-[#FFFFFF]"
                  >
                    <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                    <option value="Afternoon (2 PM - 5 PM)">Afternoon (2 PM - 5 PM)</option>
                    <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#D8C27A] uppercase font-bold mb-1">Notes</label>
                <input
                  type="text"
                  placeholder="Special requests or instructions"
                  value={newApt.notes}
                  onChange={(e) => setNewApt({ ...newApt, notes: e.target.value })}
                  className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-2.5 text-xs text-[#FFFFFF]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddAptModal(false)}
                  className="px-4 py-2 border border-white/20 text-xs text-[#FFFFFF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C9A227] text-[#080808] font-bold text-xs uppercase"
                >
                  Add Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 bg-[#080808]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[rgba(201,162,39,0.4)] p-6 max-w-md w-full rounded-xl">
            <h4 className="font-primary text-lg font-black uppercase text-[#FFFFFF] mb-4">
              Add New Service
            </h4>

            <form onSubmit={handleAddService} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#D8C27A] uppercase font-bold mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bridal Glow Facial"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-2.5 text-xs text-[#FFFFFF]"
                />
              </div>

              <div>
                <label className="block text-[#D8C27A] uppercase font-bold mb-1">Category</label>
                <select
                  value={newService.category}
                  onChange={(e) =>
                    setNewService({ ...newService, category: e.target.value as SalonService['category'] })
                  }
                  className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-2.5 text-xs text-[#FFFFFF]"
                >
                  <option value="Hair">Hair</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Nails">Nails</option>
                  <option value="Waxing">Waxing</option>
                </select>
              </div>

              <div>
                <label className="block text-[#D8C27A] uppercase font-bold mb-1">Estimated Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 45 - 60 min"
                  value={newService.duration}
                  onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                  className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-2.5 text-xs text-[#FFFFFF]"
                />
              </div>

              <div>
                <label className="block text-[#D8C27A] uppercase font-bold mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Service description and benefits..."
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full bg-[#080808] border border-[rgba(201,162,39,0.3)] p-2.5 text-xs text-[#FFFFFF] resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2 border border-white/20 text-xs text-[#FFFFFF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C9A227] text-[#080808] font-bold text-xs uppercase"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
