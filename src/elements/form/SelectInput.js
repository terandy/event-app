import React, { useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useTheme } from "react-native-paper";

const SelectInput = ({
  selectedValue,
  onValueChange,
  style,
  children,
  onOpen = () => {},
  disabled = false,
  options,
  ...rest
}) => {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: disabled ? colors.p5 : colors.p2,
          color: "white",
          position: "relative",
        },
        style,
      ]}
    >
      <Pressable
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 32,
            borderRadius: 7,
          },
        ]}
        onPress={() => {
          setIsOpen(!isOpen);
          onOpen();
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {selectedValue !== ""
            ? options.find((option) => option.value == selectedValue).label
            : "Recurring"}
        </Text>
      </Pressable>
      {!disabled &&
        isOpen &&
        options.map((option) => {
          return (
            <Pressable
              key={option.value}
              style={[
                {
                  backgroundColor:
                    selectedValue === option.value ? colors.p5 : colors.p2,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: 32,
                  borderRadius: 7,
                },
              ]}
              onPress={() => {
                onValueChange(option.value);
                setIsOpen(false);
              }}
            >
              <Text style={{ color: "white" }}>{option.label}</Text>
            </Pressable>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    width: 103,
  },
  option: { width: "100%", borderRadius: 7 },
});

export default SelectInput;
