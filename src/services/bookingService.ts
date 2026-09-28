import type { Booking, BookingFormData, BookingStatus } from '../types';
import { SRI_LANKAN_ROUTES, VEHICLE_OPTIONS } from '../data/routesData';
import { db } from '../config/firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';

const BOOKINGS_COLLECTION = 'bookings';
const BACKUP_STORAGE_KEY = 'leela_travels_bookings_backup';

export const saveBooking = async (formData: BookingFormData): Promise<Booking> => {
  const route = SRI_LANKAN_ROUTES.find((r) => r.id === formData.routeId) || SRI_LANKAN_ROUTES[0];
  const vehicle = VEHICLE_OPTIONS.find((v) => v.name === formData.vehicleType || v.id === formData.vehicleType) || VEHICLE_OPTIONS[0];

  const priceMultiplier = vehicle.priceMultiplier || 1.0;
  const totalPriceUSD = Math.round(route.priceUSD * priceMultiplier);
  const totalPriceLKR = Math.round(route.priceLKR * priceMultiplier);

  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  const bookingId = `LT-${randomDigits}`;

  const newBooking: Booking = {
    id: bookingId,
    routeId: route.id,
    routeName: route.name,
    from: route.from,
    to: route.to,
    travelDate: formData.travelDate,
    travelTime: formData.travelTime,
    passengers: formData.passengers,
    vehicleType: vehicle.name,
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    pickupLocation: formData.pickupLocation,
    specialRequests: formData.specialRequests || '',
    totalPriceUSD,
    totalPriceLKR,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  try {
    // Save to Firebase Firestore
    const bookingRef = doc(db, BOOKINGS_COLLECTION, bookingId);
    await setDoc(bookingRef, newBooking);
    console.log('Booking saved to Firebase Firestore successfully:', bookingId);
  } catch (error) {
    console.warn('Firebase Firestore save failed, using backup storage:', error);
    try {
      const existing = JSON.parse(localStorage.getItem(BACKUP_STORAGE_KEY) || '[]');
      localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify([newBooking, ...existing]));
    } catch (e) {
      console.error('Backup storage failed:', e);
    }
  }

  return newBooking;
};

export const getStoredBookings = async (): Promise<Booking[]> => {
  try {
    const q = query(collection(db, BOOKINGS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const bookings: Booking[] = [];
    querySnapshot.forEach((docSnap) => {
      bookings.push(docSnap.data() as Booking);
    });

    // Also merge any local backup bookings if offline
    try {
      const backup = JSON.parse(localStorage.getItem(BACKUP_STORAGE_KEY) || '[]');
      backup.forEach((b: Booking) => {
        if (!bookings.some((existing) => existing.id === b.id)) {
          bookings.push(b);
        }
      });
    } catch (e) {
      // ignore backup errors
    }

    return bookings;
  } catch (error) {
    console.warn('Failed to fetch from Firebase Firestore, attempting backup storage:', error);
    try {
      return JSON.parse(localStorage.getItem(BACKUP_STORAGE_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }
};

export const updateBookingStatus = async (id: string, newStatus: BookingStatus): Promise<void> => {
  try {
    const bookingRef = doc(db, BOOKINGS_COLLECTION, id);
    await updateDoc(bookingRef, { status: newStatus });
    console.log(`Updated booking ${id} status to ${newStatus} in Firebase Firestore`);
  } catch (error) {
    console.warn('Failed to update status in Firebase Firestore, updating backup:', error);
    try {
      const backup: Booking[] = JSON.parse(localStorage.getItem(BACKUP_STORAGE_KEY) || '[]');
      const updated = backup.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
      localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Backup update failed:', e);
    }
  }
};

export const updateBookingDetails = async (id: string, updatedFields: Partial<Booking>): Promise<void> => {
  try {
    const bookingRef = doc(db, BOOKINGS_COLLECTION, id);
    await updateDoc(bookingRef, updatedFields);
    console.log(`Updated booking ${id} details in Firebase Firestore`);
  } catch (error) {
    console.warn('Failed to update details in Firebase Firestore, updating backup:', error);
    try {
      const backup: Booking[] = JSON.parse(localStorage.getItem(BACKUP_STORAGE_KEY) || '[]');
      const updated = backup.map((b) => (b.id === id ? { ...b, ...updatedFields } : b));
      localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Backup update failed:', e);
    }
  }
};

export const deleteBooking = async (id: string): Promise<void> => {
  try {
    const bookingRef = doc(db, BOOKINGS_COLLECTION, id);
    await deleteDoc(bookingRef);
    console.log(`Deleted booking ${id} from Firebase Firestore`);
  } catch (error) {
    console.warn('Failed to delete booking in Firebase Firestore, deleting from backup:', error);
    try {
      const backup: Booking[] = JSON.parse(localStorage.getItem(BACKUP_STORAGE_KEY) || '[]');
      const filtered = backup.filter((b) => b.id !== id);
      localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error('Backup delete failed:', e);
    }
  }
};
