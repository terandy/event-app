import { Pressable, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Title } from "../../elements";
import { padding } from "../../theme";
import { formatTime, isSameDay } from "../../utils";

const EventDrawerCard = ({ event, selectedDate, onPress }) => {
  // Fixing the parameter (that is in the format ISO-8601 without time)
  selectedDate = new Date(Date.parse(selectedDate + "T00:00:00"));
  selectedDate.setHours(0, 0, 0, 0);

  // startDateTime was called dateTime, so this will check if it is with the old name
  const _startDateTime = event.startDateTime ?? event.dateTime;
  const startDateTime = _startDateTime.toDate();
  const startDate = new Date(startDateTime);
  startDate.setHours(0, 0, 0, 0);

  let endDateTime;
  let endDate;
  if (event.isMultiday) {
    endDateTime = event.endDateTime.toDate();
    endDate = new Date(endDateTime);
    endDate.setHours(0, 0, 0, 0);
  }
  const midDayStart = new Date(startDate);
  midDayStart.setDate(startDate.getDate() + 1);

  const isMiddleDayOfMultidayEvent =
    event.isMultiday && selectedDate >= midDayStart && selectedDate < endDate;

  let time;
  if (!event.isMultiday || isSameDay(selectedDate, startDate))
    time = formatTime(startDateTime);
  else if (isMiddleDayOfMultidayEvent) time = "all-day";
  else time = `Ends ${formatTime(endDateTime)}`;

  const { colors } = useTheme();
  return (
    <Pressable
      style={{
        marginBottom: padding.large,
        paddingHorizontal: padding.large,
      }}
      onPress={() => onPress(event.id)}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: padding.xsmall,
        }}
      >
        <Title color="white" style={{ marginRight: 16, flexShrink: 1 }}>
          {event.title}
        </Title>
        <Title size="small" color={colors.w1}>
          {time}
        </Title>
      </View>
      <Title
        size="small"
        style={{ color: "white", fontWeight: "normal", maxHeight: 50 }}
      >
        {!!event.description && event.description.length > 120
          ? event.description.slice(0, 120) + "..."
          : event.description}
      </Title>
    </Pressable>
  );
};

export default EventDrawerCard;
