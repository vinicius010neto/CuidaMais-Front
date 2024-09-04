import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Footer from '../../components/footer';
import { useNavigation } from '@react-navigation/native';
import FloatingAccessibilityButton from '../../components/FloatingAccessibilityButton';

export default function ConfigsScreen() {
  const navigation = useNavigation();

  // Estados para armazenar os valores editáveis
  const [name, setName] = useState('Maria Oliveira');
  const [email, setEmail] = useState('maria.oliveira@exemplo.com');
  const [phone, setPhone] = useState('(11) 98765-4321');
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    navigation.navigate('Login'); // Redireciona para a tela de login
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Meu Perfil</Text>

        {/* Nome */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nome</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Digite seu nome"
            />
          ) : (
            <Text style={styles.value}>{name}</Text>
          )}
        </View>

        {/* Email */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>E-mail</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu email"
              keyboardType="email-address"
            />
          ) : (
            <Text style={styles.value}>{email}</Text>
          )}
        </View>

        {/* Telefone */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Telefone</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Digite seu telefone"
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.value}>{phone}</Text>
          )}
        </View>

        {/* Botão para alternar entre edição e visualização */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={styles.editButtonText}>{isEditing ? 'Salvar' : 'Editar'}</Text>
        </TouchableOpacity>

        {/* Botão de Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <FloatingAccessibilityButton/>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center',
    color: '#45c2a8',
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#45c2a8',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#45c2a8',
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#de5246',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
