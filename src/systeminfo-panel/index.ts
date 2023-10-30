import { definePanel } from '@directus/extensions-sdk';
import PanelComponent from './panel.vue';
import * as icon from './icon';

export default definePanel({
	id: 'systeminfo',
	name: 'System Info',
	icon: 'box',
	description: 'A panel for displaying the system information of the Directus instance.',
	preview: icon.default,
	component: PanelComponent,
	options: [
	],
	minWidth: 12,
	minHeight: 8,
});
