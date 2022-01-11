import { Pressable, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Title, HatCircles } from '../../elements';
import { padding } from '../../theme';
import { formatTime } from '../../utils';

const EventDrawerCard = ({ event, onPress }) => {
  const time = formatTime(event.dateTime.toDate());
  const { colors } = useTheme();
  return (
    <Pressable
      style={{
        marginBottom: padding.large,
        paddingHorizontal: padding.large
      }}
      onPress={() => onPress(event.id)}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: padding.xsmall
        }}
      >
        <Title color="white">{event.title}</Title>
        <Title size="small" color={colors.w1}>
          {time}
        </Title>
      </View>
      <Title size="small" style={{ color: 'white', fontWeight: 'normal' }}>
        {event.description}
      </Title>
    </Pressable>
  );
};

export default EventDrawerCard;
