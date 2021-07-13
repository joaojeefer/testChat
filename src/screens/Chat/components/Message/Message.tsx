import React from 'react';
import { Text, View } from 'react-native';
import { SideEnum } from './types';
import styles from './styles';

interface MessageProps {
   message: string;
   side: SideEnum;
}

const Message: React.FC<MessageProps> = ({ message, side }) => {
	const isLeftSide = side === SideEnum.LEFT;

   return (
    <View
      style={[
        styles.container,
        { justifyContent: isLeftSide ? 'flex-start' : 'flex-end' },
        ]}
      >
      <View
        style={[
          styles.messageArea,
          { backgroundColor: isLeftSide ? '#ff69b4' : '#7fffd4' },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { textAlign: isLeftSide ? 'left' : 'right' },
          ]}
        >{message}</Text>
      </View>
    </View>
	);
}

export default Message;
