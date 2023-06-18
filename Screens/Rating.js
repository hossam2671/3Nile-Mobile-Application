import React, { useState } from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';

const RatingSlider = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rate:</Text>
      <Slider
        style={styles.slider}
        value={rating}
        minimumValue={0}
        maximumValue={5}
        step={0.5}
        onValueChange={handleRatingChange}
      />
      <Text style={styles.rating}>{rating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  slider: {
    width: '80%',
  },
  rating: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default RatingSlider;
