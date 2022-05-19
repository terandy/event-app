import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { Button } from "../../elements";
import { RS } from "../../strings";

const Landing = ({ navigation, route }) => {
  const { colors } = useTheme();
  const message = route.params?.message;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.p1,
        padding: 32,
      }}
    >
      {message && (
        <Text
          style={{
            color: colors.w1,
            fontSize: 24,
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          {message}
        </Text>
      )}
      <Button
        title="register"
        color={colors.p1}
        style={{
          backgroundColor: colors.p4,
          marginBottom: 28,
        }}
        onPress={() => {
          navigation.navigate(RS.register);
        }}
      />
      <Button
        title="login"
        color={colors.p1}
        style={{
          backgroundColor: colors.p4,
          marginBottom: 28,
        }}
        onPress={() => {
          navigation.navigate(RS.login);
        }}
      />
    </View>
  );
};

export default Landing;
