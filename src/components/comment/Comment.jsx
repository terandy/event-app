import React from 'react';
import { useTheme } from 'react-native-paper';
import { View, Text } from 'react-native';

import { Title, Card } from '../../elements';

const Comment = ({ comment }) => {
  const { colors } = useTheme();
  const { user, comment: content, ...rest } = comment;
  return (
    <Card bg={colors.p4} size="small" {...rest}>
      <View>
        <Title size="small" style={{ marginBottom: 5 }}>
          {user}
        </Title>
        <Text style={{ color: colors.g1 }}>{content}</Text>
      </View>
    </Card>
  );
};

export default Comment;
