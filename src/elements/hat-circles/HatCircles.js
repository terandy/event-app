import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { HAT_COLORS, HATS } from '../../data';

const Circle = ({ color, style, show }) => {
  return (
    <View
      style={[
        {
          backgroundColor: color,
          height: 7,
          width: 7,
          borderRadius: 3.5,
          opacity: show ? 1 : 0
        },
        style
      ]}
    />
  );
};
const HatCircles = ({ hats, alternate = false }) => {
  const { colors } = useTheme();
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 2
        }}
      >
        <Circle
          color={alternate ? colors.p2 : colors[HAT_COLORS[HATS[0]]]}
          show={hats.includes(HATS[0])}
          style={{ marginRight: 2 }}
        />
        <Circle
          color={colors[HAT_COLORS[HATS[1]]]}
          show={hats.includes(HATS[1])}
        />
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 2 }}>
        <Circle
          color={colors[HAT_COLORS[HATS[2]]]}
          show={hats.includes(HATS[2])}
          style={{ marginRight: 2 }}
        />
        <Circle
          color={colors[HAT_COLORS[HATS[3]]]}
          show={hats.includes(HATS[3])}
        />
      </View>
    </View>
  );
};

export default HatCircles;
