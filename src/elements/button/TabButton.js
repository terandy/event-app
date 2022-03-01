import React from 'react';
import { TouchableOpacity, Text, Platform } from 'react-native';
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
          borderRadius: 7
        },
        style
      ]}
    >
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: Platform.OS === 'ios' ? 16 : 14,
          marginHorizontal: 8,
          marginVertical: Platform.OS === 'ios' ? 8 : 6
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TabButton;
