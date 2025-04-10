<template>
    <main class="main-page"  id="">
        <template v-if="pageReady">
            <template v-if="showHeader">
                <section class="page-section mb-3" >
                    <div class="container">
                        <div class="grid justify-content-between align-items-center">
                            <div  v-if="!isSubPage"  class="col-fixed " >
                                <Button @click="$router.go(-1)"   class="p-button p-button-text " icon="pi pi-arrow-left"  />
                            </div>
                            <div  class="col " >
                                <div class=" text-2xl text-primary font-bold" >
                                    {{ $t('editContentVersion') }}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </template>
            <section class="page-section " >
                <div class="container">
                    <div class="grid ">
                        <div  class="md:col-9 sm:col-12 comp-grid" >
                            <div >
                                <form ref="observer"  tag="form" @submit.prevent="submitForm()" :class="{ 'card ': !isSubPage }" class=" ">
                                    <!--[form-content-start]-->
                                    <div class="grid">
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('contentId') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <api-data-source :enable-cache="true"   api-path="components_data/content_id_option_list" >
                                                        <template v-slot="req">
                                                            <Dropdown  class="w-full" :class="getErrorClass('content_id')"   :loading="req.loading"   optionLabel="label" optionValue="value" ref="ctrlcontent_id"  v-model="formData.content_id" :options="req.response" :label="$t('contentId')"  :placeholder="$t('selectAValue')" >
                                                            </Dropdown> 
                                                            <small v-if="isFieldValid('content_id')" class="p-error">{{ getFieldError('content_id') }}</small> 
                                                        </template>
                                                    </api-data-source>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('contentType') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <Dropdown  class="w-full" :class="getErrorClass('content_type')"      optionLabel="label" optionValue="value" ref="ctrlcontent_type"  v-model="formData.content_type" :options="app.menus.contentType" :label="$t('contentType')"  :placeholder="$t('selectAValue')" >
                                                    </Dropdown> 
                                                    <small v-if="isFieldValid('content_type')" class="p-error">{{ getFieldError('content_type') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('title') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrltitle" v-model.trim="formData.title"  :label="$t('title')" type="text" :placeholder="$t('enterTitle')"      
                                                    class=" w-full" :class="getErrorClass('title')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('title')" class="p-error">{{ getFieldError('title') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('description') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrldescription" v-model.trim="formData.description"  :label="$t('description')" type="text" :placeholder="$t('enterDescription')"      
                                                    class=" w-full" :class="getErrorClass('description')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('description')" class="p-error">{{ getFieldError('description') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('medium') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlmedium" v-model.trim="formData.medium"  :label="$t('medium')" type="text" :placeholder="$t('enterMedium')"      
                                                    class=" w-full" :class="getErrorClass('medium')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('medium')" class="p-error">{{ getFieldError('medium') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('dimensions') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrldimensions" v-model.trim="formData.dimensions"  :label="$t('dimensions')" type="text" :placeholder="$t('enterDimensions')"      
                                                    class=" w-full" :class="getErrorClass('dimensions')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('dimensions')" class="p-error">{{ getFieldError('dimensions') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('yearCreated') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlyear_created" v-model.trim="formData.year_created"  :label="$t('yearCreated')" type="text" :placeholder="$t('enterYearCreated')"      
                                                    class=" w-full" :class="getErrorClass('year_created')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('year_created')" class="p-error">{{ getFieldError('year_created') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('artImage') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <div class="mb-3">
                                                        <Uploader :class="getErrorClass('art_image')" :auto="true" :fileLimit="1" :maxFileSize="3000000" accept=".jpg,.png,.gif,.jpeg" :multiple="false" style="width:100%" :label="$t('chooseFilesOrDropFilesHere')" upload-path="fileuploader/upload/art_image" v-model="formData.art_image"></Uploader>
                                                    </div>
                                                    <small v-if="isFieldValid('art_image')" class="p-error">{{ getFieldError('art_image') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('tagId') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <api-data-source :enable-cache="true"   api-path="components_data/tag_id_option_list" >
                                                        <template v-slot="req">
                                                            <MultiSelect  class="w-full" :class="getErrorClass('tag_id')" optionLabel="label" optionValue="value" ref="ctrltag_id" v-model="formData.tag_id" :options="req.response" :label="$t('tagId')" >
                                                            </MultiSelect>  
                                                            <small v-if="isFieldValid('tag_id')" class="p-error">{{ getFieldError('tag_id') }}</small> 
                                                        </template>
                                                    </api-data-source>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--[form-content-end]-->
                                    <div v-if="showSubmitButton" class="text-center my-3">
                                        <Button type="submit" :label="$t('update')" icon="pi pi-send" :loading="saving" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>
        <template v-if="loading">
            <div style="min-height:200px" class="flex gap-3 justify-content-center align-items-center p-3">
                <div><ProgressSpinner style="width:50px;height:50px" /> </div>
                <div class="text-500">{{ $t('loading') }} </div>
            </div>
        </template>
    </main>
</template>
<script setup>
	import {  computed,  reactive, toRefs, onMounted } from 'vue';
	import { required } from 'src/services/validators';
	import { useApp } from 'src/composables/app.js';
	import { $t } from 'src/services/i18n';
	import { useEditPage } from 'src/composables/editpage.js';
	import { usePageStore } from 'src/store/page';
	const props = defineProps({
		id: [String, Number],
		pageStoreKey: {
			type: String,
			default: 'CONTENTVERSIONS',
		},
		pageName: {
			type: String,
			default: 'contentversions',
		},
		routeName: {
			type: String,
			default: 'contentversionsedit',
		},
		pagePath: {
			type : String,
			default : 'contentversions/edit',
		},
		apiPath: {
			type: String,
			default: 'contentversions/edit',
		},
		submitButtonLabel: {
			type: String,
			default: () => $t('update'),
		},
		formValidationError: {
			type: String,
			default: $t('formIsInvalid'),
		},
		formValidationMsg: {
			type: String,
			default: $t('pleaseCompleteTheForm'),
		},
		msgTitle: {
			type: String,
			default: $t('updateRecord'),
		},
		msgBeforeSave: {
			type: String,
			default: () => $t(''),
		},
		msgAfterSave: {
			type: String,
			default: () => $t('recordUpdatedSuccessfully'),
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showSubmitButton: {
			type: Boolean,
			default: true,
		},
		redirect: {
			type : Boolean,
			default : true,
		},
		isSubPage: {
			type : Boolean,
			default : false,
		},
	});
	
	const store = usePageStore(props.pageStoreKey);
	const app = useApp();
	
	const formDefaultValues = Object.assign({
		content_id: "", content_type: "", title: "", description: "", medium: "", dimensions: "", year_created: "", art_image: "", tag_id: [], 
	}, props.pageData);
	
	const formData = reactive({ ...formDefaultValues });
	
	function afterSubmit(response) {
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigateTo(`/contentversions`);
		}
	}
	
	// form validation rules
	const rules = computed(() => {
		return {
			content_id: {  },
			content_type: {  },
			title: {  },
			description: {  },
			medium: {  },
			dimensions: {  },
			year_created: {  },
			art_image: {  },
			tag_id: {  }
		}
	});
	
	const page = useEditPage({store, props, formData, rules, afterSubmit });
	
	const {  currentRecord: editRecord } = toRefs(store.state);
	const {  pageReady, saving, loading, } = toRefs(page.state);
	
	const { apiUrl } = page.computedProps;
	
	const { load, submitForm, getErrorClass, getFieldError, isFieldValid,  } = page.methods;
	
	onMounted(()=>{
		const pageTitle = $t('editContentVersion');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
</script>
<style scoped>
</style>
