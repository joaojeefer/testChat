import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles';
import styles from './styles';

interface HeaderProps {
  onBackPress?: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ onBackPress, title }) => {
  return (
    <View style={styles.container}>
      {onBackPress !== undefined && (
        <TouchableOpacity onPress={onBackPress} style={styles.iconArea}>
          <Icon name="arrow-left" size={24} color={colors.secondary.light} />
        </TouchableOpacity>
      )}
      <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
    </View>
  );
}

export default Header;
