import React, { useContext } from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";

import { AuthContext } from "../../context";
import { DAYS_OF_THE_WEEK } from "../../data";
import { RS } from "../../strings";
import { Title, IconButton } from "../../elements";
import { extractDate, extractTime, handleInterestPress } from "../../utils";

const Header = ({ event, navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const { colors } = useTheme();
  const {
    title,
    dateTime,
    startDateTime,
    endDateTime,
    frequency,
    users,
    id,
    creator,
    isRecurring,
    isMultiday,
  } = event;

  const tmpStartDateTime = startDateTime ?? dateTime;

  const displayStartDate = extractDate(tmpStartDateTime);
  const displayStartTime = extractTime(tmpStartDateTime);

  const displayEndDate = extractDate(endDateTime);
  const displayEndTime = extractTime(endDateTime);

  const isInterested =
    users && currentUser ? users.includes(currentUser.id) : false;

  function getDisplayDateTime() {
    if (isRecurring) {
      if (frequency == "WEEKLY") {
        const dayOfTheWeek =
          DAYS_OF_THE_WEEK[(startDateTime ?? dateTime).toDate().getDay()];
        return `Every ${dayOfTheWeek} - ${displayStartTime}`;
      } else return `${frequency} - ${displayStartDate}`;
    } else if (isMultiday) {
      return `From\t${displayStartDate} - ${displayStartTime}\nTo\t\t${displayEndDate} - ${displayEndTime}`;
    } else return `${displayStartDate} - ${displayStartTime}`;
  }

  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 24,
        }}
      >
        <Title
          size="large"
          style={{ flex: 0.8, marginBottom: 5, marginTop: 5 }}
        >
          {title}
        </Title>
        {currentUser?.id === creator && (
          <IconButton
            icon="pencil"
            color={colors.p1}
            onPress={() => navigation.navigate(RS.editEvent, { id })}
          />
        )}
      </View>
      <Text style={{ color: colors.p2, fontSize: 14 }}>
        {getDisplayDateTime()}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <IconButton
          onPress={() =>
            handleInterestPress(currentUser, event, isInterested, navigation)
          }
          title={isInterested ? "Interested" : "Show Interest"}
          icon={isInterested ? "star" : "star-outline"}
          color={colors.p2}
          style={{ marginLeft: -6 }}
        />
      </View>
    </View>
  );
};

export default Header;
