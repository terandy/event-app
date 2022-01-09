import React from 'react';
import { TouchableOpacity, Text, Platform, View } from 'react-native';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

const Content = ({ icon, title }) => {
  return (
    <>
      {icon && <Icons name={icon} color={colors.w1} size={16} />}
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: Platform.OS === 'ios' ? 18 : 14,
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
          padding: Platform.OS === 'ios' ? 8 : 6
        },
        style
      ]}
    >
      <Content title={title} icon={icon} />
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
          padding: Platform.OS === 'ios' ? 8 : 6
        },
        style
      ]}
    >
      <Content title={title} icon={icon} />
    </TouchableOpacity>
  );
};

export default PillButton;
