import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

const PillButton = ({
  isActive = true,
  title,
  onPress,
  color,
  style,
  icon
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: color || colors.p1,
          opacity: isActive ? 1 : 0.25,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderRadius: 7,
          padding: 8
        },
        style
      ]}
    >
      {icon && <Icons name={icon} color={colors.w1} size={16} />}
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 14,
          marginHorizontal: 4
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default PillButton;
