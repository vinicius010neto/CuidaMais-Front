import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, AccessibilityInfo, findNodeHandle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FloatingAccessibilityButton({ targetRef }) {
  const handlePress = () => {
    if (targetRef && targetRef.current) {
      const reactTag = findNodeHandle(targetRef.current);
      if (reactTag) {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
        AccessibilityInfo.announceForAccessibility('Lendo informações da tela...');
      }
    } else {
      AccessibilityInfo.announceForAccessibility('Nenhuma informação disponível.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress} accessible={true}>
        <Ionicons name="volume-medium-outline" size={24} color="white" />
        
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    zIndex: 1000,
  },
  button: {
    backgroundColor: '#45c2a8',
    borderRadius: 30,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
});
