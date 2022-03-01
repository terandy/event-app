import React from 'react';
import { View, Text } from 'react-native';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import { padding } from '../../theme';

const Error = ({ message, style, positive, ...props }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        {
          width: '100%',
          borderColor: positive ? colors.t1 : colors.r2,
          borderWidth: 1,
          backgroundColor: colors.g3,
          borderRadius: 7,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: padding.small
        },
        style
      ]}
    >
      {!positive && <Icons name={'alert'} color={'black'} size={16} />}
      <Text
        style={{
          color: 'black',
          fontSize: 14,
          marginLeft: 14,
          flexWrap: 'wrap'
        }}
      >
        {!positive ? `Oops! ${message}` : message}
      </Text>
    </View>
  );
};

export default Error;
