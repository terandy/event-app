import React from 'react';
import { View, Text } from 'react-native';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

const Error = ({ message, style, ...props }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        {
          width: '100%',
          borderColor: colors.r2,
          borderWidth: 1,
          backgroundColor: colors.g3,
          borderRadius: 7,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 8,
          paddingLeft: 24,
          paddingRight: 8
        },
        style
      ]}
    >
      <Icons name={'alert'} color={'black'} size={16} />
      <Text
        style={{
          color: 'black',
          fontSize: 14,
          marginLeft: 14
        }}
      >
        Oops! {message}
      </Text>
    </View>
  );
};

export default Error;
