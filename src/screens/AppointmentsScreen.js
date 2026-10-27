import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { cancelAppointment } from '../store/slices/appointmentSlice';
import { COLORS } from '../constants/theme';

export default function AppointmentsScreen({ onNavigateTab }) {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointment.appointments);

  const handleCancel = (id, doctorName) => {
    Alert.alert(
      'Cancel Appointment',
      `Are you sure you want to cancel the appointment with ${doctorName}?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => dispatch(cancelAppointment(id)),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>My Appointments</Text>
        <Text style={styles.subtitle}>
          {appointments.length} active scheduled appointments
        </Text>
      </View>

      {appointments.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🩺</Text>
          <Text style={styles.emptyTitle}>No Appointments Booked</Text>
          <Text style={styles.emptySubtitle}>
            Browse doctors and book your first consultation easily.
          </Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => onNavigateTab('doctors')}
          >
            <Text style={styles.browseBtnText}>Find Doctors</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.list}>
          {appointments.map((apt) => (
            <View key={apt.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Image source={{ uri: apt.doctorImage }} style={styles.image} />
                <View style={styles.headerInfo}>
                  <Text style={styles.doctorName}>{apt.doctorName}</Text>
                  <Text style={styles.specialty}>{apt.specialty}</Text>
                  <Text style={styles.dept}>🏥 {apt.department}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{apt.status}</Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.row}>
                  <Text style={styles.label}>Date & Time:</Text>
                  <Text style={styles.value}>
                    📅 {apt.date} • {apt.time}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Type:</Text>
                  <Text style={styles.value}>📍 {apt.type}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => handleCancel(apt.id, apt.doctorName)}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewBtn}>
                  <Text style={styles.viewBtnText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbf6',
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.slate500,
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.slate500,
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 240,
  },
  browseBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 18,
  },
  browseBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
  list: {
    gap: 14,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 14,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  specialty: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 1,
  },
  dept: {
    fontSize: 11,
    color: COLORS.slate500,
    marginTop: 2,
  },
  badge: {
    backgroundColor: COLORS.cream,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#faecc0',
  },
  badgeText: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '700',
  },
  cardBody: {
    marginVertical: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    color: COLORS.slate500,
  },
  value: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.dark,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  cancelBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fca5a5',
    backgroundColor: '#fef2f2',
  },
  cancelBtnText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '600',
  },
  viewBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: COLORS.secondary,
  },
  viewBtnText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
