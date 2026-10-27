import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar as RNStatusBar,
  Platform,
} from 'react-native';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import store from './src/store';
import HomeScreen from './src/screens/HomeScreen';
import DoctorsScreen from './src/screens/DoctorsScreen';
import AppointmentsScreen from './src/screens/AppointmentsScreen';
import BookingModal from './src/components/BookingModal';

function MainNavigator() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Screen Content */}
      <View style={styles.content}>
        {activeTab === 'home' && (
          <HomeScreen
            onSelectDoctor={handleOpenBooking}
            onNavigateTab={setActiveTab}
          />
        )}
        {activeTab === 'doctors' && (
          <DoctorsScreen onSelectDoctor={handleOpenBooking} />
        )}
        {activeTab === 'appointments' && (
          <AppointmentsScreen onNavigateTab={setActiveTab} />
        )}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('home')}
        >
          <Text style={[styles.tabIcon, activeTab === 'home' && styles.tabActiveIcon]}>
            🏥
          </Text>
          <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabActiveLabel]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('doctors')}
        >
          <Text style={[styles.tabIcon, activeTab === 'doctors' && styles.tabActiveIcon]}>
            👨‍⚕️
          </Text>
          <Text style={[styles.tabLabel, activeTab === 'doctors' && styles.tabActiveLabel]}>
            Doctors
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('appointments')}
        >
          <Text style={[styles.tabIcon, activeTab === 'appointments' && styles.tabActiveIcon]}>
            📅
          </Text>
          <Text style={[styles.tabLabel, activeTab === 'appointments' && styles.tabActiveLabel]}>
            Appointments
          </Text>
        </TouchableOpacity>
      </View>

      {/* Booking Modal */}
      <BookingModal
        visible={isModalOpen}
        doctor={selectedDoctor}
        onClose={() => setIsModalOpen(false)}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
    opacity: 0.5,
  },
  tabActiveIcon: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
  tabActiveLabel: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
});
