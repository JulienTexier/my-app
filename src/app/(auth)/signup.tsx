import { useForm, Controller } from 'react-hook-form';
import { t, Trans } from '@lingui/macro';
import { useHeaderHeight } from '@react-navigation/elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { styled } from '~styles/styled';
import { FillButton, Text, TextInput, Stack, Spacer } from '~components/uikit';
import { showToast } from '~components/common/Toaster';
import { useAuthStore } from '~services/auth';

type Credentials = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password1: string;
  password2: string;
};

export const MIN_PASSWORD_LENGTH = 8;

export default function Signup() {
  const form = useForm<Credentials>({ mode: 'onChange' });
  const password = form.watch('password1');
  const { status, signup } = useAuthStore();
  const headerHeight = useHeaderHeight();
  const isValidForm = form.formState.isValid && status !== 'signing-in';

  async function handleSubmit() {
    try {
      const { password1, password2, ...values } = form.getValues(); // eslint-disable-line @typescript-eslint/no-unused-vars

      const credentials = {
        ...values,
        password: password1,
        email: values.email.toLowerCase(),
      };

      await signup(credentials);
    } catch (error: any) {
      showToast({ title: t`Failed to signup`, type: 'error' });
    }
  }

  return (
    <SafeArea>
      <Wrapper>
        <Scroller
          // https://github.com/APSL/react-native-keyboard-aware-scroll-view/issues/217#issuecomment-419707063
          extraHeight={-headerHeight}
        >
          <Stack axis="y" spacing="medium">
            <Stack axis="y" spacing="small">
              <Text variant="title2">
                <Trans>Create an account</Trans>
              </Text>
              <Text variant="bodySmall" color="textMuted">
                <Trans>
                  Don&lsquo;t worry, these won&lsquo;t actually be saved.
                </Trans>
              </Text>
            </Stack>

            <Stack axis="y" spacing="normal">
              <Controller
                name="email"
                control={form.control}
                rules={{
                  validate: {
                    required: (v) => !!v,
                    validEmail: (v) => v && v.includes('@'),
                  },
                }}
                render={({ field, fieldState }) => {
                  const message =
                    fieldState.error?.type === 'validEmail'
                      ? t`Email invalid`
                      : fieldState.error?.type === 'required'
                        ? t`Email required`
                        : undefined;

                  return (
                    <TextInput
                      {...field}
                      label={t`Email`}
                      message={message}
                      isValid={!message}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType="next"
                      onSubmitEditing={() => form.setFocus('firstName')}
                      testID="emailInput"
                    />
                  );
                }}
              />

              <Controller
                name="firstName"
                control={form.control}
                rules={{ required: t`First name is required` }}
                render={({ field, fieldState }) => {
                  return (
                    <TextInput
                      {...field}
                      label={t`First name`}
                      message={fieldState.error?.message}
                      isValid={!fieldState.error}
                      returnKeyType="next"
                      onSubmitEditing={() => form.setFocus('lastName')}
                      testID="firstNameInput"
                    />
                  );
                }}
              />

              <Controller
                name="lastName"
                control={form.control}
                rules={{ required: t`Last name is required` }}
                render={({ field, fieldState }) => {
                  return (
                    <TextInput
                      {...field}
                      label={t`Last name`}
                      message={fieldState.error?.message}
                      isValid={!fieldState.error}
                      returnKeyType="next"
                      onSubmitEditing={() => form.setFocus('phoneNumber')}
                      testID="lastNameInput"
                    />
                  );
                }}
              />

              <Controller
                name="phoneNumber"
                control={form.control}
                rules={{ required: t`Phone number is required` }}
                render={({ field, fieldState }) => {
                  const message =
                    fieldState.error?.message ||
                    t`Preferred format: +358400123456`;

                  return (
                    <TextInput
                      {...field}
                      label={t`Phone number`}
                      message={message}
                      isValid={!fieldState.error}
                      returnKeyType="next"
                      keyboardType="phone-pad"
                      onSubmitEditing={() => form.setFocus('password1')}
                      testID="phoneNumberInput"
                    />
                  );
                }}
              />

              <Controller
                name="password1"
                control={form.control}
                rules={{ required: true, minLength: MIN_PASSWORD_LENGTH }}
                render={({ field, fieldState }) => {
                  const message =
                    fieldState.error?.type === 'minLength'
                      ? t`Password must be at least 8 characters`
                      : fieldState.error?.type === 'required'
                        ? t`Password is required`
                        : undefined;

                  return (
                    <TextInput
                      {...field}
                      label={t`Password`}
                      message={message}
                      isValid={!fieldState.error}
                      secureTextEntry
                      returnKeyType="next"
                      onSubmitEditing={() => form.setFocus('password2')}
                      testID="passwordInput"
                    />
                  );
                }}
              />

              {/** ----------------- iOS password field hack -------------------
               * https://github.com/facebook/react-native/issues/21911#issuecomment-833144889
               * By passing an extra input between the password inputs, iOS will
               * not try to autofill the password field with generated password
               * which would cause a weird visual glitch in the UI.
               * Also we need to render <Spacer> components to mitigate the extra
               * space that the hidden input would cause within the wrapping <Stack>
               */}
              <Spacer axis="y" size="none" />
              <PasswordAutofillFix pointerEvents="none" />
              <Spacer axis="y" size="none" />
              {/* ----------------------------------------------------------- */}

              <Controller
                name="password2"
                control={form.control}
                rules={{
                  validate: {
                    required: (v) => !!v,
                    minLength: (v) => v && v.length >= MIN_PASSWORD_LENGTH,
                    passwordsMatch: (v) => v && v === password,
                  },
                }}
                render={({ field, fieldState }) => {
                  const message =
                    fieldState.error?.type === 'passwordsMatch'
                      ? t`Passwords do not match`
                      : fieldState.error?.type === 'minLength'
                        ? t`Password must be at least 8 characters`
                        : fieldState.error?.type === 'required'
                          ? t`Password is required`
                          : undefined;

                  return (
                    <TextInput
                      {...field}
                      label={t`Password again`}
                      message={message}
                      isValid={!fieldState.error}
                      secureTextEntry
                      returnKeyType="done"
                      testID="confirmPasswordInput"
                    />
                  );
                }}
              />
            </Stack>
          </Stack>
          <PushContent />

          <FillButton
            variant="primary"
            size="large"
            onPress={form.handleSubmit(handleSubmit)}
            disabled={!isValidForm}
            loading={status === 'signing-in'}
            testID="signupButton"
          >
            {status === 'signing-in' ? (
              <Trans>Signing up...</Trans>
            ) : (
              <Trans>Signup</Trans>
            )}
          </FillButton>
        </Scroller>
      </Wrapper>
    </SafeArea>
  );
}

const SafeArea = styled('SafeAreaView', {
  flex: 1,
});

const Wrapper = styled('View', {
  flex: 1,
});

const Scroller = styled(KeyboardAwareScrollView, {
  flex: 1,
}).attrs((p) => ({
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    flexGrow: 1,
    padding: p.theme.space.normal,
    paddingTop: p.theme.space.medium,
  },
}));

const PushContent = styled('View', {
  flexGrow: 1,
  marginTop: '$medium',
});

const PasswordAutofillFix = styled('TextInput', {
  opacity: 0.01,
  height: '$hairlineWidth',
});
