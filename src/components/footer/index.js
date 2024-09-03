// components/Footer.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation(); // Obtém o objeto navigation

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={24} color="#45c2a8" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
        <FontAwesome name="calendar" size={24} color="#45c2a8" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Configs')}>
        <Ionicons name="settings-outline" size={24} color="#45c2a8" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9e9e9',
  },
});

export default Footer;
