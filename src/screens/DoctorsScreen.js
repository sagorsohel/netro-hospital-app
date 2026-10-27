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

export default function DoctorsScreen({ onSelectDoctor }) {
  const dispatch = useDispatch();
  const { doctors, departments, selectedDepartment } = useSelector((state) => state.hospital);

  const filteredDoctors = doctors.filter(
    (doc) => selectedDepartment === 'All' || doc.department === selectedDepartment
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Hospital Doctors</Text>
        <Text style={styles.subtitle}>Browse and book top specialists</Text>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
        <TouchableOpacity
          style={[styles.tab, selectedDepartment === 'All' && styles.tabActive]}
          onPress={() => dispatch(setSelectedDepartment('All'))}
        >
          <Text style={[styles.tabText, selectedDepartment === 'All' && styles.tabTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        {departments.map((dept) => (
          <TouchableOpacity
            key={dept.id}
            style={[styles.tab, selectedDepartment === dept.name && styles.tabActive]}
            onPress={() => dispatch(setSelectedDepartment(dept.name))}
          >
            <Text style={[styles.tabText, selectedDepartment === dept.name && styles.tabTextActive]}>
              {dept.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Doctors List */}
      <View style={styles.list}>
        {filteredDoctors.map((doc) => (
          <View key={doc.id} style={styles.card}>
            <Image source={{ uri: doc.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{doc.name}</Text>
              <Text style={styles.specialty}>{doc.specialty}</Text>
              <Text style={styles.department}>🏥 {doc.department}</Text>
              <View style={styles.statsRow}>
                <Text style={styles.rating}>⭐ {doc.rating}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.exp}>{doc.experience}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={styles.fee}>{doc.fee}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.bookBtn}
              onPress={() => onSelectDoctor(doc)}
            >
              <Text style={styles.bookBtnText}>Book Slot</Text>
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
  header: {
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  tabsScroll: {
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  tabText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  list: {
    gap: 12,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginBottom: 10,
  },
  info: {
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  specialty: {
    fontSize: 13,
    color: '#2563eb',
    marginTop: 2,
    fontWeight: '500',
  },
  department: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  rating: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: 'bold',
  },
  dot: {
    color: '#cbd5e1',
  },
  exp: {
    fontSize: 12,
    color: '#64748b',
  },
  fee: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: 'bold',
  },
  bookBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
