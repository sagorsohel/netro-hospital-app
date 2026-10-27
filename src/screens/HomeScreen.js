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
    backgroundColor: '#f8fafc',
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
    color: '#0f172a',
  },
  subGreeting: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  emergencyCard: {
    backgroundColor: '#ef4444',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  emergencyBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fee2e2',
    letterSpacing: 1,
  },
  emergencyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 4,
  },
  emergencyNumber: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 6,
  },
  appointmentQuickCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#bfdbfe',
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
    color: '#2563eb',
    textTransform: 'uppercase',
  },
  appointmentQuickDoctor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 2,
  },
  appointmentQuickDate: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  badgeUpcoming: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeUpcomingText: {
    color: '#ffffff',
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
    color: '#0f172a',
  },
  seeAll: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '600',
  },
  deptScroll: {
    marginBottom: 16,
  },
  deptChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
  },
  deptChipActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  deptChipText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  deptChipTextActive: {
    color: '#ffffff',
  },
  doctorList: {
    gap: 12,
    paddingBottom: 24,
  },
  doctorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
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
    color: '#0f172a',
  },
  docSpecialty: {
    fontSize: 12,
    color: '#2563eb',
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
    color: '#64748b',
  },
  docFee: {
    fontSize: 11,
    color: '#10b981',
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
