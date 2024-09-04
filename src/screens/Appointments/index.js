import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, FlatList } from 'react-native';
import Footer from '../../components/footer';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import EditAppointmentModal from '../../components/EditAppointmentModal';
import FloatingAccessibilityButton from '../../components/FloatingAccessibilityButton';

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState([
    {
      id: '1',
      title: 'Atendimento Clínica Santa Helena',
      location: 'Sergipe - Aracaju',
      date: '22/02/2024',
      time: '09:30',
      notes: 'Trazer documentos pessoais',
    },
    {
      id: '2',
      title: 'Hospital Primavera',
      location: 'Dr. Rafael Santana',
      date: '28/03/2024',
      time: '14:00',
      notes: 'Cardiologista com o Dr. Rafael Santana',
    },
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const contentRef = useRef(null);

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const handleCancel = (id) => {
    Alert.alert(
      'Cancelar',
      'Tem certeza que deseja cancelar este compromisso?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => {
            setAppointments((prevAppointments) =>
              prevAppointments.filter((appointment) => appointment.id !== id)
            );
            Alert.alert('Cancelado', 'Compromisso cancelado com sucesso.');
          },
        },
      ]
    );
  };

  const updateAppointment = (updatedAppointment) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === updatedAppointment.id ? updatedAppointment : appointment
      )
    );
    setModalVisible(false);
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Meus Compromissos</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar compromissos"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          ref={contentRef} // Referência ao conteúdo
          data={filteredAppointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item: appointment }) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{appointment.title}</Text>
                <Text style={styles.location}>{appointment.location}</Text>
              </View>
              <View style={styles.cardDetails}>
                <View style={styles.detailRow}>
                  <FontAwesome name="calendar" size={18} color="#45c2a8" />
                  <Text style={styles.detailText}>{appointment.date}</Text>
                  <Ionicons name="time-outline" size={18} color="#45c2a8" />
                  <Text style={styles.detailText}>{appointment.time}</Text>
                </View>
                <Text style={styles.notes}>{appointment.notes}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.rescheduleButton}
                  onPress={() => handleReschedule(appointment)}
                >
                  <Text style={styles.rescheduleButtonText}>Reagendar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => handleCancel(appointment.id)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {selectedAppointment && (
        <EditAppointmentModal
          visible={modalVisible}
          appointment={selectedAppointment}
          onClose={() => setModalVisible(false)}
          onSave={updateAppointment}
        />
      )}

      {/* Adicionando o botão de acessibilidade */}
      <FloatingAccessibilityButton targetRef={contentRef} />

      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#45c2a8',
    marginBottom: 20,
    alignSelf: 'center',
  },
  searchInput: {
    height: 55,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#e9e9e9',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#aaa',
  },
  cardDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
    marginRight: 20,
  },
  notes: {
    fontSize: 14,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rescheduleButton: {
    backgroundColor: '#45c2a8',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  rescheduleButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#de5246',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
