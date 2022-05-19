// TODO: [LATER] Form validation (npm install 'react-native-form-validator' --save)

import React, { useContext, useState, useEffect } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
} from "react-native";
import { useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

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
  DateTimeInput,
} from "../../elements";
import {
  apiUploadImage,
  apiUpdateEvent,
  fetchEvent,
  apiDeleteImage,
} from "../../firebase-api";
import { padding } from "../../theme";
import { HATS, CITIES, HAT_COLORS, FREQUENCY_OPTIONS } from "../../data";
import { AuthContext } from "../../context";
import { handleUpdateEvent } from "../../utils";
import { RS } from "../../strings";

const EditEvent = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState(null);

  const id = route.params?.id;

  // const [date, setDate] = useState(new Date(Date.now()));
  // const [time, setTime] = useState(new Date(Date.now()));
  const [startDateTime, setStartDateTime] = useState(new Date(Date.now()));
  const [endDateTime, setEndDateTime] = useState(new Date(Date.now()));
  const [description, setDescription] = useState(event?.description ?? "");
  const [title, setTitle] = useState(event?.title ?? "");
  const [location, setLocation] = useState(event?.location);
  const [website, setWebsite] = useState(event?.website);
  const [zoomLink, setZoomLink] = useState(event?.zoomLink);
  const [cities, setCities] = useState(event?.cities ?? [CITIES[0]]);
  const [hats, setHats] = useState(event?.hats ?? ["YSP"]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [isMultiday, setIsMultiday] = useState(event?.isMultiday ?? false);
  const [frequency, setFrequency] = useState(event?.frequency);
  const [image, setImage] = useState();
  const [hasImageChanged, setHasImageChanged] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setHasImageChanged(true);
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
      cities,
      hats,
      isRecurring,
      startDateTime,
      endDateTime,
      ...(isRecurring && {
        frequency,
      }),
      ...(location && {
        location,
      }),
      ...(website && {
        website,
      }),
      ...(zoomLink && {
        zoomLink,
      }),
    };
    Object.keys(data).forEach((k) => data[k] == null && delete data[k]);
    setIsLoading(true);
    await apiUpdateEvent({ id: event.id, data });
    if (image && hasImageChanged) {
      if (event.image)
        apiDeleteImage({ imageUrl: event.image }).catch((err) =>
          console.log(err)
        );
      apiUploadImage({
        eventId: event.id,
        image,
        callback: () => {
          setIsLoading(false);
          navigation.navigate(RS.event, { id: event.id });
        },
      });
    } else {
      setIsLoading(false);
      navigation.navigate(RS.event, { id: event.id });
    }
    if (event.users?.includes(currentUser.id)) {
      handleUpdateEvent(currentUser, {
        id: event.id,
        title,
        // TODO: [LATER] Delete "dateTime" after full migration to the new structure
        dateTime: new Date(startDateTime),
        startDateTime: new Date(startDateTime),
        isMultiday,
        description,
        isRecurring,
        users: event.users,
        messages: event.messages,
        // Add endDateTime to the object only if multiple days is enabled.
        ...(isMultiday && {
          endDateTime,
        }),
        // Add frequency to the object only if isRecurring is enabled.
        ...(isRecurring && {
          frequency,
        }),
        ...(location && {
          location,
        }),
        ...(website && {
          website,
        }),
        ...(zoomLink && {
          zoomLink,
        }),
      });
    }
  };

  useEffect(() => {
    console.log("id useEffect");
    if (id) {
      let unsubscribe = () => {};
      const callback = async () => {
        unsubscribe = await fetchEvent(
          { id },
          (doc) => {
            if (doc.data()) {
              setEvent(doc.data());
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          },
          (err) => {
            console.log(err);
            setIsLoading(false);
          }
        );
      };
      callback();
      return () => unsubscribe();
    }
  }, [id]);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStartDateTime(event.startDateTime?.toDate());
      setEndDateTime(event.endDateTime?.toDate());
      setIsMultiday(event.isMultiday);
      setDescription(event.description);
      setLocation(event.location);
      setZoomLink(event.zoomLink);
      setWebsite(event.website);
      setImage(event.imageUrl);
      setHats(event.hats);
      setCities(event.cities);
      setIsRecurring(event.isRecurring);
      setFrequency(event.frequency);
    }
  }, [event]);

  if (isLoading) {
    return <Loading />;
  }

  const renderEndDateColumn = () => (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <Title
        size="medium"
        color={colors.g1}
        style={{ marginLeft: 12, marginRight: 24 }}
      >
        To
      </Title>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
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
          setValue={(value) =>
            setEndDateTime(
              new Date(
                value.getFullYear(),
                value.getMonth(),
                value.getDate(),
                endDateTime.getHours(),
                endDateTime.getMinutes()
              )
            )
          }
          value={endDateTime}
          mode="date"
          style={{ flex: 1 }}
        />
        {!isMultiday && (
          <PillButton
            title="Multiday"
            onPress={() => setIsMultiday(true)}
            style={{ marginRight: 24 }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
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
          setValue={(value) =>
            setEndDateTime(
              new Date(
                endDateTime.getFullYear(),
                endDateTime.getMonth(),
                endDateTime.getDate(),
                value.getHours(),
                value.getMinutes()
              )
            )
          }
          value={endDateTime}
          mode="time"
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );

  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <ScrollView style={{ paddingHorizontal: padding.medium, flex: 1 }}>
          <View>
            <Title size="large">Edit an Event</Title>
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
              style={{ marginBottom: 24 }}
            />
            {isMultiday && (
              <PillButton
                title="Single Day Event"
                onPress={() => setIsMultiday(false)}
                style={{ marginBottom: 12, width: 150 }}
              />
            )}
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                }}
              >
                {isMultiday && (
                  <Title
                    size="medium"
                    color={colors.g1}
                    style={{ marginLeft: 12, marginRight: 24 }}
                  >
                    From
                  </Title>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
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
                    setValue={(value) =>
                      setStartDateTime(
                        new Date(
                          value.getFullYear(),
                          value.getMonth(),
                          value.getDate(),
                          startDateTime.getHours(),
                          startDateTime.getMinutes()
                        )
                      )
                    }
                    value={startDateTime}
                    mode="date"
                    style={{ flex: 1 }}
                  />
                  {!isMultiday && (
                    <PillButton
                      title="Multiple Days"
                      onPress={() => {
                        setIsMultiday(true);
                        if (endDateTime !== null) return;
                        let tmp = new Date(startDateTime);
                        tmp.setDate(startDateTime.getDate() + 1);
                        setEndDateTime(tmp);
                      }}
                      style={{ marginRight: 24 }}
                    />
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
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
                    setValue={(value) =>
                      setStartDateTime(
                        new Date(
                          startDateTime.getFullYear(),
                          startDateTime.getMonth(),
                          startDateTime.getDate(),
                          value.getHours(),
                          value.getMinutes()
                        )
                      )
                    }
                    value={startDateTime}
                    mode="time"
                    style={{ flex: 1 }}
                  />
                </View>
              </View>
              {isMultiday && renderEndDateColumn()}
            </View>
            <Title
              style={{
                marginLeft: 12,
                marginBottom: 6,
                marginTop: 16,
                color: colors.g1,
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
              rightIcon={"map-marker"}
              style={{
                marginBottom: 12,
              }}
            />
            <TextInput
              placeholder="paste website url"
              onChangeText={(e) => setWebsite(e)}
              value={website}
              rightIcon={"web"}
              style={{
                marginBottom: 12,
              }}
            />
            <TextInput
              placeholder="paste online meeting link"
              onChangeText={(e) => setZoomLink(e)}
              value={zoomLink}
              rightIcon={"link"}
              style={{
                marginBottom: 32,
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
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
                marginLeft: 12,
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
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 24,
                marginLeft: 12,
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
                flexDirection: "row",
                marginBottom: 24,
                marginLeft: 12,
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
                  setFrequency("");
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
                  style={{ width: "100%" }}
                  options={FREQUENCY_OPTIONS}
                />
              </View>
            )}
            <View
              style={{
                borderWidth: 2,
                flexDirection: "row",
                padding: 12,
                borderRadius: 7,
                borderStyle: "dashed",
                borderColor: colors.p3,
                marginBottom: 24,
              }}
            >
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    height: 100,
                    width: 100,
                  }}
                />
              )}
              <IconButton
                size="small"
                icon="upload"
                title={image ? "Change Image" : "Add Image"}
                onPress={pickImage}
                color={colors.p1}
                style={{ width: "100%" }}
              />
            </View>
            <Button
              title="Save Event"
              onPress={saveEvent}
              size="small"
              style={{
                backgroundColor: colors.t1,
                marginBottom: 20,
              }}
            />
            <Button
              title="Cancel"
              onPress={() => navigation.navigate(RS.event, { id: event.id })}
              size="small"
              color={colors.t1}
              style={{
                borderColor: colors.t1,
                borderWidth: 2,
                backgroundColor: colors.w1,
                marginBottom: 20,
              }}
            />
            <Title style={{ textAlign: "center", marginBottom: 12 }}>OR</Title>
            <Button
              title="Delete"
              onPress={() =>
                navigation.navigate(RS.deleteEvent, { id: event.id })
              }
              size="small"
              color={colors.r1}
              style={{
                backgroundColor: colors.w1,
                marginBottom: 20,
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default EditEvent;
