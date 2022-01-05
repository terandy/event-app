import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HEADER_HEIGHT } from '../navigator/my-navigator/Drawer';

const Layout = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ width: '100%', height: HEADER_HEIGHT }} />
      {children}
    </SafeAreaView>
  );
};

export default Layout;
