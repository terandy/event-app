import React from 'react';
import { TouchableOpacity, Text, Platform, View } from 'react-native';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

const Content = ({ icon, title, color }) => {
  return (
    <>
      {icon && <Icons name={icon} color={colors.w1} size={16} />}
      <Text
        style={{
          color: color || 'white',
          fontWeight: 'bold',
          fontSize: 14,
          marginHorizontal: 8
        }}
      >
        {title}
      </Text>
    </>
  );
};

const PillButton = ({
  isActive = true,
  title,
  onPress,
  color,
  style,
  icon,
  disable = false
}) => {
  const { colors } = useTheme();
  return disable ? (
    <View
      style={[
        {
          backgroundColor: isActive ? color || colors.p1 : colors.p3,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderRadius: 7,
          padding: 6
        },
        style
      ]}
    >
      <Content title={title} icon={icon} color={style.color} />
    </View>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: isActive ? color || colors.p1 : colors.p3,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderRadius: 7,
          padding: 6
        },
        style
      ]}
    >
      <Content title={title} icon={icon} color={style.color} />
    </TouchableOpacity>
  );
};

export default PillButton;
