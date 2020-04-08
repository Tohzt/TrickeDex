import React from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native';

const TrickInCombo = (props) => {
		return (
			<View style={{width:'80%'}}>
				<TouchableOpacity onPress={() => {props.swapTrick(props.position, props.type)}}>
					<View style={{alignItems: 'center',  borderColor: '#00f', borderWidth: 2, margin: 2}}>
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

export default TrickInCombo;
