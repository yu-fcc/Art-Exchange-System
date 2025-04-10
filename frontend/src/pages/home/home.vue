<template>
    <main class="main-page" id="">
        <section class="page-section q-pa-md" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col comp-grid" >
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section mb-3" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col comp-grid" >
                        <div class="">
                            <div class="carousel-container">
                                <!-- 轮播图的图片容器 -->
                                <div class="carousel-images">
                                    <img src="images/lbt02.png" alt="艺术品1">
                                    <img src="images/lbt03.png" alt="艺术品2">
                                    <img src="images/lbt04.png" alt="艺术品3">
                                </div>
                                <!-- 上下箭头按钮 -->
                                <button class="nav-button prev" id="prev-btn">&#10094;</button>
                                <button class="nav-button next" id="next-btn">&#10095;</button>
                                <!-- 分页器 -->
                                <div class="pagination" id="pagination"></div>
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
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section mb-3" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col-sm-4 col-md-4 col-6 comp-grid" >
                        <div class="">
                            <NiceImage class="img-fluid" src="images/zym01.png"   style="max-width:100%;width:500px;height:400px;" />
                        </div>
                    </div>
                    <div  class="col-6 comp-grid" >
                        <div class="">
                            <div class="container">
                                <div class="right-side">
                                    <h1>艺术品分享中心</h1>
                                    <p>
                                    欢迎来到艺术品分享中心！这是一个集合全球艺术家与艺术爱好者的互动平台。在这里，您可以分享自己的艺术作品，欣赏他人创作，并与全球各地的艺术家进行交流与合作。
                                    </p>
                                    <p>
                                    我们的目标是为艺术爱好者提供一个展示与交流的平台，同时也为有志于艺术创作的新人提供灵感与指导。无论您是绘画、雕塑、摄影还是其他艺术形式的创作者，都能在这里找到属于自己的空间。
                                    </p>
                                </div>
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
                        <div class=" text-lg font-bold text-primary" >
                            {{ $t('selectedWorks') }}
                        </div>
                    </div>
                    <div  class="col-sm-4 col-md-4 col md:col-1 comp-grid" >
                        <router-link :to="`/contents`">
                            <Button :label="$t('')" icon="pi pi-angle-double-right" type="button" class="p-button w-full bg-cyan-500 "  />
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section mb-3" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col-4 comp-grid" >
                        <div class="">
                            <api-data-source :enable-cache="false"   api-path="components_data/home_data_repeater" >
                                <template v-slot="req">
                                    <div >
                                        <Panel header="艺术品展示" toggleable>
                                        <template #icons>
                                            <button class="p-panel-header-icon p-link mr-2" @click="req.load">
                                            <span class="pi pi-refresh"></span>
                                            </button>
                                        </template>
                                        <!-- Loading State -->
                                        <template v-if="req.loading">
                                            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
                                        </template>
                                        <!-- Data Display -->
                                        <div v-if="req.response">
                                            <DataView :value="req.response">
                                            <template #list="{data, index}">
                                                <div class="col-12">
                                                    <router-link :to="`contents/${data.content_id}`">
                                                        <div class="flex gap-3 card  mb-4 p-3">
                                                            <!-- Artwork Image -->
                                                            <div class="flex-shrink-0">
                                                                <NiceImage v-ripple @click="app.openPageDialog({ page: 'contents/view', url: `contents/view/${data.content_id}` , closeBtn: true })" class="cursor-pointer" style="max-width:100%;width:100%;height:200px" :src="$utils.setImgUrl(data.art_image, 'medium')" />
                                                            </div>
                                                            <!-- Artwork Information -->
                                                            <div class="flex flex-column justify-between">
                                                                <div>
                                                                    <h3 class="text-900 font-bold">{{ data.title }}</h3>
                                                                </div>
                                                                <!-- Additional Info -->
                                                                <div class="mt-2">
                                                                    <div class="text-600">尺寸：{{ data.dimensions }}</div>
                                                                    <div class="text-600">创作年份：{{ data.year_created }}</div>
                                                                    <div class="text-600">媒介：{{ data.medium }}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </router-link>
                                                </div>
                                            </template>
                                            </DataView>
                                        </div>
                                        <!-- No Data State -->
                                        <div v-else>
                                            <p class="text-500">没有找到记录</p>
                                        </div>
                                        </Panel>
                                    </div>
                                </template>
                            </api-data-source>
                        </div>
                    </div>
                    <div  class="col-sm-4 col-md-4 col-4 comp-grid" >
                        <div class="">
                            <api-data-source :enable-cache="false"   api-path="components_data/home_data_repeater_2" >
                                <template v-slot="req">
                                    <div >
                                        <Panel header="艺术品展示" toggleable>
                                        <template #icons>
                                            <button class="p-panel-header-icon p-link mr-2" @click="req.load">
                                            <span class="pi pi-refresh"></span>
                                            </button>
                                        </template>
                                        <!-- Loading State -->
                                        <template v-if="req.loading">
                                            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
                                        </template>
                                        <!-- Data Display -->
                                        <div v-if="req.response">
                                            <DataView :value="req.response">
                                            <template #list="{data, index}">
                                                <div class="col-12">
                                                    <router-link :to="`/artwork/${data.content_id}`">
                                                        <div class="flex gap-3 card  mb-4 p-3">
                                                            <!-- Artwork Image -->
                                                            <div class="flex-shrink-0">
                                                                <NiceImage v-ripple @click="app.openPageDialog({ page: 'contents/view', url: `contents/view/${data.content_id}` , closeBtn: true })" class="cursor-pointer" style="max-width:100%;width:100%;height:200px" :src="$utils.setImgUrl(data.art_image, 'medium')" />
                                                            </div>
                                                            <!-- Artwork Information -->
                                                            <div class="flex flex-column justify-between">
                                                                <div>
                                                                    <h3 class="text-900 font-bold">{{ data.title }}</h3>
                                                                </div>
                                                                <!-- Additional Info -->
                                                                <div class="mt-2">
                                                                    <div class="text-600">尺寸：{{ data.dimensions }}</div>
                                                                    <div class="text-600">创作年份：{{ data.year_created }}</div>
                                                                    <div class="text-600">媒介：{{ data.medium }}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </router-link>
                                                </div>
                                            </template>
                                            </DataView>
                                        </div>
                                        <!-- No Data State -->
                                        <div v-else>
                                            <p class="text-500">没有找到记录</p>
                                        </div>
                                        </Panel>
                                    </div>
                                </template>
                            </api-data-source>
                        </div>
                    </div>
                    <div  class="col-sm-4 col-md-4 col-4 comp-grid" >
                        <div class="">
                            <api-data-source :enable-cache="false"   api-path="components_data/home_data_repeater_3" >
                                <template v-slot="req">
                                    <div >
                                        <Panel header="艺术品展示" toggleable>
                                        <template #icons>
                                            <button class="p-panel-header-icon p-link mr-2" @click="req.load">
                                            <span class="pi pi-refresh"></span>
                                            </button>
                                        </template>
                                        <!-- Loading State -->
                                        <template v-if="req.loading">
                                            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
                                        </template>
                                        <!-- Data Display -->
                                        <div v-if="req.response">
                                            <DataView :value="req.response">
                                            <template #list="{data, index}">
                                                <div class="col-12">
                                                    <router-link :to="`contents/${data.content_id}`">
                                                        <div class="flex gap-3 card  mb-4 p-3">
                                                            <!-- Artwork Image -->
                                                            <div class="flex-shrink-0">
                                                                <NiceImage v-ripple @click="app.openPageDialog({ page: 'contents/view', url: `contents/view/${data.content_id}` , closeBtn: true })" class="cursor-pointer" style="max-width:100%;width:100%;height:200px" :src="$utils.setImgUrl(data.art_image, 'medium')" />
                                                            </div>
                                                            <!-- Artwork Information -->
                                                            <div class="flex flex-column justify-between">
                                                                <div>
                                                                    <h3 class="text-900 font-bold">{{ data.title }}</h3>
                                                                </div>
                                                                <!-- Additional Info -->
                                                                <div class="mt-2">
                                                                    <div class="text-600">尺寸：{{ data.dimensions }}</div>
                                                                    <div class="text-600">创作年份：{{ data.year_created }}</div>
                                                                    <div class="text-600">媒介：{{ data.medium }}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </router-link>
                                                </div>
                                            </template>
                                            </DataView>
                                        </div>
                                        <!-- No Data State -->
                                        <div v-else>
                                            <p class="text-500">没有找到记录</p>
                                        </div>
                                        </Panel>
                                    </div>
                                </template>
                            </api-data-source>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section mb-3" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col comp-grid" >
                        <div class=" text-lg font-bold text-primary" >
                            {{ $t('featuredAuthors') }}
                        </div>
                    </div>
                    <div  class="col-sm-4 col-md-4 md:col-1 comp-grid" >
                        <router-link :to="`/artistc`">
                            <Button :label="$t('')" icon="pi pi-angle-double-right" type="button" class="p-button w-full bg-cyan-500 "  />
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section mb-3" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col-4 comp-grid" >
                        <div class="">
                            <api-data-source :enable-cache="false"   api-path="components_data/home_data_repeater_4" >
                                <template v-slot="req">
                                    <div >
                                        <Panel header="艺术家推荐" toggleable>
                                        <template #icons>
                                            <button class="p-panel-header-icon p-link mr-2" @click="req.load">
                                            <span class="pi pi-refresh"></span>
                                            </button>
                                        </template>
                                        <!-- Loading State -->
                                        <template v-if="req.loading">
                                            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
                                        </template>
                                        <!-- Data Display -->
                                        <div v-if="req.response">
                                            <DataView :value="req.response">
                                            <template #list="{data, index}">
                                                <div class="col-12">
                                                    <!-- Author Card -->
                                                    <router-link :to="`users/${data.user_id}`">
                                                        <div class="author-card flex gap-3 card  mb-4 p-3">
                                                            <!-- Author Photo -->
                                                            <div class="author-photo flex-shrink-0">
                                                                <NiceImage 
                                                                v-ripple 
                                                                @click="app.openPageDialog({ page: 'users/view', url: `/users/${data.user_id}`, closeBtn: true })"
                                                                class="cursor-pointer"
                                                                style="width: 80px; height: 80px; border-radius: 50%;"
                                                                :src="$utils.setImgUrl(data.userphoto, 'medium')" 
                                                                />
                                                            </div>
                                                            <!-- Author Name and Info -->
                                                            <div class="flex flex-column justify-between">
                                                                <div>
                                                                    <h3 class="text-900 font-bold">{{ data.username }}</h3>
                                                                    <p class="text-600">{{ data.bio || 'No bio available' }}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </router-link>
                                                </div>
                                            </template>
                                            </DataView>
                                        </div>
                                        <!-- No Data State -->
                                        <div v-else>
                                            <p class="text-500">No authors found</p>
                                        </div>
                                        </Panel>
                                    </div>
                                </template>
                            </api-data-source>
                        </div>
                    </div>
                    <div  class="col-sm-4 col-md-4 col-4 comp-grid" >
                        <div class="">
                            <api-data-source :enable-cache="false"   api-path="components_data/home_data_repeater_5" >
                                <template v-slot="req">
                                    <div >
                                        <Panel header="艺术家推荐" toggleable>
                                        <template #icons>
                                            <button class="p-panel-header-icon p-link mr-2" @click="req.load">
                                            <span class="pi pi-refresh"></span>
                                            </button>
                                        </template>
                                        <!-- Loading State -->
                                        <template v-if="req.loading">
                                            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
                                        </template>
                                        <!-- Data Display -->
                                        <div v-if="req.response">
                                            <DataView :value="req.response">
                                            <template #list="{data, index}">
                                                <div class="col-12">
                                                    <!-- Author Card -->
                                                    <router-link :to="`users/${data.user_id}`">
                                                        <div class="author-card flex gap-3 card  mb-4 p-3">
                                                            <!-- Author Photo -->
                                                            <div class="author-photo flex-shrink-0">
                                                                <NiceImage 
                                                                v-ripple 
                                                                @click="app.openPageDialog({ page: 'users/view', url: `/users/${data.user_id}`, closeBtn: true })"
                                                                class="cursor-pointer"
                                                                style="width: 80px; height: 80px; border-radius: 50%;"
                                                                :src="$utils.setImgUrl(data.userphoto, 'medium')" 
                                                                />
                                                            </div>
                                                            <!-- Author Name and Info -->
                                                            <div class="flex flex-column justify-between">
                                                                <div>
                                                                    <h3 class="text-900 font-bold">{{ data.username }}</h3>
                                                                    <p class="text-600">{{ data.bio || 'No bio available' }}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </router-link>
                                                </div>
                                            </template>
                                            </DataView>
                                        </div>
                                        <!-- No Data State -->
                                        <div v-else>
                                            <p class="text-500">No authors found</p>
                                        </div>
                                        </Panel>
                                    </div>
                                </template>
                            </api-data-source>
                        </div>
                    </div>
                    <div  class="col-sm-4 col-md-4 col-4 comp-grid" >
                        <div class="">
                            <api-data-source :enable-cache="false"   api-path="components_data/home_data_repeater_6" >
                                <template v-slot="req">
                                    <div >
                                        <Panel header="艺术家推荐" toggleable>
                                        <template #icons>
                                            <button class="p-panel-header-icon p-link mr-2" @click="req.load">
                                            <span class="pi pi-refresh"></span>
                                            </button>
                                        </template>
                                        <!-- Loading State -->
                                        <template v-if="req.loading">
                                            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
                                        </template>
                                        <!-- Data Display -->
                                        <div v-if="req.response">
                                            <DataView :value="req.response">
                                            <template #list="{data, index}">
                                                <div class="col-12">
                                                    <!-- Author Card -->
                                                    <router-link :to="`users/${data.user_id}`">
                                                        <div class="author-card flex gap-3 card  mb-4 p-3">
                                                            <!-- Author Photo -->
                                                            <div class="author-photo flex-shrink-0">
                                                                <NiceImage 
                                                                v-ripple 
                                                                @click="app.openPageDialog({ page: 'users/view', url: `/users/${data.user_id}`, closeBtn: true })"
                                                                class="cursor-pointer"
                                                                style="width: 80px; height: 80px; border-radius: 50%;"
                                                                :src="$utils.setImgUrl(data.userphoto, 'medium')" 
                                                                />
                                                            </div>
                                                            <!-- Author Name and Info -->
                                                            <div class="flex flex-column justify-between">
                                                                <div>
                                                                    <h3 class="text-900 font-bold">{{ data.username }}</h3>
                                                                    <p class="text-600">{{ data.bio || 'No bio available' }}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </router-link>
                                                </div>
                                            </template>
                                            </DataView>
                                        </div>
                                        <!-- No Data State -->
                                        <div v-else>
                                            <p class="text-500">No authors found</p>
                                        </div>
                                        </Panel>
                                    </div>
                                </template>
                            </api-data-source>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section mb-3" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col comp-grid" >
                        <div class=" text-lg font-bold text-primary" >
                            {{ $t('artistLife') }}
                        </div>
                    </div>
                    <div  class="col-sm-4 col-md-4 md:col-1 comp-grid" >
                        <router-link :to="`/othercontents`">
                            <Button :label="$t('')" icon="pi pi-angle-double-right" type="button" class="p-button w-full bg-cyan-500 "  />
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section mb-3" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col-6 comp-grid" >
                        <div class="">
                            <api-data-source :enable-cache="false"   api-path="components_data/home_data_repeater_7" >
                                <template v-slot="req">
                                    <div >
                                        <Panel header="艺术家分享" toggleable>
                                        <template #icons>
                                            <button class="p-panel-header-icon p-link mr-2" @click="req.load">
                                            <span class="pi pi-refresh"></span>
                                            </button>
                                        </template>
                                        <template v-if="req.loading">
                                            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
                                        </template>
                                        <div v-if="req.response">
                                            <DataView :value="req.response">
                                            <template #list="{ data, index }">
                                                <div class="col-12">
                                                    <router-link :to="`/other_contents/view/${data.other_content_id}`">
                                                        <div class="flex gap-3 card  mb-2">
                                                            <!-- 左侧动态展示视频或文件 -->
                                                            <div class="flex-shrink-0">
                                                                <!-- 判断是否有视频内容 -->
                                                                <div v-if="data.media_hash && data.media_hash.endsWith('.mp4')">
                                                                    <video controls width="300" height="200">
                                                                    <source :src="$utils.getFileFullPath(data.media_hash)" type="video/mp4" />
                                                                    Your browser does not support the video element.
                                                                    </video>
                                                                </div>
                                                                <!-- 判断文件是否为图片并显示 -->
                                                                <div v-else-if="data.file_hash && /\.(png|jpe?g|gif|bmp)$/i.test(data.file_hash)">
                                                                    <img 
                                                                    :src="$utils.getFileFullPath(data.file_hash)" 
                                                                    alt="文件图片" 
                                                                    class="w-10rem h-10rem border-round" 
                                                                    />
                                                                </div>
                                                                <!-- 判断文件是否为 PDF 并嵌入显示 -->
                                                                <div v-else-if="data.file_hash && data.file_hash.endsWith('.pdf')">
                                                                    <iframe 
                                                                    :src="$utils.getFileFullPath(data.file_hash)" 
                                                                    width="300" 
                                                                    height="200" 
                                                                    class="border-round"
                                                                    >
                                                                    This browser does not support PDFs. 
                                                                    <a :href="$utils.getFileFullPath(data.file_hash)">Download PDF</a>
                                                                    </iframe>
                                                                </div>
                                                                <!-- 如果是其他文件类型，仍使用通用方式展示 -->
                                                                <div v-else-if="data.file_hash">
                                                                    <embed 
                                                                    :src="$utils.getFileFullPath(data.file_hash)" 
                                                                    width="300" 
                                                                    height="200" 
                                                                    class="border-round"
                                                                    />
                                                                </div>
                                                                <!-- 如果都没有内容，显示占位图标 -->
                                                                <i v-else class="pi pi-file" style="font-size: 2rem;"></i>
                                                            </div>
                                                            <!-- 右侧内容 -->
                                                            <div class="flex-grow-1">
                                                                <h4 class="text-900 font-bold mb-1">{{ data.title || '未知标题' }}</h4>
                                                                <p class="text-700 mb-0">作者: {{ data.username || '匿名' }}</p>
                                                                <p class="text-500 text-sm mt-1">
                                                                {{ data.media_hash ? '视频已上传' : data.file_hash ? '文件已上传' : '暂无内容' }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </router-link>
                                                </div>
                                            </template>
                                            </DataView>
                                        </div>
                                        <div v-else>
                                            <p class="text-500">暂无分享内容</p>
                                        </div>
                                        </Panel>
                                    </div>
                                </template>
                            </api-data-source>
                        </div>
                    </div>
                    <div  class="col-sm-4 col-md-4 col-6 comp-grid" >
                        <div class="">
                            <api-data-source :enable-cache="false"   api-path="components_data/home_data_repeater_8" >
                                <template v-slot="req">
                                    <div >
                                        <Panel header="艺术家分享" toggleable>
                                        <template #icons>
                                            <button class="p-panel-header-icon p-link mr-2" @click="req.load">
                                            <span class="pi pi-refresh"></span>
                                            </button>
                                        </template>
                                        <template v-if="req.loading">
                                            <ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
                                        </template>
                                        <div v-if="req.response">
                                            <DataView :value="req.response">
                                            <template #list="{ data, index }">
                                                <div class="col-12">
                                                    <router-link :to="`/other_contents/view/${data.other_content_id}`">
                                                        <div class="flex gap-3 card  mb-2">
                                                            <!-- 左侧动态展示视频或文件 -->
                                                            <div class="flex-shrink-0">
                                                                <!-- 判断是否有视频内容 -->
                                                                <div v-if="data.media_hash && data.media_hash.endsWith('.mp4')">
                                                                    <video controls width="300" height="200">
                                                                    <source :src="$utils.getFileFullPath(data.media_hash)" type="video/mp4" />
                                                                    Your browser does not support the video element.
                                                                    </video>
                                                                </div>
                                                                <!-- 判断文件是否为图片并显示 -->
                                                                <div v-else-if="data.file_hash && /\.(png|jpe?g|gif|bmp)$/i.test(data.file_hash)">
                                                                    <img 
                                                                    :src="$utils.getFileFullPath(data.file_hash)" 
                                                                    alt="文件图片" 
                                                                    class="w-10rem h-10rem border-round" 
                                                                    />
                                                                </div>
                                                                <!-- 判断文件是否为 PDF 并嵌入显示 -->
                                                                <div v-else-if="data.file_hash && data.file_hash.endsWith('.pdf')">
                                                                    <iframe 
                                                                    :src="$utils.getFileFullPath(data.file_hash)" 
                                                                    width="300" 
                                                                    height="200" 
                                                                    class="border-round"
                                                                    >
                                                                    This browser does not support PDFs. 
                                                                    <a :href="$utils.getFileFullPath(data.file_hash)">Download PDF</a>
                                                                    </iframe>
                                                                </div>
                                                                <!-- 如果是其他文件类型，仍使用通用方式展示 -->
                                                                <div v-else-if="data.file_hash">
                                                                    <embed 
                                                                    :src="$utils.getFileFullPath(data.file_hash)" 
                                                                    width="300" 
                                                                    height="200" 
                                                                    class="border-round"
                                                                    />
                                                                </div>
                                                                <!-- 如果都没有内容，显示占位图标 -->
                                                                <i v-else class="pi pi-file" style="font-size: 2rem;"></i>
                                                            </div>
                                                            <!-- 右侧内容 -->
                                                            <div class="flex-grow-1">
                                                                <h4 class="text-900 font-bold mb-1">{{ data.title || '未知标题' }}</h4>
                                                                <p class="text-700 mb-0">作者: {{ data.username || '匿名' }}</p>
                                                                <p class="text-500 text-sm mt-1">
                                                                {{ data.media_hash ? '视频已上传' : data.file_hash ? '文件已上传' : '暂无内容' }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </router-link>
                                                </div>
                                            </template>
                                            </DataView>
                                        </div>
                                        <div v-else>
                                            <p class="text-500">暂无分享内容</p>
                                        </div>
                                        </Panel>
                                    </div>
                                </template>
                            </api-data-source>
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
                            <footer class="footer bg-gray-900 text-white py-6">
                            <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                                <!-- 关于我们 -->
                                <div class="footer-section">
                                    <h5 class="text-lg font-bold mb-3">关于我们</h5>
                                    <p class="text-sm text-gray-400">
                                    艺术分享平台致力于为艺术家和艺术爱好者提供一个展示创意、分享灵感的互动社区。探索艺术，传递美。
                                    </p>
                                </div>
                                <!-- 艺术推荐 -->
                                <div class="footer-section art-recommendation">
                                    <h5 class="text-lg font-bold mb-3">艺术推荐</h5>
                                    <ul>
                                        <li><a href="/featured-works">精彩作品</a></li>
                                        <li><a href="/top-artists">顶级艺术家</a></li>
                                        <li><a href="/gallery">画廊精选</a></li>
                                        <li><a href="/events">艺术活动</a></li>
                                    </ul>
                                </div>
                                <!-- 社交媒体 -->
                                <div class="footer-section">
                                    <h5 class="text-lg font-bold mb-3">关注我们</h5>
                                    <div class="flex space-x-4">
                                        <a href="https://facebook.com" target="_blank" class="text-gray-400 hover:text-white">
                                            <i class="pi pi-facebook text-2xl"></i>
                                        </a>
                                        <a href="https://twitter.com" target="_blank" class="text-gray-400 hover:text-white">
                                            <i class="pi pi-twitter text-2xl"></i>
                                        </a>
                                        <a href="https://instagram.com" target="_blank" class="text-gray-400 hover:text-white">
                                            <i class="pi pi-instagram text-2xl"></i>
                                        </a>
                                        <a href="https://youtube.com" target="_blank" class="text-gray-400 hover:text-white">
                                            <i class="pi pi-youtube text-2xl"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <!-- 底部版权信息 -->
                            <div class="mt-6 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
                                &copy; 2025 艺术分享平台. 版权所有. | <a href="/privacy" class="text-gray-300 hover:text-white">隐私政策</a> | <a href="/terms" class="text-gray-300 hover:text-white">使用条款</a>
                            </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

</template>
<script setup>
	import {  ref } from 'vue';
	
	import { utils } from 'src/utils';
	import { useApp } from 'src/composables/app.js';
	
	import { $t } from 'src/services/i18n';
	
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
	document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".carousel-images img"); // 获取所有图片
    const prevButton = document.getElementById("prev-btn"); // 获取前一个按钮
    const nextButton = document.getElementById("next-btn"); // 获取下一个按钮
    const pagination = document.getElementById("pagination"); // 获取分页器容器
    const totalImages = images.length; // 获取图片的总数
    let currentIndex = 0; // 当前显示的图片索引
    
    // 创建分页器按钮
    for (let i = 0; i < totalImages; i++) {
        const dot = document.createElement("span");
        dot.classList.add(i === 0 ? "active" : ""); // 默认第一个分页器按钮为激活状态
        dot.addEventListener("click", () => showImage(i)); // 点击分页器按钮时跳转到相应的图片
        pagination.appendChild(dot);
    }
    
    const dots = document.querySelectorAll(".pagination span"); // 获取所有分页器按钮
    
    // 显示图片的方法
    function showImage(index) {
        currentIndex = index;
        const offset = -100 * currentIndex; // 计算图片容器的偏移量
        document.querySelector(".carousel-images").style.transform = `translateX(${offset}%)`;
        
        // 更新分页器的样式
        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");
    }
    
    // 显示上一张图片
    function showPrev() {
        currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
        showImage(currentIndex);
    }
    
    // 显示下一张图片
    function showNext() {
        currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
        showImage(currentIndex);
    }
    
    // 自动播放功能
    let autoPlay = setInterval(showNext, 3000); // 每3秒切换一次图片
    
    // 鼠标悬停时停止自动播放
    document.querySelector(".carousel-container").addEventListener("mouseenter", function() {
        clearInterval(autoPlay);
    });
    
    // 鼠标移出时恢复自动播放
    document.querySelector(".carousel-container").addEventListener("mouseleave", function() {
        autoPlay = setInterval(showNext, 3000);
    });
    
    // 给箭头按钮添加事件监听
    prevButton.addEventListener("click", showPrev);
    nextButton.addEventListener("click", showNext);
    
    // 初始化显示第一张图片
    showImage(currentIndex);
});
// 实现文件下载
async function downloadFile(fileHash) {
            const fileUrl = this.$utils.getFileFullPath(fileHash);
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = fileHash.split('/').pop(); // 提取文件名
            link.click();
        }
  

