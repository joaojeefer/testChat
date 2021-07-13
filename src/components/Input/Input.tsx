import React from 'react';
import { StyleProp, TextInput, TextInputProps, TextStyle } from 'react-native';
import { colors } from '../../styles';
import styles from './styles';

interface InputProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
  isError?: boolean;
}

const Input: React.FC<Omit<InputProps, 'placeholderTextColor'>> = ({ style, isError = false, ...props }) => {
  return (
    <TextInput
      {...props}
      style={[styles.input, style, { borderColor: !!isError ? colors.danger.default : colors.secondary.light}]}
      placeholderTextColor={colors.secondary.default}
    />
  );
}

export default Input;
