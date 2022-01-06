import React from 'react';

import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

const sizes = {
  medium: { height: 1 },
  small: { height: 0.5 }
};

const Line = ({ size = 'medium', color, style, ...props }) => {
  const { colors } = useTheme();
  const { height } = sizes[size];
  return (
    <View
      style={[
        {
          height,
          backgroundColor: color || colors.g3,
          width: '100%'
        },
        style
      ]}
      {...props}
    ></View>
  );
};

export default Line;