</script>
<style scoped>
/* 设置轮播图容器的大小和位置 */
.carousel-container {
    position: relative;
    width: 90%; /* 宽度可根据需要调整 */
    margin: 0 auto; /* 居中对齐 */
    overflow: hidden;
}
/* 图片容器 */
.carousel-images {
    display: flex;
    transition: transform 0.5s ease-in-out; /* 平滑过渡 */
}
/* 图片 */
.carousel-images img {
    width: 100%;
    height: auto;
    flex-shrink: 0; /* 防止图片缩放 */
}
/* 上下箭头按钮 */
.nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    font-size: 30px;
    padding: 10px;
    cursor: pointer;
    z-index: 1;
}
#prev-btn {
    left: 10px;
}
#next-btn {
    right: 10px;
}
/* 分页器 */
.pagination {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
}
.pagination span {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s;
}
.pagination span.active {
    background-color: rgba(255, 255, 255, 1);
}
.pagination span:hover {
    background-color: rgba(255, 255, 255, 0.9);
}
/* 基本样式：全局设置 */
body {
    font-family: Arial, sans-serif; /* 设置字体 */
    margin: 0;
    padding: 0;
    background-color: #f4f4f9; /* 背景色 */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* 页面最小高度为100vh */
    box-sizing: border-box;
}
/* 容器样式 */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; /* 容器宽度100% */
    padding: 20px;
}
/* 右侧内容区域 */
.right-side {
    background-color: white;
    padding: 30px;
    border-radius: 8px; /* 圆角边框 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 添加阴影 */
    max-width: 800px; /* 最大宽度 */
    width: 100%;
    box-sizing: border-box;
    text-align: left;
}
/* 标题样式 */
.right-side h1 {
    font-size: 32px;
    color: #333; /* 标题颜色 */
    margin-bottom: 20px;
}
/* 段落样式 */
.right-side p {
    font-size: 16px;
    color: #666; /* 段落文字颜色 */
    line-height: 1.6; /* 行间距 */
    margin-bottom: 20px; /* 段落之间的间距 */
}
/* 段落最后一行的样式，防止有多余的底部间距 */
.right-side p:last-child {
    margin-bottom: 0;
}
/* 增加响应式设计 */
@media (max-width: 768px) {
    .container {
        padding: 10px; /* 调整容器内边距 */
    }
    .right-side {
        padding: 20px; /* 调整右侧区域内边距 */
        max-width: 100%; /* 确保在小屏幕下容器不超出宽度 */
    }
    .right-side h1 {
        font-size: 28px; /* 减小标题字体 */
    }
    .right-side p {
        font-size: 14px; /* 调整段落文字大小 */
    }
}
/* Panel容器样式 */
.p-panel-header-icon {
    border: none;
    background: none;
    cursor: pointer;
}
/* 设置卡片（content）的样式 */
. {
    border-radius: 8px; /* 圆角效果 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 增加阴影效果 */
    transition: box-shadow 0.3s ease; /* 添加过渡效果 */
}
.:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2); /* 鼠标悬停时阴影效果加深 */
}
/* art-photo 容器的样式，确保图片在容器中固定尺寸 */
.art-photo {
    width: 200px; /* 固定宽度 */
    height: 200px; /* 固定高度 */
    overflow: hidden; /* 确保图片不溢出 */
    border-radius: 4px; /* 可选，设置圆角 */
    display: inline-block; /* 确保容器不会扩展超过设置的尺寸 */
}
/* NiceImage 图片样式，确保图片填充容器，保持比例 */
.art-photo .NiceImage {
    width: 100%; /* 让图片宽度填满容器 */
    height: 100%; /* 让图片高度填满容器 */
    object-fit: cover; /* 保持图片比例，裁剪多余部分 */
    display: block; /* 防止图片下方出现空隙 */
}
/* 文字排版 */
.text-900 {
    color: #333;
    font-size: 18px;
    font-weight: bold;
}
.text-600 {
    color: #666;
    font-size: 14px;
}
.text-500 {
    color: #999;
}
/* 数据显示卡片内布局 */
.flex {
    display: flex;
}
.gap-3 {
    gap: 1rem; /* 设置元素之间的间距 */
}
.flex-column {
    flex-direction: column;
}
.flex-shrink-0 {
    flex-shrink: 0;
}
.mb-4 {
    margin-bottom: 1.5rem;
}
.p-3 {
    padding: 1rem;
}
/* 设置尺寸、创作年份、媒介等文字的间距 */
.mt-2 {
    margin-top: 0.5rem;
}
.card {
    display: flex;
    align-items: center; /* 图片和文字垂直对齐 */
    flex-wrap: wrap; /* 在小屏幕时允许换行 */
}
.col-12 {
    width: 100%;
}
/* Loading状态的样式 */
p-progressbar {
    height: 6px;
}
/* 响应式设计 */
@media (max-width: 768px) {
    .card {
        flex-direction: column; /* 在小屏幕下，卡片改为垂直排列 */
        align-items: center; /* 内容居中 */
    }
    .art-photo {
        width: 150px; /* 在小屏幕下，图片宽度变小 */
        height: 150px; /* 在小屏幕下，图片高度变小 */
    }
    .text-900 {
        font-size: 16px; /* 在小屏幕下，标题字体略微减小 */
    }
    .text-600, .text-500 {
        font-size: 12px; /* 在小屏幕下，其他文本字体略微减小 */
    }
}
/* 基本样式：Panel容器 */
.p-panel-header-icon {
    border: none;
    background: none;
    cursor: pointer;
}
/* 卡片容器 */
. {
    border-radius: 8px; /* 圆角效果 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
    transition: box-shadow 0.3s ease; /* 添加过渡效果 */
}
.:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2); /* 鼠标悬停时，阴影效果加深 */
}
/* 数据列表的样式 */
.author-card {
    display: flex;
    align-items: center;
    background-color: white;
    padding: 15px;
    margin-bottom: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* 卡片阴影 */
    cursor: pointer;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
}
.author-card:hover {
    transform: scale(1.03); /* 鼠标悬停时卡片略微放大 */
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); /* 加深阴影 */
}
/* 作者头像 */
.author-photo {
    flex-shrink: 0;
}
.NiceImage {
    width: 80px;
    height: 80px;
    border-radius: 50%; /* 圆形头像 */
    object-fit: cover; /* 保证图片按比例填充并裁剪 */
}
/* 作者信息部分 */
.author-card .flex {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 15px;
}
.text-900 {
    font-size: 18px;
    color: #333;
    font-weight: bold;
    margin-bottom: 8px;
}
.text-600 {
    color: #666;
    font-size: 14px;
    line-height: 1.4;
}
/* "No Data" 文本 */
.text-500 {
    color: #999;
    font-size: 14px;
    text-align: center;
    padding: 20px;
}
/* Loading状态 */
p-progressbar {
    height: 6px;
    margin-bottom: 20px;
}
/* 响应式设计：确保在小屏幕上显示合适 */
@media (max-width: 768px) {
    .author-card {
        flex-direction: column; /* 在小屏幕上，卡片改为垂直布局 */
        align-items: center;
    }
    .author-card .flex {
        align-items: center; /* 垂直排列时，文字居中 */
        text-align: center;
        margin-left: 0;
    }
    .NiceImage {
        width: 60px;
        height: 60px; /* 在小屏幕上头像尺寸稍微变小 */
    }
    .text-900 {
        font-size: 16px; /* 标题字体在小屏幕上略小 */
    }
    .text-600 {
        font-size: 13px; /* 描述文字略小 */
    }
}
/* 基础样式 */
.footer {
    background-color: #f9f9f9; /* 浅色背景 */
    color: #333333; /* 深灰色文字 */
    padding: 2rem 0;
}
/* 每个区块的样式 */
.footer-section h5 {
    font-size: 1.125rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #333333; /* 深灰色标题 */
}
.footer-section p {
    font-size: 0.875rem;
    color: #666666; /* 中等灰色文字 */
    line-height: 1.5;
}
/* 链接样式 */
.footer-section a {
    font-size: 0.875rem;
    color: #666666; /* 中等灰色链接 */
    text-decoration: none;
    transition: color 0.3s;
}
.footer-section a:hover {
    color: #007BFF; /* 蓝色悬停效果 */
}
/* 艺术推荐部分 */
.footer-section .art-recommendation {
    font-size: 0.875rem;
}
.footer-section .art-recommendation ul {
    list-style: none;
    padding: 0;
}
.footer-section .art-recommendation li {
    margin-bottom: 0.75rem;
}
.footer-section .art-recommendation a {
    color: #666666;
    text-decoration: none;
    transition: color 0.3s;
}
.footer-section .art-recommendation a:hover {
    color: #007BFF;
}
/* 社交媒体图标样式 */
.footer-section .flex a {
    font-size: 1.5rem; /* 图标大小 */
    margin-right: 1rem; /* 图标间距 */
    color: #666666; /* 中等灰色图标 */
    transition: color 0.3s;
}
.footer-section .flex a:hover {
    color: #007BFF; /* 蓝色悬停效果 */
}
/* 网格布局容器 */
.footer .container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr; /* 默认单列 */
    gap: 2rem;
}
/* 中等屏幕及以上使用三列布局 */
@media (min-width: 768px) {
    .footer .container {
        grid-template-columns: repeat(3, 1fr); /* 三列布局 */
    }
}
/* 底部版权信息 */
.footer .mt-6 {
    margin-top: 1.5rem;
    border-top: 1px solid #ddd; /* 浅灰色分隔线 */
    padding-top: 1rem;
    text-align: center;
    font-size: 0.875rem;
    color: #666666; /* 中等灰色文字 */
}
.footer .mt-6 a {
    color: #007BFF; /* 蓝色链接 */
    text-decoration: none;
    transition: color 0.3s;
}
.footer .mt-6 a:hover {
    color: #0056b3; /* 深蓝色悬停效果 */
}
</style>
