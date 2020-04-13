import React from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native';

const TrickInSaved = (props) => {
		return (
			<View style={{width:'80%'}}>
				<TouchableOpacity onPress={() => {props.tapTrick(props.position, props.type)}}>
					<View style={{flexDirection: 'row', justifyContent: 'space-around',  borderColor: '#0f0', borderWidth: 2, margin: 2}}>
						<Text style={{paddingVertical: 2}}>{props.trick.name}</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}

const styles = StyleSheet.create({
	container: {
	},
});

export default TrickInSaved;
