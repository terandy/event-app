import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Title, Layout, Button } from '../../elements';
import { fetchUser, apiBlockUser } from '../../firebase-api';
import { padding } from '../../theme';

const BlockUser = ({ navigation, route }) => {
  const userId = route.params?.userId;
  const { colors } = useTheme();
  const [user, setUser] = useState(null);
  useEffect(() => {
    let unsubscribe = () => {};
    const getUser = async () => {
      try {
        unsubscribe = await fetchUser(
          { userId },
          (doc) => {
            setUser(doc.data() ? doc.data() : null);
          },
          (err) => {
            setUser(null);
            console.log(err);
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    getUser();

    return () => {
      setUser(null);
      unsubscribe();
    };
  }, []);

  const blockUser = () => {
    apiBlockUser({ user }).then((res) => navigation.navigate('Home'));
  };
  if (user) {
    return (
      <Layout>
        <View style={{ paddingHorizontal: padding.medium }}>
          <Title size="large">Block User</Title>
          <Text>
            You are about to Block{' '}
            <Text style={{ color: colors.p1, fontWeight: 'bold' }}>
              {user.name}
            </Text>
          </Text>
          <Text style={{ marginBottom: 32 }}>
            You will no longer see the user's comments or events.
          </Text>
          <Button size="small" title="Block" onPress={blockUser} />
          <Text style={{ marginTop: 32 }}>
            Please report the user if they are posting inapropriate content, by
            sending an email to
          </Text>
          <Text
            selectable={true}
            style={{ color: colors.p1, fontWeight: 'bold' }}
          >
            teresa.s.lacroix@gmail.com
          </Text>
          <Text>
            Make sure to include this following id, to identify the user:
          </Text>
          <Text
            selectable={true}
            style={{ color: colors.p1, fontWeight: 'bold' }}
          >
            {user.id}
          </Text>
        </View>
      </Layout>
    );
  } else return null;
};

export default BlockUser;
