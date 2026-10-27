import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  departments: [
    { id: 'dept-1', name: 'Cardiology', icon: 'heart', doctorsCount: 8, color: '#EF4444' },
    { id: 'dept-2', name: 'Neurology', icon: 'brain', doctorsCount: 6, color: '#8B5CF6' },
    { id: 'dept-3', name: 'Pediatrics', icon: 'child', doctorsCount: 10, color: '#3B82F6' },
    { id: 'dept-4', name: 'Orthopedics', icon: 'bone', doctorsCount: 7, color: '#F59E0B' },
    { id: 'dept-5', name: 'Dental', icon: 'tooth', doctorsCount: 5, color: '#10B981' },
    { id: 'dept-6', name: 'Ophthalmology', icon: 'eye', doctorsCount: 4, color: '#06B6D4' },
  ],
  doctors: [
    {
      id: 'doc-1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Senior Cardiologist',
      department: 'Cardiology',
      experience: '14 Years',
      rating: 4.9,
      reviews: 142,
      fee: '$50',
      availability: 'Available Today',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'doc-2',
      name: 'Dr. Michael Chen',
      specialty: 'Chief Neurologist',
      department: 'Neurology',
      experience: '16 Years',
      rating: 4.8,
      reviews: 98,
      fee: '$60',
      availability: 'Available Tomorrow',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'doc-3',
      name: 'Dr. Emily Taylor',
      specialty: 'Pediatric Specialist',
      department: 'Pediatrics',
      experience: '9 Years',
      rating: 4.95,
      reviews: 215,
      fee: '$45',
      availability: 'Available Today',
      image: 'https://images.unsplash.com/photo-1594824813575-d227b94b05a7?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'doc-4',
      name: 'Dr. James Wilson',
      specialty: 'Orthopedic Surgeon',
      department: 'Orthopedics',
      experience: '11 Years',
      rating: 4.7,
      reviews: 84,
      fee: '$55',
      availability: 'Next Mon',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80',
    },
  ],
  selectedDepartment: 'All',
  searchQuery: '',
};

export const hospitalSlice = createSlice({
  name: 'hospital',
  initialState,
  reducers: {
    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSelectedDepartment, setSearchQuery } = hospitalSlice.actions;
export default hospitalSlice.reducer;
