import { useContext } from "react";
import { ScrollView, View, Text, TouchableWithoutFeedback } from "react-native";

import { EventContext, AuthContext } from "../../context";
import { Title, Layout } from "../../elements";
import { padding } from "../../theme";
import { getDisplayDateTime } from "../../utils/date-time-functions";
import { RS } from "../../strings";

const DuplicatePastEvents = ({ navigation, route }) => {
  const { events } = useContext(EventContext);
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser.id);

  const editingEventId = route.params?.id;
  const isNewEvent = route.params?.isNewEvent;

  const filteredEvents = events.filter(
    (e) => e.creator == currentUser.id && e.id != editingEventId
  );
  const renderEventRow = (key, event) => {
    let displayDate;
    if (event.endDateTime) displayDate = "multiple days";
    else displayDate = getDisplayDateTime(event);
    return (
      <TouchableWithoutFeedback
        key={key}
        onPress={() => {
          navigation.navigate(isNewEvent ? RS.createEvent : RS.editEvent, {
            id: editingEventId,
            event: event,
          });
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 12,
            borderWidth: 2,
            borderColor: "#000",
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}
        >
          <Text style={{ flex: 1, marginRight: 6 }}>{event.title}</Text>
          <Text style={{ flex: 1 }}>{displayDate}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const eventRows = [];
  for (let i = 0; i < filteredEvents.length; i++)
    eventRows.push(renderEventRow(i, filteredEvents[i]));
  return (
    <Layout>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
        }}
        style={{
          paddingHorizontal: padding.medium,
          marginBottom: padding.large,
        }}
      >
        <Title size="medium" style={{ marginBottom: 12 }}>
          Past Events
        </Title>
        {eventRows}
      </ScrollView>
    </Layout>
  );
};

export default DuplicatePastEvents;
