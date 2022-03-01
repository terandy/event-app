import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { IconButton } from '../../elements';
import CityFilter from './CityFilter';
import { padding } from '../../theme';

const Header = ({ openDrawer, state, navigation }) => {
  const { colors } = useTheme();
  return (
    <View style={style.container}>
      {state.index === 0 ? (
        <CityFilter />
      ) : (
        <IconButton
          icon="home"
          size="medium"
          onPress={() => navigation.navigate('Home')}
          color={colors.p1}
          style={{ marginLeft: -8 }}
        />
      )}
      <IconButton
        icon="menu"
        size="medium"
        onPress={openDrawer}
        color={colors.p1}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.medium
  }
});

export default Header;
