import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { TextInput, Button, Error } from '../../elements';
import { apiLogin, apiResetPassword } from '../../firebase-api';

const Login = () => {
  const { colors } = useTheme();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [rightIcon, setRightIcon] = useState('eye');
  const [positive, setPositive] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const handleSignIn = () => {
    if (email && password) {
      apiLogin({ email, password }).catch((error) => setError(error.message));
    }
  };

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handlePress = () => {
    if (email) {
      try {
        apiResetPassword({ email })
          .then(() => {
            setPositive(true);
            setError(
              'We sent you an email to update your password! Ignore it, if you no longer wish to reset you password.'
            );
          })
          .catch((error) => {
            setError(error.message);
          });
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError('Must input email');
    }
  };

  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.g2
      }}
    >
      <TextInput
        leftIcon="email"
        placeholder="Enter email"
        style={{ marginBottom: 12 }}
        onChangeText={(e) => setEmail(e)}
        autoFocus={true}
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
      {error && (
        <Error
          style={{ marginBottom: 32 }}
          message={error}
          positive={positive}
        />
      )}
      <Button
        title="Login"
        size="small"
        onPress={handleSignIn}
        disabled={!email | !password}
      />
      <Button
        title="Forgot Password?"
        onPress={handlePress}
        style={{ backgroundColor: 'none' }}
        size="small"
      />
    </View>
  );
};

export default Login;
