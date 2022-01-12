import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Title, IconButton } from '../../elements';
import { padding } from '../../theme';

const Accordion = ({ title, children, style }) => {
  const { colors } = useTheme();
  const [show, setShow] = useState(false);

  return (
    <View style={{ marginBottom: padding.xsmall, marginTop: padding.xsmall }}>
      <Pressable
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center'
        }}
        onPress={() => {
          setShow(!show);
        }}
      >
        <Title>{title}</Title>
        <IconButton
          icon={show ? 'chevron-down' : 'chevron-right'}
          color={colors.g1}
          onPress={() => {
            setShow(!show);
          }}
        />
      </Pressable>
      {show && children}
    </View>
  );
};

export default Accordion;
