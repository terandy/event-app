import { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { TabButton } from '../../elements';
import { CITIES } from '../../data';
import { AuthContext } from '../../context';

const CityFilter = () => {
  const { selectedCity, setSelectedCity } = useContext(AuthContext);

  const handleCityPress = (city) => {
    setSelectedCity(city);
  };

  return (
    <View style={style.container}>
      {CITIES.map((city) => (
        <TabButton
          key={city}
          title={city}
          style={style.gap}
          isActive={selectedCity === city}
          onPress={() => handleCityPress(city)}
        />
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  gap: { marginRight: 12 }
});
export default CityFilter;
