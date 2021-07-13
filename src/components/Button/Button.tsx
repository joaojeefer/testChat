import React from 'react';
import { ActivityIndicator, StyleProp, Text, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { colors } from '../../styles';
import styles from './styles';

interface ButtonProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ style, loading, label, ...props }) => {
  return (
    <TouchableOpacity {...props} style={[styles.button, style]}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.secondary.darker} />
      ) : (
        <Text style={styles.buttonText}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

export default Button;
