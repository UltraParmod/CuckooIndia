import React, {useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Loader = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    isLoading && (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Loader;
