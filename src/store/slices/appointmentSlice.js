import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [
    {
      id: 'apt-001',
      doctorId: 'doc-1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Senior Cardiologist',
      department: 'Cardiology',
      date: 'Oct 29, 2026',
      time: '10:00 AM',
      type: 'In-Hospital',
      status: 'Upcoming',
      doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'apt-002',
      doctorId: 'doc-3',
      doctorName: 'Dr. Emily Taylor',
      specialty: 'Pediatric Specialist',
      department: 'Pediatrics',
      date: 'Nov 02, 2026',
      time: '02:30 PM',
      type: 'Online Consultation',
      status: 'Upcoming',
      doctorImage: 'https://images.unsplash.com/photo-1594824813575-d227b94b05a7?w=200&auto=format&fit=crop&q=80',
    },
  ],
};

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    bookAppointment: (state, action) => {
      state.appointments.unshift(action.payload);
    },
    cancelAppointment: (state, action) => {
      state.appointments = state.appointments.filter((apt) => apt.id !== action.payload);
    },
  },
});

export const { bookAppointment, cancelAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
