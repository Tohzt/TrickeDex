import React, { useState } from 'react';
import {
	Modal,
	View,
	TouchableOpacity,
	Text,
	TextInput,
	StyleSheet,
} from 'react-native';

// FIRBASE IMPORT
import { firebaseApp } from '../src/config';

export default function LoginModal(props) {
	// STATE MANAGEMENT
	const [user, setUser] = useState('email@email.com');
	const [pass, setPass] = useState('pass123');


	const _loginHandler = () => {
		console.log('Username: '+user);
		console.log('Password: '+pass);

	
		firebaseApp
			.auth()
			.signInWithEmailAndPassword(user, pass)
			.then(() => props.login())
			.catch(error => console.log(error))
	}

	return (
		<Modal
			animationType="slide"
			transparent={false}
			visible={props.isVisible}
			onRequestClose={() => {
				alert('User Logging In...');
			}}>
				<View style={styles.containerModal}>
					<View style={styles.formContainer}>
						<Text style={styles.loginFont}>Name</Text>
						<TextInput 
							style={styles.formInput} 
							placeholder='Enter name here...'
							placeholderTextColor='#000'
							value={user}
							onChangeText={text => setUser(text)}
						/>

						<Text style={styles.loginFont}>Password</Text>
						<TextInput 
							style={styles.formInput} 
							placeholder='Enter password here...'
							placeholderTextColor='#000'
							value={pass}
							onChangeText={text => setPass(text)}
						/>
					</View>

					<TouchableOpacity onPress={() => { _loginHandler() }}>
						<View style={styles.loginButtonModal}>
							<Text>Log In</Text>
						</View>
					</TouchableOpacity>
				</View>
			</Modal>
	);
}

const styles = StyleSheet.create({
	containerModal: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#524d62',
	},
	formContainer: {
		width: '100%',
		height: '50%',
		alignItems: 'center',
		paddingVertical: 20,
	},
	loginFont: {
		color: '#fff',
		fontSize: 32,
		fontWeight: 'bold',
		paddingTop: 30
	},
	formInput: {
		width: '60%',
		height: 48,
		backgroundColor: '#b2adc2',
		borderRadius: 6,
		borderWidth: 2,
		borderColor: '#000',
		textAlign: 'center'
	},
	loginButtonModal: {
		backgroundColor: '#abbbdb',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: '#000',
		borderRadius: 6,
		height: 48,
		width: 100,
	},
});
