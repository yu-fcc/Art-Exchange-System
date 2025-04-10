<template>
    <main class="main-page" id="">
        <section class="page-section q-pa-md" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col comp-grid" >
                        <div class="text-bluegray-500 text-5xl font-bold text-primary" >
                            {{ $t('uploadYourArtisticWorks') }}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section mb-3" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col comp-grid" >
                        <div class="">
                            <div class="card my-3 p-3 surface-50">
                                <ContentsAddPage ref="contentsAddPage"  :show-header="true" is-sub-page>
                                </ContentsAddPage>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section mb-3" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col comp-grid" >
                        <div class=" text-5xl font-bold text-primary" >
                            {{ $t('uploadYourLifeAboutArt') }}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section mb-3" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col comp-grid" >
                        <div class="">
                            <div class="card my-3 p-3 surface-50">
                                <OthercontentsAddPage ref="othercontentsAddPage"  :show-header="true" is-sub-page>
                                </OthercontentsAddPage>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

</template>
<script setup>
	import {  ref } from 'vue';
	
	
	import { useApp } from 'src/composables/app.js';
	
	import { $t } from 'src/services/i18n';
	import ContentsAddPage from "../contents/add.vue";
import OthercontentsAddPage from "../othercontents/add.vue";
	
	const props = defineProps({
		pageName: {
			type: String,
			default: 'home',
		},
		routeName: {
			type: String,
			default: 'home',
		},
		isSubPage: {
			type : Boolean,
			default : false,
		},
	});
	const app = useApp();
	
	const pageReady = ref(true);
	
</script>
<style scoped>
</style>
