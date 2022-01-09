import React from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icons from '@expo/vector-icons/MaterialCommunityIcons';

const TextInputStyled = ({
  navigation,
  route,
  onChangeText,
  placeholder = 'write something..',
  style,
  leftIcon,
  rightIcon,
  handlePasswordVisibility,
  numberOfLines,
  ...rest
}) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.p4 }, style]}>
      {leftIcon && (
        <Icons
          name={leftIcon}
          color={colors.p1}
          size={20}
          style={{ marginRight: 10 }}
        />
      )}
      <TextInput
        {...rest}
        placeholder={placeholder}
        onChangeText={onChangeText}
        numberOfLines={numberOfLines}
        style={[{ width: '100%', textAlignVertical: 'top' }]}
      />
      {rightIcon && (
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <Icons
            name={rightIcon}
            color={colors.p1}
            size={20}
            style={{ alignSelf: 'center', marginLeft: 10 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 13,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default TextInputStyled;
