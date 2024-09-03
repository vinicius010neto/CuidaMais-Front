import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons'; 
import Calendar from 'react-native-calendars'; 
import { StatusBar } from 'react-native';
// Você pode precisar instalar uma biblioteca para o calendário


export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Seus próximos compromissos</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="O que você busca?"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="location-outline" size={24} color="#45c2a8" />
        </TouchableOpacity>
      </View>

      <Calendar
        style={styles.calendar}
        // Defina outras propriedades do calendário conforme necessário
      />

      <View style={styles.appointmentDetails}>
        <Text style={styles.appointmentText}>Atendimento Clínica Santa Helena</Text>
        <Text style={styles.appointmentSubText}>Sergipe - Aracaju</Text>
        
        <View style={styles.appointmentInfo}>
          <View style={styles.infoContainer}>
            <FontAwesome name="calendar" size={18} color="#45c2a8" />
            <Text style={styles.infoText}>22/02/2024</Text>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons name="time-outline" size={18} color="#45c2a8" />
            <Text style={styles.infoText}>09:30</Text>
          </View>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome do compromisso"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Hora"
        placeholderTextColor="#aaa"
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 18,
    color: '#45c2a8',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#e9e9e9',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 10,
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 10,
  },
  appointmentDetails: {
    marginBottom: 20,
  },
  appointmentText: {
    fontSize: 16,
    color: '#333',
  },
  appointmentSubText: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 5,
  },
  appointmentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: '#e9e9e9',
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
});
