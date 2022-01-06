import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';

const SelectButton = ({
  isActive = false,
  title,
  onPress,
  color,
  style,
  icon
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: color,
          opacity: isActive ? 1 : 0.25,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 7,
          flexDirection: 'row',
          padding: 8
        },
        style
      ]}
    >
      {icon && <Icons name={icon} color={'white'} size={16} />}
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

export default SelectButton;
