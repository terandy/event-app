import React, { useState } from 'react';
import { View, Platform, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from 'react-native-paper';

import { formatTime, formatDate } from '../../utils';

const DateTimeInput = ({ value, setValue, mode, style }) => {
  const { colors } = useTheme();
  const [show, setShow] = useState(Platform.OS === 'ios');
  const displayValue = mode === 'date' ? formatDate(value) : formatTime(value);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    if (Platform.OS === 'android') {
      setShow(false);
    }
    setValue(currentDate);
  };

  return (
    <View
      style={[
        { position: 'relative', flexDirection: 'row', alignItems: 'center' },
        style
      ]}
    >
      <Pressable
        style={{
          backgroundColor: colors.p4,
          borderRadius: 13,
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 5,
          paddingBottom: 5
        }}
        onPress={() => setShow(true)}
      >
        <Text>{displayValue}</Text>
      </Pressable>
      {show && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: Platform.OS === 'android' ? 1 : 0
          }}
        >
          <DateTimePicker
            testID="dateTimePicker"
            value={value}
            mode={mode}
            onChange={onChange}
            style={{
              width: mode === 'date' ? 110 : 70,
              height: 24,
              margin: 0,
              padding: 0
            }}
          />
        </View>
      )}
    </View>
  );
};

export default DateTimeInput;
