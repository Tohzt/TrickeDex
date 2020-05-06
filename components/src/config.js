import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
	apiKey: "AIzaSyBfc8BBKpiXwbpNduRHheK4C5RyTO94svQ",
	authDomain: "trickedex.firebaseapp.com",
	databaseURL: "https://trickedex.firebaseio.com",
	projectId: "trickedex",
	storageBucket: "trickedex.appspot.com",
	messagingSenderId: "170352798722",
	appId: "1:170352798722:web:502e8cd565853442670b1b",
	measurementId: "G-F9N1B1TYJP"
};

export const firebaseApp = firebase.initializeApp(config);

