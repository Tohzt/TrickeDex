import React from 'react'
import { 
	StyleSheet, 
	View, 
	Text, 
	TouchableOpacity,
	Modal
} from 'react-native'
import { ScreenOrientation } from 'expo';

// CUSTOM IMPORTS
import LoginModal from '../components/LoginModal';
import { firebaseApp } from '../src/config';

export default class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isLoggedIn: false,
			currentUser: null
		};

		// BIND METHOD
		this._modalLogin = this._modalLogin.bind(this);
	}

	componentDidMount() {
		firebaseApp.auth().onAuthStateChanged((user) => {
			if (user != null) {
				console.log("We are authenticated now!");
		console.log("----------");
				//console.log(firebaseApp.auth().currentUser.uid)
			}
		});
	};

	componentDidUpdate() {
	}

	_modalLogin() {
		this.setState({ isLoggedIn: true });
	}

	render () {
		const { navigate } = this.props.navigation; 

		return (
			<View style={styles.container}>
				<LoginModal isVisible={!this.state.isLoggedIn} login={this._modalLogin}/>

				<Text>{this.state.currentUser}</Text>

				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => navigate('ComboGen')}
				>
					<Text style={styles.btnText}>To Combo Gen</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => navigate('ComboList')}
				>
					<Text style={styles.btnText}>To Combo List</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => navigate('TrickList')}
				>
					<Text style={styles.btnText}>To Tricktionary</Text>
				</TouchableOpacity>

				<TouchableOpacity 
					style={styles.buttonContainer}
					onPress={() => { 
						const user = firebaseApp.auth().currentUser;
						console.log("User: " + user.toString())
						if (user != null) {
							console.log("Save Scor")
							firebaseApp.database().ref('users/' + user.uid).set({
								highscore: 101,
							});
						}
					}}
				>
					<Text style={styles.btnText}> User Data </Text>
				</TouchableOpacity>
				
				<TouchableOpacity 
					style={styles.buttonContainer}
					onPress={() => {
						firebaseApp.auth().signOut()
						this.setState({isLoggedIn: false});
						}
					}
				>
					<Text style={styles.btnText}> Sign Out </Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ebebeb'
	},
	buttonContainer: {
		backgroundColor: '#222',
		borderRadius: 5,
		padding: 10,
		margin: 20
	},
	btnText: {
		fontSize: 20,
		color: '#fff'
	},
})

