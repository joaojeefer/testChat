import React, { useContext, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Input, Header } from '../../components';
import { UserContext } from '../../contexts/UserContext';
import Firebase from '../../services/firebase';
import styles from './styles';

interface RegisterProps {
	navigation: any;
}

const Register: React.FC<RegisterProps> = ({ navigation: { navigate, goBack } }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
	const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] =useState('');
  const [isError, setIsError] = useState([false, false, false]);
  const [nameError, emailError, passwordError] = isError;

  const { setUser } = useContext(UserContext);

  const firebaseService = new Firebase();

  const onFocus = () => setIsError([false, false, false]);

  const validateFields = () => {
    if (name === '' || email === '' || password === '') {
      setIsError([name === '', email === '', password === '']);
      setErrorMessage('Campos obrigatórios.');
      return false;
    }
    return true;
  };

  const handleErrors = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        setIsError([nameError, true, passwordError]);
        setErrorMessage('Formato de email inválido.');
        return;
      case 'auth/weak-password':
        setIsError([nameError, emailError, true]);
        setErrorMessage('Senha inválida. Mínimo de 6 caracteres.');
        return;
      default:
        setIsError([true, true, true]);
        setErrorMessage('Ocorreu um erro.');
        return;
    }
  };

	const handleRegister = async () => {
    if (!validateFields()) return;
    setLoading(true);
		try {
			const _user = await firebaseService.registerUser(email, password);
      if (!!_user.uid && !!_user.email) {
        await firebaseService.createUser(_user.uid, _user.email, name);
      }
      setUser(_user);
			navigate('Contacts');
		} catch (error) {
      handleErrors(error.code);
    } finally {
      setLoading(false);
    }
	};

  return (
  <View style={styles.container}>
    <Header title="Novo usuário" onBackPress={goBack} />
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrolledContent}
    >
      <Input
        style={styles.input}
        placeholder='Nome'
        value={name}
        onChangeText={setName}
        onFocus={onFocus}
        returnKeyType="next"
        isError={nameError}
      />
      <Input
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        onFocus={onFocus}
        keyboardType="email-address"
        returnKeyType="next"
        isError={emailError}
      />
      <Input
        style={styles.input}
        placeholder='Senha'
        value={password}
        onChangeText={setPassword}
        onFocus={onFocus}
        onSubmitEditing={handleRegister}
        returnKeyType="done"
        secureTextEntry
        isError={passwordError}
      />
      {(nameError || emailError || passwordError) && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
      <Button
        disabled={loading}
        loading={loading}
        label="Cadastrar"
        onPress={handleRegister}
      />
    </ScrollView>
  </View>
  );
}

export default Register;
