import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default function MiComponente() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log("arranco el componente")
    return () => {
      console.log("murió el componente")
    }
  }, [])

  useEffect(() => {
    console.log("entro a useEffect")
    return () => {
      console.log("libero memoria del useEffect")
    }
  })

  return (
    <View style={styles.container} >
      <Text>Hola Mundo  {contador}  </Text>
      <Button onPress={() => {
        setContador(contador + 1)
      }} title="Button" />
    </View>
  )
}
