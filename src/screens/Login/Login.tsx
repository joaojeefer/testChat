import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from '../../components';
import Firebase from '../../services/firebase';
import { UserContext } from '../../contexts/UserContext';
import styles from './styles';

interface LoginProps {
   navigation: any;
}

const Login: React.FC<LoginProps> = ({ navigation: { navigate } }) => {
  const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] =useState('');
  const [isError, setIsError] = useState([false, false]);
  const [emailError, passwordError] = isError;

  const { setUser } = useContext(UserContext);

  const firebaseService = new Firebase();

  const onFocus = () => {
    setErrorMessage('');
    setIsError([false, false]);
  }

  const validateFields = () => {
    if (email === '' || password === '') {
      setIsError([email === '', password === '']);
      setErrorMessage('Campos obrigatórios.');
      return false;
    }
    return true;
  };

  const handleErrors = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        setIsError([true, passwordError]);
        setErrorMessage('Formato de email inválido.');
        return;
      case 'auth/wrong-password':
        setIsError([emailError, true]);
        setErrorMessage('Senha incorreta.');
        return;
      case 'auth/user-not-found':
        setIsError([true, true]);
        setErrorMessage('Este usuário não existe.');
        return;
      default:
        setIsError([true, true]);
        setErrorMessage('Ocorreu um erro.');
        return;
    }
  };

	const handleLogin = async () => {
    if (!validateFields()) return;
    setLoading(true);
    try {
      const _user = await firebaseService.signIn(email, password);
      setUser(_user);
      navigate('Contacts');
    } catch (error) {
      handleErrors(error.code);
    } finally {
      setLoading(false);
    }
  };

  const navigateToRegister = () => navigate('Register');

  return (
    <View style={styles.container}>
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
        onSubmitEditing={handleLogin}
        returnKeyType="done"
        secureTextEntry
        isError={passwordError}
      />
      {(emailError || passwordError) && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
      <Button
        disabled={loading}
        loading={loading}
        label="Login"
        onPress={handleLogin}
      />
      <TouchableOpacity style={styles.linkArea} onPress={navigateToRegister}>
        <Text style={styles.linkText}>Cadastrar usuário</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
