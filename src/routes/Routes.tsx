import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './RootStack';

const Routes: React.FC = () => {
  return (
		<NavigationContainer>
			<RootStack />
		</NavigationContainer>
   );
}

export default Routes;
