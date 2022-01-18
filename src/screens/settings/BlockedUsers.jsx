import { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useEffect } from 'react/cjs/react.development';

import { AuthContext } from '../../context';
import { IconButton } from '../../elements';
import { fetchUsers, apiUnblockUser } from '../../firebase-api';

const BlockedUsers = () => {
  const { colors } = useTheme();
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState(null);
  const [blockedUsers, setBlockedUsers] = useState(null);
  useEffect(() => {
    let unsubscribe = () => {};
    const getUsers = async () => {
      try {
        unsubscribe = await fetchUsers(
          (snapshot) => {
            if (snapshot.size) {
              let users = snapshot.docs.map((doc) => doc.data());
              setUsers(users);
            }
          },
          (err) => {
            setUsers(null);
            console.log(err);
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();

    return () => {
      setUsers(null);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (users && currentUser && currentUser.blockedUsers) {
      const blockedUsers = currentUser.blockedUsers.map((userId) => {
        const user = users.find((usr) => usr.id === userId);
        return user;
      });
      setBlockedUsers(blockedUsers);
    }
  }, [users, currentUser]);

  if (blockedUsers && blockedUsers.length > 0) {
    return (
      <View>
        {blockedUsers.map((user, index) => {
          return (
            <View
              key={user ? user.id : index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16
              }}
            >
              <Text>{user?.name}</Text>
              <IconButton
                onPress={() => apiUnblockUser({ userId: user?.id })}
                icon="close"
                size={16}
                color={colors.p1}
              />
            </View>
          );
        })}
      </View>
    );
  }
  return <View></View>;
};

export default BlockedUsers;
