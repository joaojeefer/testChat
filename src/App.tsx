import 'react-native-gesture-handler';
import React from 'react';
import { UserProvider } from './contexts/UserContext';
import Routes from './routes';

 const App = () => {
		return (
			<UserProvider>
				<Routes />
			</UserProvider>
		);
 };

 export default App;
