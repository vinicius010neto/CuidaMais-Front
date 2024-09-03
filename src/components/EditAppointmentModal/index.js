import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, Animated } from 'react-native';

export default function EditAppointmentModal({ visible, appointment, onClose, onSave }) {
  const [title, setTitle] = useState(appointment.title);
  const [location, setLocation] = useState(appointment.location);
  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time);

  const fadeAnimContainer = useState(new Animated.Value(0))[0]; // Animação para o fundo preto
  const fadeAnimContent = useState(new Animated.Value(0))[0]; // Animação para o conteúdo do modal

  useEffect(() => {
    if (visible) {
      // Fade in para fundo preto e conteúdo do modal
      Animated.parallel([
        Animated.timing(fadeAnimContainer, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimContent, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Fade out para fundo preto e conteúdo do modal
      Animated.parallel([
        Animated.timing(fadeAnimContent, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimContainer, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleSave = () => {
    const updatedAppointment = {
      ...appointment,
      title,
      location,
      date,
      time,
    };
    onSave(updatedAppointment);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.modalContainer, { opacity: fadeAnimContainer }]}>
        <Animated.View style={[styles.modalContent, { opacity: fadeAnimContent }]}>
          <Text style={styles.modalHeader}>Editar Compromisso</Text>

          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Nome do compromisso"
          />
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Localização"
          />
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="Data (dd/mm/aaaa)"
          />
          <TextInput
            style={styles.input}
            value={time}
            onChangeText={setTime}
            placeholder="Hora (hh:mm)"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    opacity: 1,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#e9e9e9',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#45c2a8',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#de5246',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
