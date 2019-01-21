<template>
	<div class="home">
	<Navbar></Navbar>
		<div class="container">
			<FormComponent></FormComponent>
			<ListTable></ListTable>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FormComponent from '@/components/FormComponent.vue';
import ListTable from '@/components/ListTable.vue';
import Navbar from '@/components/Navbar.vue';


@Component({
  components: {
    FormComponent,
		ListTable,
		Navbar
  },
})
export default class Home extends Vue {

}
</script>

