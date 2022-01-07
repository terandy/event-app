import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loading = ({ color }) => {
  return (
    <View style={[styles.page, { backgroundColor: color }]}>
      <ActivityIndicator
        animating={true}
        size="large"
        style={{ opacity: 1 }}
        color="#999999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' }
});

export default Loading;
