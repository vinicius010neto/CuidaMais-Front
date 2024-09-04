import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons'; 
import * as Calendar from 'expo-calendar';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Footer from '../../components/footer';
import FloatingAccessibilityButton from '../../components/FloatingAccessibilityButton';

export default function HomeScreen() {
  const [compromisso, setCompromisso] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Permissão para acessar o calendário foi negada.');
      }
    })();
  }, []);

  const addEventToCalendar = async () => {


    if (!compromisso || !descricao || !data || !hora || !localizacao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const googleCalendar = await getGoogleCalendarSource();
    if (!googleCalendar) return; // Se não encontrar um calendário do Google, não prossiga.
    
    const [day, month, year] = data.split('/');
    const [hour, minute] = hora.split(':');

    const startDate = new Date(year, month - 1, day, hour, minute);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);

    try {
      await Calendar.createEventAsync(googleCalendar.id, {
        title: compromisso,
        startDate: startDate,
        endDate: endDate,
        timeZone: 'America/Sao_Paulo',
        location: localizacao,
        notes: descricao,
      });

      Alert.alert('Sucesso', 'Compromisso adicionado ao Google Calendar!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível adicionar o compromisso ao Google Calendar.');
    }
  };

  async function getGoogleCalendarSource() {
    try {
      const calendars = await Calendar.getCalendarsAsync();

      // Tenta encontrar o calendário do Google
      const googleCalendar = calendars.find(calendar => 
        calendar.source.name === 'accounts.google.com' || 
        calendar.accessLevel === Calendar.CalendarAccessLevel.OWNER
      );
      
      if (!googleCalendar) {
        throw new Error('Calendário do Google não encontrado.');
      }

      return googleCalendar;
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível encontrar o calendário do Google.');
      return null;
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Agende seus compromissos</Text>
        
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            placeholder="Qual a localização do compromisso?"
            onPress={(data, details = null) => {
              setLocalizacao(data.description);
            }}
            query={{
              key: 'AIzaSyAwaLYMbcdBCjjsU8c_JU8kCbgzk_YGnZA',
              language: 'pt-BR',
            }}
            styles={{
              textInput: styles.searchInput,
              listView: styles.listView,
            }}
          />
          <TouchableOpacity style={styles.searchIcon} onPress={() => {}}>
            <Ionicons name="location-outline" size={24} color="#45c2a8" />
          </TouchableOpacity>
        </View>

        <View style={styles.appointmentDetails}>
          <Text style={styles.appointmentText}>{compromisso || 'Título do compromisso'}</Text>
          <Text style={styles.appointmentSubText}>{localizacao || 'Localização'}</Text>
          
          <View style={styles.appointmentInfo}>
            <View style={styles.infoContainer}>
              <FontAwesome name="calendar" size={18} color="#45c2a8" />
              <Text style={styles.infoText}>{data || 'Data (dd/mm/aaaa)'}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Ionicons name="time-outline" size={18} color="#45c2a8" />
              <Text style={styles.infoText}>{hora || 'Hora (hh:mm)'}</Text>
            </View>
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Nome do compromisso"
          placeholderTextColor="#aaa"
          value={compromisso}
          onChangeText={setCompromisso}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          placeholderTextColor="#aaa"
          value={descricao}
          onChangeText={setDescricao}
        />
        <TextInput
          style={styles.input}
          placeholder="Data (dd/mm/aaaa)"
          placeholderTextColor="#aaa"
          value={data}
          onChangeText={setData}
        />
        <TextInput
          style={styles.input}
          placeholder="Hora (hh:mm)"
          placeholderTextColor="#aaa"
          value={hora}
          onChangeText={setHora}
        />

        <TouchableOpacity style={styles.addButton} onPress={addEventToCalendar}>
          <Text style={styles.addButtonText}>Adicionar Compromisso </Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
      <FloatingAccessibilityButton/>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#45c2a8',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#e9e9e9',
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 10,
  },
  listView: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  appointmentDetails: {
    marginBottom: 20,
  },
  appointmentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  appointmentSubText: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 10,
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
  addButton: {
    backgroundColor: '#45c2a8',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#e9e9e9',
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  
});
