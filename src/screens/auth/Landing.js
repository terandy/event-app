import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Button } from '../../elements';

const Landing = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.p1,
        padding: 32
      }}
    >
      <Button
        title="register"
        color={colors.p1}
        style={{
          backgroundColor: colors.p4,
          marginBottom: 28
        }}
        onPress={() => {
          navigation.navigate('Register');
        }}
      />
      <Button
        title="login"
        color={colors.p1}
        style={{
          backgroundColor: colors.p4,
          marginBottom: 28
        }}
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

export default Landing;
