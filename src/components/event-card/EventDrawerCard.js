import { Pressable, View } from 'react-native';
import { Title, HatCircles } from '../../elements';
import { padding } from '../../theme';

const EventDrawerCard = ({ event, onPress }) => {
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
        <HatCircles hats={event.hats} alternate />
      </View>
      <Title size="small" style={{ color: 'white', fontWeight: 'normal' }}>
        {event.description}
      </Title>
    </Pressable>
  );
};

export default EventDrawerCard;
