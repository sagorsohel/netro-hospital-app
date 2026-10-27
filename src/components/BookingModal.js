import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { bookAppointment } from '../store/slices/appointmentSlice';

export default function BookingModal({ visible, doctor, onClose }) {
  const dispatch = useDispatch();
  const [date, setDate] = useState('Tomorrow, 10:30 AM');
  const [consultationType, setConsultationType] = useState('In-Hospital');

  if (!doctor) return null;

  const handleBook = () => {
    dispatch(
      bookAppointment({
        id: `apt-${Date.now()}`,
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        department: doctor.department,
        date: date,
        time: '10:30 AM',
        type: consultationType,
        status: 'Upcoming',
        doctorImage: doctor.image,
      })
    );
    Alert.alert('Success', `Appointment booked with ${doctor.name}!`);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Book Appointment</Text>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty} • {doctor.fee}</Text>

          <Text style={styles.label}>Select Consultation Type</Text>
          <View style={styles.typeRow}>
            {['In-Hospital', 'Online Consultation'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  consultationType === type && styles.typeButtonActive,
                ]}
                onPress={() => setConsultationType(type)}
              >
                <Text
                  style={[
                    styles.typeText,
                    consultationType === type && styles.typeTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Preferred Date & Time</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="e.g. Oct 30, 2026 - 11:00 AM"
          />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleBook}>
              <Text style={styles.confirmText}>Confirm Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
    marginTop: 6,
  },
  specialty: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  typeButtonActive: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  typeText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  typeTextActive: {
    color: '#2563eb',
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0f172a',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  cancelText: {
    color: '#64748b',
    fontWeight: '600',
  },
  confirmBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  confirmText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
