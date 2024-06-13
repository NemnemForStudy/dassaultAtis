import { CONTENT_TYPE_ICON_COLOR } from '../utils/style';
export default {
	data() {
		return {};
	},
	methods: {
		getFontIcon(feature) {
			if (CONTENT_TYPE_ICON_COLOR[feature.value]) {
				return CONTENT_TYPE_ICON_COLOR[feature.value].icon;
			} else if (feature.contentToReuse) {
				return feature.icon;
			}
		},
		setColor(feature, rule) {
			let color = feature.contentToReuse ? feature.color : CONTENT_TYPE_ICON_COLOR[feature.value].color;
			return `${rule}: ${color};`;
		}
	}
};
