import React, { useState, useEffect } from 'react';
import {
  getStoredBookings,
  updateBookingStatus,
  deleteBooking,
  updateBookingDetails,
  saveBooking
} from '../services/bookingService';
import { useAdminAuth } from '../context/AdminAuthContext';
import { SRI_LANKAN_ROUTES, VEHICLE_OPTIONS } from '../data/routesData';
import type { Booking, BookingStatus, BookingFormData } from '../types';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageSquare,
  RefreshCw,
  Loader2,
  Lock,
  Mail,
  LogOut,
  ArrowRight,
  UserCheck,
  Trash2,
  Edit3,
  Plus,
  X,
  Save
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { adminUser, adminLogin, adminLogout } = useAdminAuth();

  // Admin Auth Form State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Bookings Data State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // CRUD Modals State
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // New Booking Form State
  const [newBookingData, setNewBookingData] = useState<BookingFormData>({
    routeId: SRI_LANKAN_ROUTES[0].id,
    travelDate: new Date().toISOString().split('T')[0],
    travelTime: '10:00',
    passengers: 2,
    vehicleType: 'Luxury Sedan',
    fullName: '',
    email: '',
    phone: '',
    pickupLocation: '',
    specialRequests: ''
  });

  const fetchBookings = async () => {
    if (!adminUser) return;
    setLoading(true);
    try {
      const data = await getStoredBookings();
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminUser) {
      fetchBookings();
    }
  }, [adminUser]);

  const handleAdminAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!adminEmail || !adminPassword) {
      setAuthError('Please enter both Email and Password.');
      return;
    }

    try {
      setIsSubmittingAuth(true);
      await adminLogin(adminEmail, adminPassword);
    } catch (err: unknown) {
      console.error('Firebase Admin Auth Error:', err);
      let msg = 'Authentication failed. Please check your admin credentials.';
      if (err instanceof Error) {
        if (err.message.includes('auth/invalid-credential') || err.message.includes('auth/wrong-password') || err.message.includes('auth/user-not-found')) {
          msg = 'Invalid Email or Password.';
        } else if (err.message.includes('auth/too-many-requests')) {
          msg = 'Access temporarily disabled due to many failed attempts. Try again later.';
        }
      }
      setAuthError(msg);
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: BookingStatus) => {
    try {
      await updateBookingStatus(id, newStatus);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      setDeletingId(null);
    } catch (err) {
      console.error('Error deleting booking:', err);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;

    try {
      await updateBookingDetails(editingBooking.id, editingBooking);
      setBookings((prev) =>
        prev.map((b) => (b.id === editingBooking.id ? editingBooking : b))
      );
      setEditingBooking(null);
    } catch (err) {
      console.error('Error updating booking details:', err);
    }
  };

  const handleCreateBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await saveBooking(newBookingData);
      setBookings((prev) => [created, ...prev]);
      setShowCreateModal(false);
      setNewBookingData({
        routeId: SRI_LANKAN_ROUTES[0].id,
        travelDate: new Date().toISOString().split('T')[0],
        travelTime: '10:00',
        passengers: 2,
        vehicleType: 'Luxury Sedan',
        fullName: '',
        email: '',
        phone: '',
        pickupLocation: '',
        specialRequests: ''
      });
    } catch (err) {
      console.error('Error creating booking:', err);
    }
  };

  // If NOT logged in as Admin, show Admin Login Portal
  if (!adminUser) {
    return (
      <div className="min-h-screen bg-[#FAF8F2] pt-28 pb-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#E8D8B8]/50 shadow-2xl overflow-hidden">
          <div className="bg-[#123C35] text-white p-8 text-center relative">
            <div className="w-12 h-12 rounded-2xl bg-[#E8D8B8] flex items-center justify-center text-[#123C35] shadow-lg mx-auto mb-3">
              <ShieldCheck className="w-7 h-7 text-[#123C35]" />
            </div>
            <h1 className="font-serif-title text-2xl font-bold text-[#FAF8F2]">
              Operations Admin Portal
            </h1>
            <p className="text-xs text-[#E8D8B8] mt-1 font-light">
              Restricted Access • Authenticate as Admin
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {authError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3.5 rounded-xl flex items-start gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleAdminAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Admin Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="Enter Admin Email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                    className="w-full bg-[#FAF8F2] border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#123C35] focus:outline-none focus:ring-2 focus:ring-[#123C35]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Admin Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    placeholder="Enter Admin Password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                    className="w-full bg-[#FAF8F2] border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#123C35] focus:outline-none focus:ring-2 focus:ring-[#123C35]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingAuth}
                className="w-full bg-[#123C35] hover:bg-[#1D544B] text-[#E8D8B8] font-bold text-xs py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
              >
                <span>{isSubmittingAuth ? 'Authenticating...' : 'Sign In as Admin'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Filter Bookings
  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== 'All' && b.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        b.id.toLowerCase().includes(q) ||
        b.fullName.toLowerCase().includes(q) ||
        b.routeName.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalBookingsCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === 'Pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const totalRevenueUSD = bookings
    .filter((b) => b.status === 'Confirmed' || b.status === 'Completed')
    .reduce((acc, b) => acc + b.totalPriceUSD, 0);

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case 'Completed':
        return (
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Admin User Badge & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123C35]/10 text-[#123C35] text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Operations Control Center
            </div>
            <h1 className="font-serif-title text-3xl font-bold text-[#123C35]">
              Leela Travels Reservations
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#123C35] hover:bg-[#1D544B] text-[#E8D8B8] font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>New Reservation</span>
            </button>

            <div className="flex items-center gap-2 bg-white border border-[#E8D8B8] px-3.5 py-2 rounded-xl text-xs text-[#123C35] shadow-sm">
              <UserCheck className="w-4 h-4 text-[#C5A059]" />
              <span className="font-semibold truncate max-w-[150px]">{adminUser.email}</span>
            </div>

            <button
              onClick={fetchBookings}
              disabled={loading}
              className="bg-white border border-[#E8D8B8] hover:bg-[#FAF8F2] text-[#123C35] font-semibold text-xs px-3.5 py-2 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
            </button>

            <button
              onClick={() => adminLogout()}
              className="bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-semibold text-xs px-3.5 py-2 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
              title="Sign Out Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-[#E8D8B8]/40 shadow-sm space-y-1">
            <span className="text-xs text-gray-500 uppercase tracking-wider block">Total Bookings</span>
            <span className="font-serif-title text-3xl font-bold text-[#123C35]">{totalBookingsCount}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-1">
            <span className="text-xs text-amber-700 uppercase tracking-wider block">Pending Review</span>
            <span className="font-serif-title text-3xl font-bold text-amber-600">{pendingCount}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-1">
            <span className="text-xs text-emerald-700 uppercase tracking-wider block">Confirmed Trips</span>
            <span className="font-serif-title text-3xl font-bold text-emerald-600">{confirmedCount}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8D8B8]/40 shadow-sm space-y-1">
            <span className="text-xs text-gray-500 uppercase tracking-wider block">Confirmed Revenue</span>
            <span className="font-serif-title text-3xl font-bold text-[#123C35]">${totalRevenueUSD}</span>
          </div>
        </div>

        {/* Search & Status Filters */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8D8B8]/40 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by ID, name, phone, route..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#FAF8F2] border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-[#123C35] focus:outline-none focus:ring-2 focus:ring-[#123C35]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  statusFilter === st
                    ? 'bg-[#123C35] text-[#E8D8B8]'
                    : 'bg-[#FAF8F2] text-gray-600 hover:bg-gray-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table / List */}
        <div className="bg-white rounded-2xl border border-[#E8D8B8]/40 shadow-xl overflow-hidden min-h-[250px]">
          {loading ? (
            <div className="p-16 text-center text-gray-500 space-y-3 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-[#123C35] animate-spin" />
              <p className="text-xs font-medium text-[#123C35]">Loading reservations...</p>
            </div>
          ) : filteredBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#123C35] text-[#E8D8B8] text-xs font-semibold uppercase tracking-wider">
                    <th className="p-4">Ref ID</th>
                    <th className="p-4">Route & Vehicle</th>
                    <th className="p-4">Schedule</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions (CRUD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FAF8F2] text-xs">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#FAF8F2]/60 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#123C35]">{b.id}</td>
                      <td className="p-4 space-y-0.5">
                        <span className="font-bold text-[#123C35] block">{b.routeName}</span>
                        <span className="text-[11px] text-gray-500 block">{b.vehicleType}</span>
                      </td>
                      <td className="p-4 space-y-0.5">
                        <span className="font-semibold text-gray-800 block">{b.travelDate}</span>
                        <span className="text-[11px] text-gray-500 block">{b.travelTime}</span>
                      </td>
                      <td className="p-4 space-y-1">
                        <span className="font-bold text-gray-900 block">{b.fullName} ({b.passengers} Pax)</span>
                        <div className="flex items-center gap-2 text-[11px] text-gray-500">
                          <a
                            href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <MessageSquare className="w-3 h-3 fill-emerald-600" />
                            {b.phone}
                          </a>
                        </div>
                        <span className="text-[10px] text-gray-400 block truncate max-w-xs">{b.pickupLocation}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-sm text-[#123C35] block">${b.totalPriceUSD}</span>
                        <span className="text-[10px] text-gray-400 block font-mono">LKR {b.totalPriceLKR.toLocaleString()}</span>
                      </td>
                      <td className="p-4">{getStatusBadge(b.status)}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <select
                            value={b.status}
                            onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                            className="bg-[#FAF8F2] border border-gray-300 rounded-lg px-2 py-1 text-xs text-[#123C35] font-semibold focus:outline-none focus:ring-1 focus:ring-[#123C35]"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => setEditingBooking(b)}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                            title="Edit Booking Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setDeletingId(b.id)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                            title="Delete Booking"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-16 text-center text-gray-500 space-y-2">
              <Search className="w-8 h-8 text-gray-300 mx-auto" />
              <p className="text-xs">No bookings found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Booking Modal */}
      {editingBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#E8D8B8]/50 animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif-title text-lg font-bold text-[#123C35]">
                Edit Booking: {editingBooking.id}
              </h3>
              <button onClick={() => setEditingBooking(null)} className="p-1 rounded-lg text-gray-400 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Customer Full Name</label>
                <input
                  type="text"
                  value={editingBooking.fullName}
                  onChange={(e) => setEditingBooking({ ...editingBooking, fullName: e.target.value })}
                  className="w-full border rounded-xl p-2.5 bg-[#FAF8F2]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editingBooking.phone}
                    onChange={(e) => setEditingBooking({ ...editingBooking, phone: e.target.value })}
                    className="w-full border rounded-xl p-2.5 bg-[#FAF8F2]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Passengers</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={editingBooking.passengers}
                    onChange={(e) => setEditingBooking({ ...editingBooking, passengers: parseInt(e.target.value) || 1 })}
                    className="w-full border rounded-xl p-2.5 bg-[#FAF8F2]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Travel Date</label>
                  <input
                    type="date"
                    value={editingBooking.travelDate}
                    onChange={(e) => setEditingBooking({ ...editingBooking, travelDate: e.target.value })}
                    className="w-full border rounded-xl p-2.5 bg-[#FAF8F2]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Pickup Time</label>
                  <input
                    type="time"
                    value={editingBooking.travelTime}
                    onChange={(e) => setEditingBooking({ ...editingBooking, travelTime: e.target.value })}
                    className="w-full border rounded-xl p-2.5 bg-[#FAF8F2]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Pickup Location / Hotel</label>
                <input
                  type="text"
                  value={editingBooking.pickupLocation}
                  onChange={(e) => setEditingBooking({ ...editingBooking, pickupLocation: e.target.value })}
                  className="w-full border rounded-xl p-2.5 bg-[#FAF8F2]"
                  required
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditingBooking(null)}
                  className="px-4 py-2 rounded-xl border text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#123C35] text-[#E8D8B8] font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-rose-100 animate-fade-in">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-title text-lg font-bold text-gray-900">Delete Booking?</h3>
              <p className="text-xs text-gray-500 mt-1">
                Are you sure you want to permanently delete booking <span className="font-bold text-[#123C35]">{deletingId}</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl border text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteBooking(deletingId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Booking Modal (Admin Manual Add) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#E8D8B8]/50 animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif-title text-lg font-bold text-[#123C35]">
                Manual Reservation Entry
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 rounded-lg text-gray-400 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBookingSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Select Route *</label>
                <select
                  value={newBookingData.routeId}
                  onChange={(e) => setNewBookingData({ ...newBookingData, routeId: Number(e.target.value) || SRI_LANKAN_ROUTES[0].id })}
                  className="w-full border rounded-xl p-2.5 bg-[#FAF8F2]"
                >
                  {SRI_LANKAN_ROUTES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} (${r.priceUSD})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={newBookingData.fullName}
                  onChange={(e) => setNewBookingData({ ...newBookingData, fullName: e.target.value })}
                  className="w-full border rounded-xl p-2.5 bg-[#FAF8F2]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Email *</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={newBookingData.email}
                    onChange={(e) => setNewBookingData({ ...newBookingData, email: e.target.value })}
                    className="w-full border rounded-xl p-2.5 bg-[#FAF8F2]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    placeholder="+94 77 123 4567"
                    value={newBookingData.phone}
                    onChange={(e) => setNewBookingData({ ...newBookingData, phone: e.target.value })}
                    className="w-full border rounded-xl p-2.5 bg-[#FAF8F2]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Vehicle Type</label>
                  <select
                    value={newBookingData.vehicleType}
                    onChange={(e) => setNewBookingData({ ...newBookingData, vehicleType: e.target.value })}
                    className="w-full border rounded-xl p-2.5 bg-[#FAF8F2]"
                  >
                    {VEHICLE_OPTIONS.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Passengers</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newBookingData.passengers}
                    onChange={(e) => setNewBookingData({ ...newBookingData, passengers: parseInt(e.target.value) || 1 })}
                    className="w-full border rounded-xl p-2.5 bg-[#FAF8F2]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Travel Date</label>
                  <input
                    type="date"
                    value={newBookingData.travelDate}
                    onChange={(e) => setNewBookingData({ ...newBookingData, travelDate: e.target.value })}
                    className="w-full border rounded-xl p-2.5 bg-[#FAF8F2]"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Travel Time</label>
                  <input
                    type="time"
                    value={newBookingData.travelTime}
                    onChange={(e) => setNewBookingData({ ...newBookingData, travelTime: e.target.value })}
                    className="w-full border rounded-xl p-2.5 bg-[#FAF8F2]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Pickup Location / Hotel *</label>
                <input
                  type="text"
                  placeholder="e.g. Bandaranayake International Airport / Cinnamon Grand"
                  value={newBookingData.pickupLocation}
                  onChange={(e) => setNewBookingData({ ...newBookingData, pickupLocation: e.target.value })}
                  className="w-full border rounded-xl p-2.5 bg-[#FAF8F2]"
                  required
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#123C35] text-[#E8D8B8] font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" /> Create Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
