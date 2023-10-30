<template>
	<div class="text">
		<div v-if="loading">
            Collecting System Informations, please wait ...
        </div>
		<InfoDisplay :value="results" root="true"></InfoDisplay>

		<!-- <ul>
			<li v-for="(value, name, index) in results" :key="index">
				<p class="title">
					<strong>{{ name }}</strong>
				</p>
				<ul v-if="true">
					<li v-for="(value2, name2, index2) in value" :key="index2">
						<p>
							<strong>{{ name2 }}</strong>
						</p>
						<span>{{ value2 }}</span>
					</li>
				</ul>
				<span v-else>{{ value }}</span>
			</li>
		</ul> -->
	</div>
</template>


<script setup lang="ts">
import { useApi } from '@directus/extensions-sdk';
import { onMounted, ref, reactive } from 'vue';
import InfoDisplay from './info-display.vue';

const api = useApi();
const results = ref({});
const loading = ref(true);
const props = withDefaults(
	defineProps<{
		showHeader?: boolean;
		text?: string;

	}>(),
	{
		showHeader: false,
		text: 'System Info',
	}
);


onMounted(async () => {
	await getSystemInfo();
});

async function getSystemInfo() {
	const result = await api.get('/systeminfo')
	results.value = result.data;
	loading.value = false;
}
</script>

<style scoped>
 .text {
	padding: 12px;
	overflow-y: scroll;
	height: 100%;
}
/*
.text.has-header {
	padding: 0 12px;
}

ul {
	padding-left: 0;
	list-style: none;
}

li {
	padding: 1em 0.25em;
	border-bottom: 1px solid var(--border-subdued);
}

a {
	display: block;
}

.title {
	font-size: 2em;
} */
</style>
