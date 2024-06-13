import { CONTENT_TYPE_URI } from './types';

const UNKNOWN_TYPE_ICON = 'question';

export const CONTENT_TYPE_ICON_COLOR = {
	post: {
		icon: 'newspaper',
		color: '#ADADAD'
	},
	ideation: {
		icon: 'lightbulb',
		color: '#00B8DE'
	},
	question: {
		icon: 'help',
		color: '#EA4F37'
	},
	wiki: {
		icon: 'book-open',
		color: '#00AA86'
	},
	media: {
		icon: 'picture',
		color: '#70036b'
	}
};

export const MEDIA_URI_ICON = {
	'swym:Picture': 'picture',
	'swym:AnimatedPicture': 'picture-animated',
	'swym:Document': 'doc',
	'swym:Sound': 'sound',
	'swym:Video': 'video',
	'swym:3dModel': 'cube',
	'swym:Drawing': 'picture',
	'swym:SimulationMedia': 'picture'
};

export function MEDIA_TYPE_ICON_COLOR(uri) {
	let icon = null;

	switch (uri) {
		case 'swym:Sound':
			icon = 'sound';
			break;
		case 'swym:Video':
			icon = 'video';
			break;
		case 'swym:3dModel':
			icon = 'cube';
			break;
		case 'swym:Document':
			icon = 'doc'; //Handle different extension?
			break;
		case 'swym:AnimatedPicture':
			icon = 'picture-animated';
			break;
		case 'swym:SimulationMedia':
		case 'swym:Drawing':
		case 'swym:Picture':
		default:
			icon = 'picture';
	}

	return {
		icon,
		color: '#70036b'
	};
}

/**
 * Return fonticon with the URI type
 * @example 'swym:Post' -> 'newspaper'
 * @example 'swym:3dModel' -> 'cube'
 * @param {string} uri 
 * @returns Fonticon name
 */
export function getFonticonByUri(uri) {
	let type = CONTENT_TYPE_URI[uri];

	let typeIconColor = type && CONTENT_TYPE_ICON_COLOR[type];

	if (typeIconColor) {
		return typeIconColor.icon;
	} else {
		let mediaIcon = MEDIA_URI_ICON[uri];

		if (mediaIcon) {
			return mediaIcon;
		}
	}

	return UNKNOWN_TYPE_ICON;
}
export function getFontIcon(feature) {
//	const featureType = feature.value || 
	if (CONTENT_TYPE_ICON_COLOR[feature.value]) {
		return CONTENT_TYPE_ICON_COLOR[feature.value].icon;
	} else if (feature.contentToReuse) {
		return feature.icon;
	}
}
export function setColor(feature, rule) {
	let color = feature.contentTexportoReuse ? feature.color : CONTENT_TYPE_ICON_COLOR[feature.value].color;
	return `${rule}: ${color};`;
}
