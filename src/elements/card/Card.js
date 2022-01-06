import React from 'react';
import { View } from 'react-native';

const sizes = { small: { px: 15, py: 15 }, medium: { px: 18, py: 18 } };

const Card = ({ children, bg, size = 'medium' }) => {
  const { px, py } = sizes[size];
  return (
    <View
      style={{
        backgroundColor: bg,
        borderRadius: 18,
        paddingLeft: px,
        paddingRight: px,
        paddingTop: py,
        paddingBottom: py
      }}
    >
      {children}
    </View>
  );
};

export default Card;
