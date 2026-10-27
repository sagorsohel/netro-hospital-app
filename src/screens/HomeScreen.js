import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDepartment } from '../store/slices/hospitalSlice';
import { COLORS } from '../constants/theme';

export default function HomeScreen({ onSelectDoctor, onNavigateTab }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { departments, doctors, selectedDepartment } = useSelector((state) => state.hospital);
  const appointments = useSelector((state) => state.appointment.appointments);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Welcome Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name || 'Patient'} 👋</Text>
          <Text style={styles.subGreeting}>How are you feeling today?</Text>
        </View>
        <Image
          source={{ uri: user?.avatar }}
          style={styles.avatar}
        />
      </View>

      {/* Emergency Hotline Card */}
      <View style={styles.emergencyCard}>
        <View style={styles.emergencyInfo}>
          <Text style={styles.emergencyBadge}>24/7 EMERGENCY</Text>
          <Text style={styles.emergencyTitle}>Need Urgent Medical Help?</Text>
          <Text style={styles.emergencyNumber}>📞 Hotline: 10678 / +880 1800-NETRO</Text>
        </View>
      </View>

      {/* Active Appointments Quick Bar */}
      {appointments.length > 0 && (
        <TouchableOpacity
          style={styles.appointmentQuickCard}
          onPress={() => onNavigateTab('appointments')}
        >
          <View style={styles.appointmentQuickLeft}>
            <Text style={styles.appointmentQuickTitle}>Next Appointment</Text>
            <Text style={styles.appointmentQuickDoctor}>
              {appointments[0].doctorName} ({appointments[0].department})
            </Text>
            <Text style={styles.appointmentQuickDate}>
              📅 {appointments[0].date} • {appointments[0].time}
            </Text>
          </View>
          <View style={styles.badgeUpcoming}>
            <Text style={styles.badgeUpcomingText}>{appointments.length} Total</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Hospital Departments */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Departments</Text>
        <TouchableOpacity onPress={() => onNavigateTab('doctors')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.deptScroll}>
        <TouchableOpacity
          style={[
            styles.deptChip,
            selectedDepartment === 'All' && styles.deptChipActive,
          ]}
          onPress={() => dispatch(setSelectedDepartment('All'))}
        >
          <Text
            style={[
              styles.deptChipText,
              selectedDepartment === 'All' && styles.deptChipTextActive,
            ]}
          >
            All Specialists
          </Text>
        </TouchableOpacity>
        {departments.map((dept) => (
          <TouchableOpacity
            key={dept.id}
            style={[
              styles.deptChip,
              selectedDepartment === dept.name && styles.deptChipActive,
            ]}
            onPress={() => dispatch(setSelectedDepartment(dept.name))}
          >
            <Text
              style={[
                styles.deptChipText,
                selectedDepartment === dept.name && styles.deptChipTextActive,
              ]}
            >
              {dept.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Top Specialists */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Doctors</Text>
        <TouchableOpacity onPress={() => onNavigateTab('doctors')}>
          <Text style={styles.seeAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.doctorList}>
        {doctors
          .filter(
            (doc) =>
              selectedDepartment === 'All' || doc.department === selectedDepartment
          )
          .map((doc) => (
            <View key={doc.id} style={styles.doctorCard}>
              <Image source={{ uri: doc.image }} style={styles.doctorImage} />
              <View style={styles.doctorInfo}>
                <Text style={styles.docName}>{doc.name}</Text>
                <Text style={styles.docSpecialty}>{doc.specialty}</Text>
                <View style={styles.docMeta}>
                  <Text style={styles.docRating}>⭐ {doc.rating}</Text>
                  <Text style={styles.docExp}>• {doc.experience}</Text>
                  <Text style={styles.docFee}>• {doc.fee}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => onSelectDoctor(doc)}
              >
                <Text style={styles.bookButtonText}>Book</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbf6',
    paddingHorizontal: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  subGreeting: {
    fontSize: 13,
    color: COLORS.slate500,
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  emergencyCard: {
    backgroundColor: COLORS.accent,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  emergencyBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.cream,
    letterSpacing: 1,
  },
  emergencyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 4,
  },
  emergencyNumber: {
    fontSize: 13,
    color: COLORS.cream,
    fontWeight: 'bold',
    marginTop: 6,
  },
  appointmentQuickCard: {
    backgroundColor: COLORS.cream,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#faecc0',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appointmentQuickLeft: {
    flex: 1,
  },
  appointmentQuickTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.secondary,
    textTransform: 'uppercase',
  },
  appointmentQuickDoctor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginTop: 2,
  },
  appointmentQuickDate: {
    fontSize: 12,
    color: COLORS.slate500,
    marginTop: 2,
  },
  badgeUpcoming: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeUpcomingText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  seeAll: {
    fontSize: 13,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  deptScroll: {
    marginBottom: 16,
  },
  deptChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    marginRight: 8,
  },
  deptChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  deptChipText: {
    fontSize: 12,
    color: COLORS.dark,
    fontWeight: '600',
  },
  deptChipTextActive: {
    color: COLORS.white,
  },
  doctorList: {
    gap: 12,
    paddingBottom: 24,
  },
  doctorCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.slate200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  doctorImage: {
    width: 56,
    height: 56,
    borderRadius: 14,
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  docName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  docSpecialty: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 1,
  },
  docMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  docRating: {
    fontSize: 11,
    color: '#f59e0b',
    fontWeight: 'bold',
  },
  docExp: {
    fontSize: 11,
    color: COLORS.slate500,
  },
  docFee: {
    fontSize: 11,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  bookButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
