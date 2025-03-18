import React, { useState } from 'react';
import { TextInput, HelperText } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

type PasswordInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  style?: any;
};

const PasswordInput = ({
  value,
  onChangeText,
  error,
  style,
}: PasswordInputProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Mot de passe"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        right={
          <TextInput.Icon
            icon={secureTextEntry ? 'eye' : 'eye-off'}
            onPress={toggleSecureEntry}
            forceTextInputFocus={false}
          />
        }
        style={[styles.input, style]}
        autoCapitalize="none"
        mode="outlined"
        error={!!error}
      />
      {error ? (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  input: {
    backgroundColor: 'transparent',
  },
});

export default PasswordInput;