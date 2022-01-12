import { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { useTheme } from 'react-native-paper';

import { AuthContext } from '../../context';
import {
  Title,
  TextInput,
  Button,
  IconButton,
  PillButton
} from '../../elements';
import { apiUpdateUser } from '../../firebase-api';
import { padding } from '../../theme';
// import { apiUpdateUser } from '../../firebase-api';
// import { AuthContext } from '../../context';

const AccountSettings = () => {
  const { colors } = useTheme();
  const { currentUser } = useContext(AuthContext);
  const { email, name } = currentUser;

  const [newName, setNewName] = useState(name);

  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (e) => {
    setNewName(e);
  };
  const handleSave = () => {
    apiUpdateUser({ name: newName })
      .then(() => setIsEditing(false))
      .catch((err) => console.log(err));
  };
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.margins}>
      <View style={styles.title}>
        <Title size="small" style={styles.title}>
          Display Name
        </Title>
        {!isEditing ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={{
                color: colors.p1
              }}
            >
              {name}
            </Text>
            <IconButton
              icon="pencil"
              onPress={() => {
                setIsEditing(true);
              }}
              color={colors.p1}
            />
          </View>
        ) : (
          <TextInput
            placeholder="edit name..."
            onChangeText={handleNameChange}
            value={newName}
          />
        )}
        {isEditing && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: padding.xsmall
            }}
          >
            <PillButton
              onPress={handleSave}
              title="Save"
              size="xsmall"
              style={{ marginRight: padding.medium }}
            />
            <PillButton
              onPress={handleCancel}
              title="Cancel"
              size="xsmall"
              style={{
                borderColor: colors.p1,
                borderWidth: 2,
                backgroundColor: colors.w1,
                color: colors.p1
              }}
            />
          </View>
        )}
      </View>
      <View style={styles.title}>
        <Title size="small">Email </Title>
        <Text style={{ color: colors.g1 }}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  margins: { paddingLeft: padding.xsmall, paddingRight: padding.xsmall },
  title: { marginBottom: padding.xsmall, marginTop: padding.xsmall }
});

export default AccountSettings;
