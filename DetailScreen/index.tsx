import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

interface Props {

}

export default function DetailScreen(props: Props) {
  return (
    <View style={styles.container} >
      <Text>Texto brujo</Text>
    </View>
  )
}
