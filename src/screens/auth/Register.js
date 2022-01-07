import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { TextInput, Button, Error } from '../../elements';
import { apiRegister } from '../../firebase-api';

const Register = () => {
  const { colors } = useTheme();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState();
  const [rightIcon, setRightIcon] = useState('eye');
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const handleSignUp = useCallback(async () => {
    if (email && name && password) {
      apiRegister({ email, password, name }).catch((err) => {
        setError(err.toString());
      });
    }
  }, [email, password, name]);

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.g2
      }}
    >
      <TextInput
        style={{ marginBottom: 20 }}
        leftIcon="account"
        placeholder="Enter display name"
        onChangeText={(e) => setName(e)}
        autoFocus={true}
      />
      <TextInput
        leftIcon="email"
        style={{ marginBottom: 20 }}
        placeholder="Enter email"
        onChangeText={(e) => setEmail(e)}
        autoCapitalize="none"
      />
      <TextInput
        leftIcon="lock"
        rightIcon={rightIcon}
        secureTextEntry={passwordVisibility}
        handlePasswordVisibility={handlePasswordVisibility}
        placeholder="Enter password"
        onChangeText={(e) => setPassword(e)}
        autoCapitalize="none"
        style={{ marginBottom: 32 }}
      />
      {error && <Error message={error} style={{ marginBottom: 32 }} />}
      <Button
        title="Sign up"
        size="small"
        onPress={handleSignUp}
        disabled={!email | !password | !name}
      />
    </View>
  );
};

export default Register;
