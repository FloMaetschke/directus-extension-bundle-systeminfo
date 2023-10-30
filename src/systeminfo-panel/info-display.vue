<template>
    <div>
        <ul>
            <li v-for="(value, name, index) in props.value" :key="index">
                <p :class="{ 'rootLevel': props.root }">
                    <strong>{{ camelCaseToWords(name) }}</strong>
                </p>
                <div v-if="isObj(value)">
                    <InfoDisplay :value="value" />
                    <!-- <ul v-if="isObj()">
					<li v-for="(value2, name2, index2) in value" :key="index2">
						<p>
							<strong>{{ name2 }}</strong>
						</p>
						<span>{{ value2 }}</span>
					</li>
				</ul> -->
                </div>
                <div v-else-if="Array.isArray(value)">
                    <span v-if="!isObj(value[0])" style="margin-top: 20px">
                        {{ value.join([separator = ', ']) }}
                    </span>
                    <div v-else>
                        <table v-if="value && value[0]">
                            <tr>
                                <th v-for="title, titleIndex of Object.keys(value[0])" :keys="titleIndex">{{
                                    camelCaseToWords(title) }}</th>
                            </tr>
                            <tr v-for="item, index2 of value" :key="index2">
                                <td v-for="itemValue, index3 of item" :key="index3">
                                    <div v-if="isNumber(itemValue)">
                                        {{ formatNumber(itemValue)}}
                                    </div>
                                    <div v-else>
                                        {{ itemValue }}
                                    </div>
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>
                <span v-else>{{ value }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
// declare additional options
export default {
    name: "info-display"
}
</script>

<script setup lang="ts">

const props = withDefaults(
    defineProps<{
        value?: object;
        root?: boolean;

    }>(),
    {
        value: undefined,
        root: false,
    }
);

function isObj(obj) {
    console.log(obj);
    return typeof obj === 'object' &&
        !Array.isArray(obj) &&
        obj !== null && !(typeof obj === 'string' || obj instanceof String)
}

function isNumber(value) {
  return typeof value === 'number';
}

function formatNumber(number) {
        return Intl.NumberFormat().format(number);
}
function camelCaseToWords(s: string) {
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
}

</script>

<style scoped>
.text {
    padding: 12px;
    overflow-y: scroll;
    height: 100%;
}

.rootLevel {
    font-size: 2em;
}

.text.has-header {
    padding: 0 12px;
}

ul {
    padding-left: 0;
    list-style: none;
}

li {
    padding: 1em 0.25em;
    margin-left: 20px;
    border-bottom: 1px solid var(--border-subdued);
}

a {
    display: block;
}

.title {
    font-size: 2em;
}

th {
    font-size: larger;
    font-weight: bold;
    padding: 10px;
    border: none;
}

td {
    padding: 10px;
    border-right: solid 1px #f00;
    border-left: solid 1px #f00;
}

table {
    border-collapse: collapse;
}</style>