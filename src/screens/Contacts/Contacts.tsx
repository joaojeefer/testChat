import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Header } from '../../components';
import { UserContext } from '../../contexts/UserContext';
import Firebase from '../../services/firebase';
import { colors } from '../../styles';
import styles from './styles';

interface ContactsProps {
  navigation: any;
}

interface User {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  photoURL: string;
}

const Contacts: React.FC<ContactsProps> = ({ navigation: { navigate } }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  const { user } = useContext(UserContext);

  const firebaseService = new Firebase();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await firebaseService.fetchUsers(user.uid);
        const _users = response.map(doc => doc.data());
        setUsers(_users as User[]);
      } catch (error) {
        Alert.alert('Erro', 'Usuários indisponíveis no momento.\nTente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const generateInitials = (fullName: string) => {
    const names = fullName.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  const navigateToChat = (targetUser: User) => navigate('Chat', { targetUser });

  return (
    <View style={styles.container}>
      <Header title="Contatos" />
      {users.length === 0 ? (
        <View style={styles.emptyUsersArea}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.secondary.lightest} />
          ) : (
            <Text style={styles.emptyUsersText}>Nenhum contato disponível.</Text>
          )}
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.uid.toString()}
          renderItem={({ item }) => (
            <View key={item.uid.toString()} style={styles.row} >
              <View style={styles.initialsArea}>
                <Text style={styles.initialsText}>{generateInitials(item.displayName)}</Text>
              </View>
              <View>
                <Text style={styles.nameText}>{item.displayName}</Text>
                <Text style={styles.emailText}>{item.email}</Text>
              </View>
              <TouchableOpacity onPress={() => navigateToChat(item)} style={styles.iconArea}>
                <Icon name="chevron-right" size={24} color={colors.secondary.light} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

export default Contacts;
