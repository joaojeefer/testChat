import React, { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Message } from './components';
import { Header } from '../../components';
import firestore from '@react-native-firebase/firestore';
import Firebase from '../../services/firebase';
import { CONVERSATIONS } from '../../constants/collections';
import { UserContext } from '../../contexts/UserContext';
import { SideEnum } from './components/Message/types';
import { colors } from '../../styles';
import styles from './styles';

interface ChatProps {
  navigation: any;
  route: any;
}

interface Conversation {
  uid: string;
  messages: [];
  source_user_uid: string;
  target_user_uid: string;
}

interface Message {
  message: string;
  senderUid: string;
}

const Chat: React.FC<ChatProps> = ({ navigation: { goBack }, route: { params } }) => {
  const { targetUser } = params;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([] as Message[]);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);

  const { user } = useContext(UserContext);

  const firebaseService = new Firebase();

  useEffect(() => {
    async function handleFetchConversation() {
      try {
        const _conversation = await firebaseService.fetchConversation(user.uid, targetUser.uid);
        if (!!_conversation && !!_conversation.id) setConversationId(_conversation.id);
        else {
          await firebaseService.createConversation(user.uid, targetUser.uid);
          setConversationId(`${user.uid}${targetUser.uid}`);
        }
      } catch (error) {
        Alert.alert(
          'Erro',
          'Serviço indisponível no momento.\nTente novamente mais tarde.',
          [{ text: 'Ok', onPress: () => goBack() }],
        );
      }
    }
    handleFetchConversation();
  }, []);

  const handleMessage = async () => {
    if (!!conversationId && message !== '') {
      setLoading(true);
      firebaseService.addMessageToConversation(conversationId, message, user.uid)
        .then(() => setMessage(''))
        .catch(() =>
          Alert.alert(
            'Erro',
            'Serviço indisponível no momento.\nTente novamente mais tarde.',
          )
        )
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection(CONVERSATIONS)
      .doc(conversationId)
      .onSnapshot(snapshot => {
        if (!!conversationId) {
          const msg: Message[] = snapshot.data()?.messages.map((m: { message: any; sender_uid: any; }) => {
            return {
              message: m.message,
              senderUid: m.sender_uid,
            };
          });
          if (!!msg) setMessages(msg);
        }
      });
    return () => subscriber();
  }, [conversationId]);

  return (
    <View style={styles.container}>
      <Header title={targetUser.displayName} onBackPress={goBack} />
      <View style={styles.contentArea}>
        <FlatList
          contentContainerStyle={styles.messagesArea}
          data={messages}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Message
              message={item.message}
              side={item.senderUid === user.uid ? SideEnum.RIGHT : SideEnum.LEFT}
            />
          )}
        />
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder='Digite uma mensagem...'
            placeholderTextColor={colors.secondary.default}
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={handleMessage}
          />
          <TouchableOpacity
            style={styles.buttonArea}
            disabled={loading}
            onPress={handleMessage}
          >
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Chat;
