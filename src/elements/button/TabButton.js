import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

const TabButton = ({
  isActive = false,
  title,
  onPress,
  color,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: isActive ? color || colors.p1 : colors.p3,
          alignItems: 'center',
          justifyContent: 'center',
          width: 46,
          height: 32,
          borderRadius: 7
        },
        style
      ]}
    >
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabButton;
