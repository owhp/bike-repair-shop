export interface Appointment {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  dateTime: Date;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}
