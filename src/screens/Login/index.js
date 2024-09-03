import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Login() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Login"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>

      {/* Botão de Logar com Google */}
      <TouchableOpacity style={styles.googleButton}>
        <FontAwesome name="google" size={20} color="#fff" />
        <Text style={styles.googleButtonText}>Logar com Google</Text>
      </TouchableOpacity>

      {/* Botão de Cadastro */}
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Cadastre-se</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Cuida +</Text>
      <Text style={styles.helpText}>Precisa de Ajuda?</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 40,
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
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#45c2a8',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#de5246',
    borderRadius: 15,
    marginTop: 10,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  registerButton: {
    marginTop: 20,
  },
  registerButtonText: {
    color: '#45c2a8',
    fontSize: 16,
  },
  footerText: {
    color: '#45c2a8',
    fontSize: 16,
    marginTop: 50,
  },
  helpText: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 5,
  },
});
