import React, { useState, useCallback } from "react";
import { Text, View, KeyboardAvoidingView, Platform } from "react-native";
import Checkbox from "expo-checkbox";
import { useTheme } from "react-native-paper";

import { TextInput, Button, Error } from "../../elements";
import { apiRegister } from "../../firebase-api";

const Register = ({ navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState();
  const [rightIcon, setRightIcon] = useState("eye");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [eulaStatus, setEulaStatus] = useState(false);

  const handleSignUp = useCallback(async () => {
    if (email && name && password) {
      apiRegister({ email, password, name, navigation }).catch((err) => {
        setError(err.toString());
      });
    }
  }, [email, password, name]);

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        backgroundColor: colors.g2,
        padding: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        style={{ marginBottom: 16 }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <Checkbox
          value={eulaStatus}
          onValueChange={() => setEulaStatus(!eulaStatus)}
          color={eulaStatus ? colors.p1 : undefined}
          style={{ marginRight: 8 }}
        />
        <Text>
          Agree to{" "}
          <Text
            onPress={() => navigation.navigate("Eula")}
            style={{ color: colors.p1, textDecorationLine: "underline" }}
          >
            Terms and Conditions
          </Text>
        </Text>
      </View>
      {error && <Error message={error} style={{ marginBottom: 32 }} />}
      <Button
        title="Sign up"
        size="small"
        onPress={handleSignUp}
        disabled={!email | !password | !name | !eulaStatus}
      />
    </KeyboardAvoidingView>
  );
};

export default Register;
