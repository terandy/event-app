import React from 'react';
import { ScrollView, Platform } from 'react-native';

import { Title, Layout, Line } from '../../elements';
import { Accordion } from '../../components';
import NotificationsSettings from './NotificationsSettings';
import AcccountSettings from './AccountSettings';
import { padding } from '../../theme';

const Settings = () => {
  return (
    <Layout>
      <ScrollView
        style={{
          paddingHorizontal: padding.medium,
          flex: 1
        }}
      >
        <Title size="large">Settings</Title>
        <Line />
        <Accordion title="Account">
          <AcccountSettings />
        </Accordion>
        <Line />
        <Accordion title="Notifications">
          <NotificationsSettings />
        </Accordion>
        <Line />
      </ScrollView>
    </Layout>
  );
};

export default Settings;
