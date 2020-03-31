import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './screens/HomeScreen';
import ComboListScreen from './screens/ComboListScreen';
import ComboGenScreen from './screens/ComboGenScreen';
import TrickListScreen from './screens/TricktionaryScreen';

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
						name='TrickList'
						component={TrickListScreen}
						options={{ title: 'Trick List' }}
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
