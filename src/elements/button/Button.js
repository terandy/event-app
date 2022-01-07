import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

const sizes = {
  medium: { height: 52, fontSize: 27, padding: 12 },
  small: { height: 32, fontSize: 18, padding: 8 },
  xsmall: { height: 24, fontSize: 14 }
};

const Button = ({
  onPress,
  title,
  color = 'white',
  size = 'medium',
  style,
  disabled
}) => {
  const { colors } = useTheme();
  const { fontSize } = sizes[size];
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          backgroundColor: colors.p1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 36.5,
          width: '100%',
          padding: sizes[size].padding
        },
        style
      ]}
    >
      <Text
        style={{
          color,
          fontWeight: 'bold',
          fontSize,
          opacity: disabled ? 0.5 : 1
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
