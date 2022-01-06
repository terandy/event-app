import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';

const iconSize = { small: 26, medium: 32 };

const IconButton = ({ onPress, icon, color, title, style, size = 'small' }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          padding: 8,
          flexDirection: 'row',
          alignItems: 'center'
        },
        style
      ]}
    >
      <Icons name={icon} color={color} size={iconSize[size]} />
      {title && (
        <Text style={{ color, marginLeft: 6, fontWeight: 'bold' }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;
