import { PixelRatio } from 'react-native';

import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { Text } from '../Text';
import { Icon } from '../Icon';
import { styled } from '~styles';

type Props = {
  onChange: (value: string) => void;
  value: string;
  checked: boolean;
  label: string;
};

export function Checkbox({ onChange, checked, value, label }: Props) {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(checked ? 1 : 0, {
            duration: 100,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  return (
    <Wrapper onPress={() => onChange(value)} activeOpacity={0.8}>
      <RadioOuter>
        <Animated.View style={animatedStyles}>
          <Icon name="checkmark" size={18} color="text" />
        </Animated.View>
      </RadioOuter>

      <Text variant={checked ? 'bodyBold' : 'body'}>{label}</Text>
    </Wrapper>
  );
}

const Wrapper = styled('TouchableOpacity', {
  flexDirection: 'row',
  alignItems: 'center',
});

const RadioOuter = styled('View', {
  position: 'relative',
  width: 24,
  height: 24,
  backgroundColor: 'transparent',
  borderRadius: '$normal',
  borderWidth: PixelRatio.roundToNearestPixel(1.5), // try to match icon width
  marginRight: '$small',
  borderColor: '$text',
  flexCenter: 'row',
});
