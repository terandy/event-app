import React from 'react';
import { Text, StyleSheet } from 'react-native';

const fontSizes = { xsmall: 12, small: 14, medium: 18, large: 28 };
const marginSizes = { small: 0, medium: 0, large: 35 };

const Title = ({
  children,
  size = 'medium',
  color = 'black',
  noMargin,
  style
}) => {
  return (
    <Text
      style={[
        styles.title,
        {
          fontSize: fontSizes[size],
          marginTop: noMargin ? 0 : marginSizes[size],
          marginBottom: noMargin ? 0 : marginSizes[size],
          color
        },
        style
      ]}
    >
      {children}
    </Text>
  );
};
const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    textTransform: 'none'
  }
});

export default Title;
