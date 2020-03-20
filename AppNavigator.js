import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './screens/HomeScreen';
import ComboListScreen from './screens/ComboListScreen';
import ComboGenScreen from './screens/ComboGenScreen';

const Stack = createStackNavigator()

function AppNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Home'
				screenOptions={{
					gestureEnabled: true
				}}>
					<Stack.Screen
						name='Home'
						component={HomeScreen}
						options={{ title: 'Home Screen' }}
					/>
					<Stack.Screen
						name='ComboGen'
						component={ComboGenScreen}
						options={{ title: 'Combo Generator' }}
					/>
					<Stack.Screen
						name='ComboList'
						component={ComboListScreen}
						options={{ title: 'Combo List' }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
	)
}

export default AppNavigator;
