import React, { useState, useContext } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Image
} from 'react-native';
import { useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import {
  Title,
  Loading,
  Layout,
  Button,
  TextInput,
  PillButton,
  TabButton,
  SelectInput,
  IconButton,
  DateTimeInput
} from '../../elements';
import { apiCreateEvent } from '../../firebase-api';
import { padding } from '../../theme';
import { HATS, CITIES, HAT_COLORS, FREQUENCY_OPTIONS } from '../../data';
import { AuthContext } from '../../context';

const CreateEvent = ({ navigation }) => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const [date, setDate] = useState(new Date(Date.now()));
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const [location, setLocation] = useState();
  const [website, setWebsite] = useState();
  const [zoomLink, setZoomLink] = useState();
  const [time, setTime] = useState(new Date(Date.now()));
  const [cities, setCities] = useState([CITIES[0]]);
  const [hats, setHats] = useState([HATS[0]]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const handleHatPress = (e) => {
    if (hats.includes(e)) {
      setHats(hats.filter((city) => city != e));
    } else {
      setHats(hats.concat(e));
    }
  };

  const handleCityPress = (e) => {
    if (cities.includes(e)) {
      setCities(cities.filter((city) => city != e));
    } else {
      setCities(cities.concat(e));
    }
  };

  const saveEvent = async () => {
    const data = {
      description,
      title,
      location,
      website,
      zoomLink,
      cities,
      hats,
      frequency,
      creator: currentUser.id,
      isRecurring,
      dateTime: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      )
    };
    Object.keys(data).forEach((k) => data[k] == null && delete data[k]);
    setIsLoading(true);
    apiCreateEvent({
      data,
      image,
      callback: () => {
        setIsLoading(false);
        navigation.navigate('Home');
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout style={{ paddingHorizontal: 0, flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1
        }}
      >
        <ScrollView style={{ paddingHorizontal: padding.medium, flex: 1 }}>
          <View>
            <Title size="large">Create New Event</Title>
            <Title
              style={{ marginLeft: 12, marginBottom: 6, color: colors.g1 }}
              size="small"
            >
              Title
            </Title>
            <TextInput
              placeholder="write title..."
              onChangeText={(e) => setTitle(e)}
              value={title}
              style={{ marginBottom: 24, height: 48 }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12
              }}
            >
              <Title
                size="small"
                color={colors.g1}
                style={{ marginLeft: 12, marginRight: 24 }}
              >
                Date
              </Title>
              <DateTimeInput
                setValue={setDate}
                value={date}
                mode="date"
                style={{ flex: 1 }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12
              }}
            >
              <Title
                size="small"
                color={colors.g1}
                style={{ marginLeft: 12, marginRight: 24 }}
              >
                Time
              </Title>
              <DateTimeInput
                setValue={setTime}
                value={time}
                mode="time"
                style={{ flex: 1 }}
              />
            </View>
            <Title
              style={{
                marginLeft: 12,
                marginBottom: 6,
                marginTop: 16,
                color: colors.g1
              }}
              size="small"
            >
              Description
            </Title>
            <TextInput
              placeholder="write description..."
              onChangeText={(e) => setDescription(e)}
              value={description}
              multiline
              numberOfLines={8}
              style={{ marginBottom: 32 }}
            />
            <Title
              style={{ marginLeft: 12, marginBottom: 10, color: colors.g1 }}
              size="small"
            >
              External Links
            </Title>
            <TextInput
              placeholder="paste location url"
              onChangeText={(e) => setLocation(e)}
              value={location}
              rightIcon={'map-marker'}
              style={{
                marginBottom: 12
              }}
            />
            <TextInput
              placeholder="paste website url"
              onChangeText={(e) => setWebsite(e)}
              value={website}
              rightIcon={'web'}
              style={{
                marginBottom: 12
              }}
            />
            <TextInput
              placeholder="paste online meeting link"
              onChangeText={(e) => setZoomLink(e)}
              value={zoomLink}
              rightIcon={'link'}
              style={{
                marginBottom: 32
              }}
            />
            <Title
              size="small"
              color={colors.g1}
              style={{ marginLeft: 12, marginBottom: 6 }}
            >
              Cities
            </Title>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 24,
                marginLeft: 12
              }}
            >
              {CITIES.map((tab) => (
                <TabButton
                  key={tab}
                  title={tab}
                  isActive={cities.includes(tab)}
                  onPress={() => handleCityPress(tab)}
                  style={{ marginRight: 12 }}
                />
              ))}
            </View>
            <Title
              size="small"
              color={colors.g1}
              style={{ marginLeft: 12, marginBottom: 6 }}
            >
              Organisations
            </Title>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 24,
                marginLeft: 12
              }}
            >
              {HATS.map((hat) => (
                <PillButton
                  key={hat}
                  title={hat}
                  isActive={hats.includes(hat)}
                  onPress={() => handleHatPress(hat)}
                  color={colors[HAT_COLORS[hat]]}
                  style={{ marginRight: 12 }}
                />
              ))}
            </View>
            <Title
              size="small"
              color={colors.g1}
              style={{ marginBottom: 6, marginLeft: 12 }}
            >
              Frequency
            </Title>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 24,
                marginLeft: 12
              }}
            >
              <PillButton
                title="Recurring"
                onPress={() => {
                  setIsRecurring(true);
                  setFrequency(FREQUENCY_OPTIONS[1].value);
                }}
                color={isRecurring ? colors.p2 : colors.p3}
                style={{ marginRight: 24 }}
              />
              <PillButton
                title="Non-Recurring"
                onPress={() => {
                  setIsRecurring(false);
                  setFrequency(null);
                }}
                color={isRecurring ? colors.p3 : colors.p2}
                style={{ marginRight: 24 }}
              />
            </View>
            {isRecurring && (
              <View style={{ marginBottom: 24, marginLeft: 12 }}>
                <SelectInput
                  selectedValue={frequency}
                  onValueChange={(e) => {
                    setFrequency(e);
                  }}
                  style={{ width: '100%' }}
                  options={FREQUENCY_OPTIONS}
                />
              </View>
            )}
            <View
              style={{
                borderWidth: 2,
                flexDirection: 'row',
                padding: 12,
                borderRadius: 7,
                borderStyle: 'dashed',
                borderColor: colors.p3,
                marginBottom: 24
              }}
            >
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    height: 100,
                    width: 100
                  }}
                />
              )}
              <IconButton
                size="small"
                icon="upload"
                title={image ? 'Change Image' : 'Add Image'}
                onPress={pickImage}
                color={colors.p1}
                style={{ width: '100%' }}
              />
            </View>
            <Button
              title="Save Event"
              onPress={saveEvent}
              size="small"
              style={{
                backgroundColor: colors.t1,
                marginBottom: 20
              }}
            />
            <Button
              title="Cancel"
              onPress={() => navigation.navigate('Home')}
              size="small"
              color={colors.t1}
              style={{
                borderColor: colors.t1,
                borderWidth: 2,
                backgroundColor: colors.w1,
                marginBottom: 20
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default CreateEvent;