import React, { useContext } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Chat, Contacts, Login, Register } from '../screens';
import { UserContext } from '../contexts/UserContext';
import { colors } from '../styles';

const { Navigator, Screen } = createStackNavigator();

const RootStack: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor={colors.secondary.darker} />
      <SafeAreaView />
      <Navigator screenOptions={{ headerShown: false }}>
        {!user.uid ? (
          <>
            <Screen name="Login" component={Login} />
            <Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Screen name="Contacts" component={Contacts} />
            <Screen name="Chat" component={Chat} />
          </>
        )}
      </Navigator>
    </>
  );
}

export default RootStack;
