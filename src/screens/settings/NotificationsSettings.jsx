import { useContext } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { AuthContext } from '../../context';
import { Title, PillButton, SelectInput } from '../../elements';
import { CITIES, HAT_COLORS, HATS, REMINDER_TIMES } from '../../data';
import { padding } from '../../theme';
import { apiUpdateSettings } from '../../firebase-api';
import { updateCalendarTimes } from '../../utils';

const NotificationsSettings = () => {
  const { currentUser } = useContext(AuthContext);
  const { colors } = useTheme();

  const {
    settings: { hats, cities, reminderTime, isEnabled }
  } = currentUser;

  const handleHatPress = (e) => {
    let newHats = [];
    if (hats.includes(e)) {
      newHats = hats.filter((hat) => hat != e);
    } else {
      newHats = hats.concat(e);
    }
    apiUpdateSettings({ hats: newHats });
  };
  const handleCityPress = (e) => {
    let newCities = [];
    if (cities.includes(e)) {
      newCities = cities.filter((city) => city != e);
    } else {
      newCities = cities.concat(e);
    }
    apiUpdateSettings({ cities: newCities });
  };
  const handleReminderTimePress = (e) => {
    apiUpdateSettings({ reminderTime: e });
    updateCalendarTimes(currentUser, e);
  };
  const toggleSwitch = (value) => {
    apiUpdateSettings({ isEnabled: !isEnabled });
  };
  return (
    <View style={styles.margins}>
      <View style={[styles.row]}>
        <Switch
          trackColor={{ false: colors.p3, true: colors.gr }}
          thumbColor={colors.w1}
          ios_backgroundColor={colors.p3}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.gap}
        />
        <Text>{isEnabled ? 'On' : 'Off'}</Text>
      </View>
      <View style={[styles.title]}>
        <Title size="small" style={[styles.title]}>
          Be notified for
        </Title>
        <View style={[styles.row, styles.space]}>
          {CITIES.map((city) => (
            <PillButton
              key={city}
              title={city}
              isActive={cities?.includes(city)}
              onPress={() => handleCityPress(city)}
              color={colors.p1}
              style={styles.gap}
            />
          ))}
        </View>
        <View style={styles.row}>
          {HATS.map((hat) => (
            <PillButton
              key={hat}
              title={hat}
              isActive={hats?.includes(hat)}
              onPress={() => handleHatPress(hat)}
              color={colors[HAT_COLORS[hat]]}
              style={styles.gap}
            />
          ))}
        </View>
      </View>
      <View>
        <Title size="small" style={[styles.title]}>
          Be notified
        </Title>
        <SelectInput
          selectedValue={reminderTime}
          onValueChange={(e) => handleReminderTimePress(e)}
          options={REMINDER_TIMES}
          style={styles.input}
        />
        <Title size="small" style={[styles.title]}>
          before the event
        </Title>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gap: { marginRight: padding.xsmall },
  row: { flexDirection: 'row', alignItems: 'center' },
  title: { marginBottom: padding.xsmall, marginTop: padding.xsmall },
  space: { marginBottom: padding.xsmall },
  input: { width: '100%' },
  margins: { paddingLeft: padding.xsmall, paddingRight: padding.xsmall }
});

export default NotificationsSettings;
