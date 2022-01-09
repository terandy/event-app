import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { ICON_SIZE } from '../../data';

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
      <Icons name={icon} color={color} size={ICON_SIZE[size]} />
      {title && (
        <Text style={{ color, marginLeft: 6, fontWeight: 'bold' }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;
