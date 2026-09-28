import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { SRI_LANKAN_ROUTES, VEHICLE_OPTIONS } from '../data/routesData';
import { saveBooking } from '../services/bookingService';
import type { Booking, BookingFormData } from '../types';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  User,
  Mail,
  Phone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Printer,
  MessageSquare,
  FileText,
  AlertCircle
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const routeParam = searchParams.get('routeId');
  const initialRouteId = routeParam ? parseInt(routeParam, 10) : 1;

  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState<BookingFormData>({
    routeId: initialRouteId,
    travelDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    travelTime: '09:00',
    passengers: 2,
    vehicleType: VEHICLE_OPTIONS[0].name,
    fullName: '',
    email: '',
    phone: '',
    pickupLocation: '',
    specialRequests: ''
  });

  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepError, setStepError] = useState<string>('');

  useEffect(() => {
    if (routeParam) {
      const parsed = parseInt(routeParam, 10);
      if (!isNaN(parsed)) {
        setFormData((prev) => ({ ...prev, routeId: parsed }));
      }
    }
  }, [routeParam]);

  const selectedRoute =
    SRI_LANKAN_ROUTES.find((r) => r.id === formData.routeId) || SRI_LANKAN_ROUTES[0];

  const selectedVehicle =
    VEHICLE_OPTIONS.find((v) => v.name === formData.vehicleType) || VEHICLE_OPTIONS[0];

  const calculatedPriceUSD = Math.round(selectedRoute.priceUSD * selectedVehicle.priceMultiplier);
  const calculatedPriceLKR = Math.round(selectedRoute.priceLKR * selectedVehicle.priceMultiplier);

  const getMaxPassengersForVehicle = (vehicleName: string): number => {
    const lower = vehicleName.toLowerCase();
    if (lower.includes('sedan')) return 3;
    if (lower.includes('suv')) return 4;
    if (lower.includes('van')) return 7;
    return 7;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStepError('');
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'passengers' || name === 'routeId' ? Number(value) : value
    }));
  };

  // Pure validation check for Step 2
  const getStep2ValidationError = (): string | null => {
    if (!formData.travelDate) {
      return 'Please select a travel date.';
    }

    if (!formData.travelTime) {
      return 'Please select a preferred pickup time.';
    }

    // Check Date & Time Validations
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    const currentHours = String(now.getHours()).padStart(2, '0');
    const currentMinutes = String(now.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${currentHours}:${currentMinutes}`;

    if (formData.travelDate < todayStr) {
      return 'Travel date cannot be in the past. Please select today or a future date.';
    }

    if (formData.travelDate === todayStr && formData.travelTime < currentTimeStr) {
      return `Invalid Pickup Time: Selected pickup time (${formData.travelTime}) has already passed for today (${currentTimeStr}). Please select a future time.`;
    }

    // Check Passenger Capacity Validation
    if (formData.passengers < 1) {
      return 'Passenger count must be at least 1.';
    }

    const maxPax = getMaxPassengersForVehicle(formData.vehicleType);
    if (formData.passengers > maxPax) {
      return `Passenger Limit Exceeded: The selected vehicle (${selectedVehicle.name}) accommodates a maximum of ${maxPax} passengers. You entered ${formData.passengers} passengers. Please select a larger vehicle or adjust the passenger count.`;
    }

    return null;
  };

  // Pure boolean check for Step 3
  const isStep3Valid = (): boolean => {
    return (
      formData.fullName.trim().length >= 2 &&
      formData.email.includes('@') &&
      formData.phone.trim().length >= 6 &&
      formData.pickupLocation.trim().length >= 3
    );
  };

  const handleNextStep = () => {
    setStepError('');

    if (step === 1) {
      if (!formData.routeId) {
        setStepError('Please select a valid journey route.');
        return;
      }
      setStep(2);
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    if (step === 2) {
      const err = getStep2ValidationError();
      if (err) {
        setStepError(err);
        return;
      }
      setStep(3);
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    if (step === 3) {
      if (!isStep3Valid()) {
        setStepError('Please fill in all required customer details correctly.');
        return;
      }
      setStep(4);
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }
  };

  const handlePrevStep = () => {
    setStepError('');
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep3Valid()) return;

    setIsSubmitting(true);

    try {
      const bookingResult = await saveBooking(formData);
      setConfirmedBooking(bookingResult);

      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log('Confetti failed silently');
      }
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };


  const generateWhatsAppMessage = () => {
    if (!confirmedBooking) return '';
    const text = `*New Leela Travels Booking Request* 🚕%0A%0A*Booking ID:* ${confirmedBooking.id}%0A*Route:* ${confirmedBooking.routeName}%0A*Date & Time:* ${confirmedBooking.travelDate} at ${confirmedBooking.travelTime}%0A*Passengers:* ${confirmedBooking.passengers} Pax%0A*Vehicle:* ${confirmedBooking.vehicleType}%0A*Name:* ${confirmedBooking.fullName}%0A*Phone:* ${confirmedBooking.phone}%0A*Pickup:* ${confirmedBooking.pickupLocation}%0A*Total Price:* $${confirmedBooking.totalPriceUSD} (~LKR ${confirmedBooking.totalPriceLKR.toLocaleString()})%0A*Status:* ${confirmedBooking.status}`;
    return `https://wa.me/94771234567?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs font-bold text-[#C5A059] uppercase tracking-widest">
            Streamlined 4-Step Reservation
          </span>
          <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#123C35]">
            Book Your Private Sri Lanka Transfer
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-light">
            No instant payment required for initial MVP booking • Pay upon trip confirmation.
          </p>
        </div>

        {/* STEP PROGRESS BAR */}
        {!confirmedBooking && (
          <div className="bg-white p-4 rounded-2xl border border-[#E8D8B8]/40 shadow-sm mb-8">
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-medium">
              {[
                { num: 1, label: '1. Journey' },
                { num: 2, label: '2. Schedule' },
                { num: 3, label: '3. Customer' },
                { num: 4, label: '4. Summary' }
              ].map((s) => (
                <div
                  key={s.num}
                  className={`py-2 px-1 rounded-xl transition-all ${
                    step === s.num
                      ? 'bg-[#123C35] text-[#E8D8B8] font-bold shadow-md'
                      : step > s.num
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-[#FAF8F2] text-gray-400'
                  }`}
                >
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONFIRMED BOOKING SCREEN */}
        {confirmedBooking ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8D8B8] shadow-2xl space-y-8 animate-fade-in">
            <div className="text-center space-y-3 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#123C35]">
                Booking Received!
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-[#123C35]">{confirmedBooking.fullName}</span>. Your reservation request has been logged successfully with Leela Travels.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span>Status: {confirmedBooking.status} Confirmation</span>
              </div>
            </div>

            <div className="bg-[#FAF8F2] p-6 rounded-2xl border border-[#E8D8B8]/50 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8D8B8]/30">
                <span className="text-xs text-gray-500 font-mono">Reference Code:</span>
                <span className="font-mono font-bold text-lg text-[#123C35]">
                  {confirmedBooking.id}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-500 block">Selected Route:</span>
                  <span className="font-semibold text-[#123C35] text-sm">
                    {confirmedBooking.routeName}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Date & Pickup Time:</span>
                  <span className="font-semibold text-[#123C35]">
                    {confirmedBooking.travelDate} at {confirmedBooking.travelTime}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Passengers & Vehicle:</span>
                  <span className="font-semibold text-[#123C35]">
                    {confirmedBooking.passengers} Passengers • {confirmedBooking.vehicleType}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Pickup Address:</span>
                  <span className="font-semibold text-[#123C35]">
                    {confirmedBooking.pickupLocation}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8D8B8]/30 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-600">Total Price Estimate:</span>
                <div className="text-right">
                  <span className="font-serif-title font-bold text-2xl text-[#123C35]">
                    ${confirmedBooking.totalPriceUSD}
                  </span>
                  <span className="text-xs text-gray-500 block font-mono">
                    (~ LKR {confirmedBooking.totalPriceLKR.toLocaleString()})
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#123C35]/5 p-4 rounded-xl border border-[#123C35]/10 text-xs text-gray-700 space-y-1">
              <span className="font-semibold text-[#123C35] block">What happens next?</span>
              <p>
                Our operations manager will review your route schedule and contact you via WhatsApp/Email within 15 minutes to confirm driver details and pickup timing.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Send Booking to WhatsApp Chauffeur</span>
              </a>

              <button
                onClick={() => window.print()}
                className="px-5 py-3.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium text-xs flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  setStep(1);
                  navigate('/routes');
                }}
                className="px-5 py-3.5 rounded-xl bg-[#123C35] text-[#E8D8B8] font-bold text-xs hover:bg-[#1D544B]"
              >
                Book Another Route
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8D8B8]/40 shadow-xl">
            <form onSubmit={handleSubmitBooking}>
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-2 text-[#123C35] border-b border-gray-100 pb-3">
                    <MapPin className="w-5 h-5 text-[#C5A059]" />
                    <h2 className="font-serif-title text-xl font-bold">
                      Step 1: Select Journey Route
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-xs font-semibold text-gray-700">
                      Choose From 10 Sri Lankan Routes:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SRI_LANKAN_ROUTES.map((r) => (
                        <div
                          key={r.id}
                          onClick={() => setFormData((prev) => ({ ...prev, routeId: r.id }))}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                            formData.routeId === r.id
                              ? 'border-[#123C35] bg-[#123C35]/5 shadow-sm'
                              : 'border-gray-200 hover:border-[#123C35]/40 bg-[#FAF8F2]/50'
                          }`}
                        >
                          <div className="space-y-1">
                            <span className="font-serif-title font-bold text-sm text-[#123C35] block">
                              {r.name}
                            </span>
                            <span className="text-[11px] text-gray-500 block font-mono">
                              {r.duration} • {r.distance}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-sm text-[#123C35] block">
                              ${r.priceUSD}
                            </span>
                            <span className="text-[10px] text-gray-400 block font-mono">
                              LKR {r.priceLKR.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#FAF8F2] p-4 rounded-2xl border border-[#E8D8B8]/40 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-gray-500 block">Selected Route:</span>
                      <span className="font-serif-title font-bold text-[#123C35] text-base">
                        {selectedRoute.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500 block">Base Price:</span>
                      <span className="font-bold text-[#123C35] text-base">
                        ${selectedRoute.priceUSD}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-[#123C35] hover:bg-[#1D544B] text-[#E8D8B8] font-bold text-sm px-6 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all"
                    >
                      <span>Continue to Schedule</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-2 text-[#123C35] border-b border-gray-100 pb-3">
                    <Calendar className="w-5 h-5 text-[#C5A059]" />
                    <h2 className="font-serif-title text-xl font-bold">
                      Step 2: Schedule & Vehicle Choice
                    </h2>
                  </div>

                  {stepError && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-4 rounded-xl flex items-start gap-3 animate-fade-in shadow-sm">
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="font-bold block text-rose-900">Validation Notice</span>
                        <span className="leading-relaxed block">{stepError}</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Travel Date *
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="date"
                          name="travelDate"
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.travelDate}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#FAF8F2] border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#123C35] focus:outline-none focus:ring-2 focus:ring-[#123C35]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Preferred Pickup Time *
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="time"
                          name="travelTime"
                          value={formData.travelTime}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#FAF8F2] border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#123C35] focus:outline-none focus:ring-2 focus:ring-[#123C35]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Passengers Count *
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="number"
                          name="passengers"
                          min="1"
                          max="12"
                          value={formData.passengers}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#FAF8F2] border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#123C35] focus:outline-none focus:ring-2 focus:ring-[#123C35]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="block text-xs font-semibold text-gray-700">
                      Select Vehicle Category:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {VEHICLE_OPTIONS.map((v) => {
                        const price = Math.round(selectedRoute.priceUSD * v.priceMultiplier);
                        return (
                          <div
                            key={v.id}
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, vehicleType: v.name }))
                            }
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-2 ${
                              formData.vehicleType === v.name
                                ? 'border-[#123C35] bg-[#123C35]/5 shadow-sm'
                                : 'border-gray-200 hover:border-[#123C35]/40 bg-white'
                            }`}
                          >
                            <span className="font-semibold text-xs text-[#123C35] block">
                              {v.name}
                            </span>
                            <span className="text-[11px] text-gray-500 block font-mono">
                              {v.capacity}
                            </span>
                            <span className="text-xs font-bold text-[#C5A059] block">
                              ${price} Total
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium text-xs flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-[#123C35] hover:bg-[#1D544B] text-[#E8D8B8] font-bold text-sm px-6 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all"
                    >
                      <span>Continue to Customer Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-2 text-[#123C35] border-b border-gray-100 pb-3">
                    <User className="w-5 h-5 text-[#C5A059]" />
                    <h2 className="font-serif-title text-xl font-bold">
                      Step 3: Customer Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          name="fullName"
                          placeholder="e.g. Sarah Jenkins"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#FAF8F2] border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#123C35] focus:outline-none focus:ring-2 focus:ring-[#123C35]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          name="email"
                          placeholder="e.g. sarah@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#FAF8F2] border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#123C35] focus:outline-none focus:ring-2 focus:ring-[#123C35]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+1 555 019 2831"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#FAF8F2] border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#123C35] focus:outline-none focus:ring-2 focus:ring-[#123C35]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Specific Pickup Hotel / Location Address *
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          name="pickupLocation"
                          placeholder="e.g. Cinnamon Grand Hotel, Colombo 03"
                          value={formData.pickupLocation}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#FAF8F2] border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#123C35] focus:outline-none focus:ring-2 focus:ring-[#123C35]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Special Requests / Luggage Notes (Optional)
                    </label>
                    <textarea
                      name="specialRequests"
                      rows={3}
                      placeholder="e.g. Child safety seat required, surfboards, extra luggage..."
                      value={formData.specialRequests}
                      onChange={handleChange}
                      className="w-full bg-[#FAF8F2] border border-gray-200 rounded-xl p-3 text-xs text-[#123C35] focus:outline-none focus:ring-2 focus:ring-[#123C35]"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium text-xs flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      disabled={!isStep3Valid()}
                      onClick={handleNextStep}
                      className="bg-[#123C35] disabled:opacity-50 hover:bg-[#1D544B] text-[#E8D8B8] font-bold text-sm px-6 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all"
                    >
                      <span>Proceed to Summary</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-2 text-[#123C35] border-b border-gray-100 pb-3">
                    <FileText className="w-5 h-5 text-[#C5A059]" />
                    <h2 className="font-serif-title text-xl font-bold">
                      Step 4: Verify Summary & Submit
                    </h2>
                  </div>

                  <div className="bg-[#FAF8F2] p-6 rounded-2xl border border-[#E8D8B8]/60 space-y-4">
                    <h3 className="font-serif-title text-lg font-bold text-[#123C35]">
                      Reservation Summary
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-gray-500 block">Route:</span>
                        <span className="font-semibold text-[#123C35] text-sm">
                          {selectedRoute.name}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Date & Time:</span>
                        <span className="font-semibold text-[#123C35]">
                          {formData.travelDate} at {formData.travelTime}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Passengers:</span>
                        <span className="font-semibold text-[#123C35]">
                          {formData.passengers} Pax
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Vehicle:</span>
                        <span className="font-semibold text-[#123C35]">
                          {formData.vehicleType}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Customer Name:</span>
                        <span className="font-semibold text-[#123C35]">
                          {formData.fullName} ({formData.phone})
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Pickup Address:</span>
                        <span className="font-semibold text-[#123C35]">
                          {formData.pickupLocation}
                        </span>
                      </div>
                    </div>

                    {formData.specialRequests && (
                      <div className="pt-2 border-t border-[#E8D8B8]/30 text-xs">
                        <span className="text-gray-500 block">Special Requests:</span>
                        <span className="italic text-gray-700">{formData.specialRequests}</span>
                      </div>
                    )}

                    <div className="pt-4 border-t border-[#E8D8B8]/40 flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-700">Estimated Total Rate:</span>
                      <div className="text-right">
                        <span className="font-serif-title font-bold text-3xl text-[#123C35]">
                          ${calculatedPriceUSD}
                        </span>
                        <span className="text-xs text-gray-500 block font-mono">
                          (~ LKR {calculatedPriceLKR.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-gray-500 bg-amber-50 p-3.5 rounded-xl border border-amber-200">
                    <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      By clicking Confirm Booking, your travel details will be submitted directly to Leela Travels. Payment can be settled later upon trip confirmation.
                    </span>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium text-xs flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#123C35] hover:bg-[#1D544B] text-[#E8D8B8] font-bold text-sm px-8 py-3.5 rounded-xl shadow-xl flex items-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Saving Reservation...</span>
                      ) : (
                        <>
                          <span>Confirm Booking Request</span>
                          <CheckCircle2 className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
