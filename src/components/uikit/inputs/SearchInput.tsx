import { useRef, useState } from 'react';
import { TextInputProps, TouchableOpacity } from 'react-native';
import { t, Trans } from '@lingui/macro';

import { Text } from '../Text';
import { Stack } from '../layout/Stack';
import { Icon } from '../Icon';
import { styled } from '~styles';

type Props = Omit<TextInputProps, 'onChange'> & {
  value: string;
  onChange: (val: string) => void;
};

export function SearchInput({
  value,
  placeholder = t`Search`,
  onChange,
  ...rest
}: Props) {
  const inputRef = useRef<any>();
  const [isFocused, setFocused] = useState(false);

  function handleCancel() {
    onChange('');
    inputRef.current?.blur();
  }

  return (
    <Stack axis="x" spacing="xsmall" align="center">
      <InputWrapper>
        <Stack axis="x" spacing="xsmall" align="center">
          <Icon name="search" color="muted1" size={24} />

          <Input
            {...rest}
            {...{ ref: inputRef }} // TODO: fix stitches-native ref type issue
            value={value}
            placeholder={placeholder}
            onChangeText={onChange}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            returnKeyType="done"
            selectTextOnFocus
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </Stack>
      </InputWrapper>

      {isFocused && (
        <TouchableOpacity onPress={handleCancel}>
          <Text variant="bodySmallBold" color="textMuted">
            <Trans>Cancel</Trans>
          </Text>
        </TouchableOpacity>
      )}
    </Stack>
  );
}

const InputWrapper = styled('View', {
  flex: 1,
  paddingVertical: '$xsmall',
  paddingHorizontal: '$small',
  borderRadius: '$full',
  backgroundColor: '$muted6',
});

const Input = styled('TextInput', {
  typography: 'bodySmall',
  color: '$text',
  flexGrow: 1,
  padding: 0,
}).attrs((p) => ({
  placeholderTextColor: p.theme.colors.muted1,
}));
