import Trick from './Tricks';
import Vari  from './Variations';
import Trans from './Transitions';

export const TRICK_LIST = [
	/* ID | TITLE | NAME | TAKEOFF | LANDING_STANCE*/
	// Kicks
	new Trick(
		'TK1',
		'Tornado Kick',
		'Tornado',
		['vanish'],
		'complete'
	),
	new Trick(
		'TK2',
		'540 Kick',
		'540',
		['vanish'],
		'hyper'
	),
	new Trick(
		'TK3',
		'720 Kick',
		'720',
		['vanish'],
		'hyper'
	),
	new Trick(
		'TK4',
		'900 Kick',
		'900',
		['vanish', 'pop'],
		'complete'
	),
	new Trick(
		'TK5',
		'540 hyper-hook',
		'Jackknife',
		['vanish'],
		'hyper'
	),

	// Twists
	new Trick(
		'TT1',
		'Corkscrew',
		'Cork',
		['swing', 'boneless'],
		'complete'
	),
	new Trick(
		'TT1',
		'Butterfly Twist',
		'Btwist',
		['_vanish', 'misleg'],
		'complete'
	),
	// Flips
	new Trick(
		'TF1',
		'Aerial',
		'Aerial',
		['_vanish, misleg'],
		'hyper'
	),
];

export const TRANS_LIST = [
	/* ID | TITLE | NAME | START-POS*/
	new Trans(
		'TR1',
		'swing',
		's/t',
		'complete',
	),
	new Trans(
		'TR2',
		'misleg',
		'misleg',
		'complete',
	),
	new Trans(
		'TR3',
		'vanish',
		'vanish',
		'complete',
	),
	new Trans(
		'TR4',
		'_vanish',
		'vanish',
		'hyper',
	),
	new Trans(
		'TR5',
		'boneless',
		'boneless',
		'hyper',
	),
];
