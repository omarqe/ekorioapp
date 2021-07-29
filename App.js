import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Container from "./components/Container"
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <Container>
        <StatusBar style="inverted" />
    </Container>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    },
    headingText: {
    fontSize: 16
    }
});
