/* Trick Data */


export default class Trick {
	constructor(
		id, 
		title, 
		name,
		takeoff,
		landingStance,
	){
		this.id = id;
		this.title = title;
		this.name = name;
		this.takeoff = takeoff || [];
		this.landingStance = landingStance;
	}
}
