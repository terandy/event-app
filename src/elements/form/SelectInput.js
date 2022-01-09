import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableOpacity
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';

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
          color: 'white'
        },
        style
      ]}
    >
      <Pressable
        style={[
          {
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderRadius: 7,
            paddingVertical: 8,
            flexDirection: 'row'
          }
        ]}
        onPress={() => {
          onOpen();
          setIsOpen(!isOpen);
        }}
      >
        <Text
          style={{ color: 'white', fontWeight: 'bold', paddingHorizontal: 12 }}
        >
          {selectedValue !== ''
            ? options.find((option) => option.value == selectedValue).label
            : 'Select frequency...'}
        </Text>
        <Icons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          color={colors.w1}
          size={20}
          style={{ alignSelf: 'center', marginRight: 12 }}
        />
      </Pressable>
      {!disabled &&
        isOpen &&
        options.map((option) => {
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                {
                  backgroundColor:
                    selectedValue === option.value ? colors.p5 : colors.p2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: 32,
                  borderRadius: 7,
                  marginBottom: 6
                }
              ]}
              onPress={() => {
                onValueChange(option.value);
                setIsOpen(false);
              }}
            >
              <Text
                style={{
                  color: 'white',
                  paddingHorizontal: 12
                }}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 7,
    width: 103
  },
  option: { width: '100%', borderRadius: 7 }
});

export default SelectInput;
