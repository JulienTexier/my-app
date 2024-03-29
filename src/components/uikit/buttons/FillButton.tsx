import type { ButtonProps } from './types';
import ButtonContent from './ButtonContent';
import { styled } from '~styles';

export function FillButton({
  children,
  size,
  icon,
  iconSide,
  iconPosition,
  loading,
  variant,
  ...rest
}: ButtonProps) {
  return (
    <Wrapper {...rest} variant={variant}>
      <ButtonContent
        variant={variant}
        size={size}
        icon={icon}
        iconSide={iconSide}
        iconPosition={iconPosition}
        loading={loading}
      >
        {children}
      </ButtonContent>
    </Wrapper>
  );
}

const Wrapper = styled('TouchableOpacity', {
  borderRadius: '$full',
  variants: {
    variant: {
      primary: { backgroundColor: '$primaryMuted' },
      danger: { backgroundColor: '$errorMuted' },
      warn: { backgroundColor: '$warnMuted' },
      info: { backgroundColor: '$infoMuted' },
      neutral: { backgroundColor: '$muted5' },
    },
    disabled: {
      true: { opacity: 0.5 },
      false: { opacity: 1 },
    },
  },
  defaultVariants: {
    variant: 'neutral',
  },
}).attrs(() => ({
  activeOpacity: 0.8,
}));
