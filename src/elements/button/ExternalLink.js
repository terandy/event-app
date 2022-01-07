import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';

const sizes = {
  medium: { height: 24, fontSize: 18, padding: 12 },
  small: { height: 18, fontSize: 16, padding: 8 },
  xsmall: { height: 16, fontSize: 12 }
};

const ExternalLink = ({
  onPress,
  title,
  color = 'white',
  size = 'medium',
  style,
  disabled,
  icon = 'link'
}) => {
  const { colors } = useTheme();
  const { fontSize } = sizes[size];
  const truncatedTitle = title.length > 32 ? `${title.slice(0, 30)}...` : title;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: colors.p1,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 12,
          width: '100%',
          padding: sizes[size].padding,
          borderRadius: 36.5
        },
        style
      ]}
    >
      <Icons
        name={icon}
        color={color}
        size={sizes[size].height}
        style={{ marginRight: 12, marginLeft: 6 }}
      />
      <Text style={{ color: disabled ? colors.p2 : color, fontSize }}>
        {truncatedTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default ExternalLink;
