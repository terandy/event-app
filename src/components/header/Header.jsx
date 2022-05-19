import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { IconButton } from "../../elements";
import CityFilter from "./CityFilter";
import { padding } from "../../theme";
import { RS } from "../../strings";

const Header = ({ openDrawer, state, navigation, showMenuButton }) => {
  const isDarkBackground = state.routeNames[state.index] === RS.landing;

  const { colors } = useTheme();
  return (
    <View style={style.container}>
      {state.index === 0 ? (
        <CityFilter />
      ) : (
        <IconButton
          icon="home"
          size="medium"
          onPress={() => navigation.navigate("Home")}
          color={isDarkBackground ? colors.w1 : colors.p1}
          style={{ marginLeft: -8 }}
        />
      )}
      {showMenuButton && (
        <IconButton
          icon="menu"
          size="medium"
          onPress={openDrawer}
          color={isDarkBackground ? colors.w1 : colors.p1}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: padding.medium,
  },
});

export default Header;
