import { useContext } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { AuthContext } from '../../context';
import { IconButton } from '../../elements';
import { apiUnblockUser } from '../../firebase-api';

const BlockedUsers = () => {
  const { colors } = useTheme();
  const { blockedUsers } = useContext(AuthContext);

  if (!blockedUsers) {
    return <View></View>;
  }

  return (
    <View>
      {blockedUsers.map((user) => {
        return (
          <View
            key={user.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16
            }}
          >
            <Text>{user.name}</Text>
            <IconButton
              onPress={() => apiUnblockUser({ userId: user.id })}
              icon="close"
              size={16}
              color={colors.p1}
            />
          </View>
        );
      })}
    </View>
  );
};

export default BlockedUsers;
