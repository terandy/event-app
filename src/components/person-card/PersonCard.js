import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Title, Line } from '../../elements';
import { padding } from '../../theme';

const PersonCard = ({ displayName, title, description, image, style }) => {
  const { colors } = useTheme();
  return (
    <View style={[style]}>
      <View
        style={[
          {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 12
          }
        ]}
      >
        {image ? (
          <Image
            style={{
              width: 92,
              height: 92,
              borderRadius: 92 / 2,
              marginRight: padding.small
            }}
            source={{ uri: image }}
          />
        ) : (
          <View
            style={{
              width: 92,
              height: 92,
              borderRadius: 92 / 2,
              marginRight: padding.small,
              backgroundColor: colors.g2
            }}
          />
        )}
        <View style={{ flex: 1 }}>
          <Title style={{ marginBottom: 9 }}>{displayName}</Title>
          {title && (
            <Title size="small" style={{ marginBottom: 9, color: colors.p1 }}>
              {title}
            </Title>
          )}
        </View>
      </View>
      <Text>{description}</Text>
      <Line style={{ marginTop: 32 }} />
    </View>
  );
};

export default PersonCard;
