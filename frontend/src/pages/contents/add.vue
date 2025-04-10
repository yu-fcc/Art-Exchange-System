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
                                    {{ $t('addNewContent') }}
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
                                <form ref="observer" tag="form" @submit.prevent="submitForm()" :class="{ 'card ': !isSubPage }" class=" ">
                                    <div class="grid">
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('contentId') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlcontent_id" v-model.trim="formData.content_id"  :label="$t('contentId')" type="number" :placeholder="$t('enterContentId')"   step="any"    
                                                    class=" w-full" :class="getErrorClass('content_id')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('content_id')" class="p-error">{{ getFieldError('content_id') }}</small> 
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
                                                    <Calendar  :showButtonBar="true" class="w-full" :class="getErrorClass('year_created')" dateFormat="yy-mm-dd" v-model="formData.year_created" :showIcon="true"     mask="YYYY-MM-DD"      />
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
                                                        <Uploader @uploadError="(msg)=>app.flashMsg('File Upload', msg, 'error')" :class="getErrorClass('art_image')" upload-path="fileuploader/upload/art_image" v-model="formData.art_image" :fileLimit="1" :maxFileSize="3000000" accept=".jpg,.png,.gif,.jpeg" :multiple="false" :label="$t('chooseFilesOrDropFilesHere')" />
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
                                    <div v-if="showSubmitButton" class="text-center my-3">
                                        <Button class="p-button-primary" type="submit" :label="$t('submit')" icon="pi pi-send" :loading="saving" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>
    </main>
</template>
<script setup>
	import {  computed,  reactive, toRefs, onMounted } from 'vue';
	import { required, numeric, } from 'src/services/validators';
	import { useApp } from 'src/composables/app.js';
	import { $t } from 'src/services/i18n';
	import { useAddPage } from 'src/composables/addpage.js';
	import { usePageStore } from 'src/store/page';
	const props = defineProps({
		pageStoreKey: {
			type: String,
			default: 'CONTENTS',
		},
		pageName : {
			type : String,
			default : 'contents',
		},
		routeName : {
			type : String,
			default : 'contentsadd',
		},
		apiPath : {
			type : String,
			default : 'contents/add',
		},
		submitButtonLabel: {
			type: String,
			default: () => $t('submit'),
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
			default: $t('createRecord'),
		},
		msgAfterSave: {
			type: String,
			default: () => $t('recordAddedSuccessfully'),
		},
		msgBeforeSave: {
			type: String,
			default: () => $t(''),
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
		pageData: { // use to set formData default values from another page
			type: Object,
			default: () => ({
				content_id: "", content_type: "", title: "", description: "", medium: "", dimensions: "", year_created: new Date(), art_image: "", tag_id: [], 
			})
		},
	});
	//lines
	const store = usePageStore(props.pageStoreKey);
	const app = useApp();
	
	const formData = reactive({ ...props.pageData });
	
	//vuelidate form validation rules
	const rules = computed(() => {
		return {
			content_id: { required, numeric },
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
	
	const page = useAddPage({ store, props, formData, rules, beforeSubmit, afterSubmit });
	
	// event raised before submit form
	function beforeSubmit(){
		return true;
	}
	
	// event raised after form submited
	function afterSubmit(response) { 
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		page.setFormDefaultValues(); //reset form data
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigateTo(`/contents`);
		}
	}
	
	const {  saving, pageReady, } = toRefs(page.state);
	
	const { submitForm, getErrorClass, getFieldError, isFieldValid,  } = page.methods;
	
	onMounted(()=>{
		const pageTitle = $t('addNewContent');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
	
	// expose page object for other components access
	defineExpose({
		page
	});
</script>
<style scoped>
</style>
