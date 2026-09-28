export interface VehicleType {
  id: string;
  name: string;
  capacity: string;
  priceMultiplier: number;
  description: string;
  image: string;
}

export interface RouteItem {
  id: number;
  name: string;
  from: string;
  to: string;
  duration: string;
  distance: string;
  priceUSD: number;
  priceLKR: number;
  image: string;
  images: string[];
  description: string;
  highlights: string[];
  inclusions: string[];
  vehicleTypes: string[];
  popular?: boolean;
  category: 'Hill Country' | 'Coastal' | 'Cultural Triangle' | 'Wildlife Safari';
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Booking {
  id: string;
  routeId: number;
  routeName: string;
  from: string;
  to: string;
  travelDate: string;
  travelTime: string;
  passengers: number;
  vehicleType: string;
  fullName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  specialRequests?: string;
  totalPriceUSD: number;
  totalPriceLKR: number;
  status: BookingStatus;
  createdAt: string;
}

export interface BookingFormData {
  routeId: number;
  travelDate: string;
  travelTime: string;
  passengers: number;
  vehicleType: string;
  fullName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  specialRequests: string;
}
