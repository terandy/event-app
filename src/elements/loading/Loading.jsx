import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Layout } from '../layout';

const Loading = () => {
  return (
    <Layout>
      <View style={[styles.page]}>
        <ActivityIndicator
          animating={true}
          size="large"
          style={{ opacity: 1 }}
          color="#999999"
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  page: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' }
});

export default Loading;
