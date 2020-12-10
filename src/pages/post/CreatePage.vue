<template>
<q-layout view="hHh Lpr fFf">
    <q-header elevated>
        <q-toolbar class="bg-white">
            <q-btn color="teal" flat dense icon="arrow_back" @click="$router.back()" />
            <q-toolbar-title>
                <div class="text-body2 text-teal text-bold">Buat Diskusi</div>
            </q-toolbar-title>
            <q-space />
            <q-btn color="teal" flat label="Posting" @click="store()" :loading="loading" :disable="loading" />
        </q-toolbar>
    </q-header>

    <q-page-container>
        <div class="q-pa-md">
            <q-form ref="form" @submit="onSubmit" class="q-gutter-md">
                <div class="row">
                    <div class="col-2 self-center">
                        <q-avatar size="lg">
                            <img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" />
                        </q-avatar>
                    </div>
                    <div class="col=10 self-center">
                        {{ Auth.auth.name }}
                    </div>
                </div>
                <q-input color="teal" v-model="post.body" type="textarea" outlined autogrow label="Diskusi hari ini*" lazy-rules :rules="[val => (val && val.length > 0) || 'Please type something']" />
                <div class="row justify-end q-ma-none">
                    <q-fab flat color="teal" icon="add_photo_alternate" direction="down" external-label vertical-actions-align="right">
                        <q-fab-action label-position="left" external-label color="teal" text-color="white" icon="photo" label="Photos & Videos" @click="browsePhotosVideos" />
                        <q-fab-action label-position="left" external-label color="teal" text-color="white" icon="note_add" label="File" @click="browseFile" />
                    </q-fab>
                    <!--<q-btn size="md" color="teal" flat icon="add_photo_alternate" @click="$refs.selectfiles.pickFiles()"></q-btn>-->
                    <q-file v-show="false" :label="filePickerLabel" dense v-model="files" filled :multiple="isMultipleFile" ref="selectfiles" outlined @input="check()" bg-color="transparent" display-value color="teal">
                    </q-file>
                </div>
                <div v-if="selectType=='photos_videos'">
                    <div class="list row">
                        <sortable v-for="(item, index) in files" :key="index" v-model="dragData" :index="index" @sortend="sortend($event, files)" :class="files.filter(item=>item.type.includes('video')).length ? 'col-12' : 'col-6'">
                            <div class="q-pa-sm">
                                <q-img :src="item.src" :ratio="1" v-if="item.type.includes('image')">
                                    <q-badge color="white" v-if="!files.filter(item=>item.type.includes('video')).length" floating outline>{{
                      index + 1
                    }}</q-badge>
                                    <q-btn style="position:absolute; bottom:0;right:0" color="red" flat dense icon="close" @click="removeFile(index)" />
                                </q-img>
                                <q-card v-if="item.type.includes('video')">
                                    <q-card-section class="q-pa-none">
                                        <vue-plyr v-if="item.type.includes('video')">
                                            <video preload="metadata" :src="`${item.src}#t=0.1}`" style="margin-left:auto;margin-right:auto;display:block;height:90vw">
                                            </video>
                                        </vue-plyr>
                                    </q-card-section>
                                </q-card>
                            </div>
                        </sortable>
                    </div>
                </div>
                <div v-else-if="selectType=='file'">
                    <q-input v-if="files" filled :value="files.name" readonly>
                        <template v-slot:prepend>
                            <q-icon name=" note" @click.stop />
                        </template>
                        <template v-slot:append>
                            <q-icon name="close" @click.stop="removeFile(0)" class="cursor-pointer" />
                        </template>

                    </q-input>
                </div>
            </q-form>
        </div>
    </q-page-container>
</q-layout>
</template>

<script>
import {
    mapState
} from "vuex";
import Sortable from "vue-drag-sortable";
export default {
    components: {
        Sortable
    },
    computed: {
        ...mapState(["Setting", "Auth"])
    },
    data() {
        return {
            loading: false,
            post: {},
            files: [],
            dragData: {},
            filePickerLabel: 'Tambahkan foto/ gambar',
            isMultipleFile: true,
            selectType: '-',
            model: ''
        };
    },
    mounted() {},
    methods: {
        removeFile(index) {
            //alert(this.isMultipleFile)
            if (this.isMultipleFile) this.files.splice(index, 1);
            else this.files = null;
        },
        browsePhotosVideos() {
            this.filePickerLabel = 'Tambahkan foto/ gambar';
            this.isMultipleFile = true;
            //this.$forceUpdate();
            this.$refs.selectfiles.pickFiles()
        },
        browseFile() {
            this.filePickerLabel = 'Tambahkan file';
            this.isMultipleFile = false;
            //alert(this.isMultipleFile);
            //this.$forceUpdate();
            this.$refs.selectfiles.pickFiles()
        },
        onSubmit() {},
        check() {

            this.images = [];
            //console.log(this.files)
            if (this.isMultipleFile) {
                this.selectType = 'photos_videos'
                this.files.map((file, f) => {
                    this.toBase64(file).then(res => {
                        file.src = res;
                        this.$forceUpdate();
                        return file;
                    });
                });
            } else {
                this.selectType = 'file';
                //console.log(!process.env.DEV);
            }
        },
        toBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },
        store() {
            this.$refs.form.validate().then(success => {
                if (success) {
                    if (this.selectType == 'photos_videos') {
                        if (this.files.filter(file => file.size > 100000000).length) {
                            this.$q.notify('File anda terlalu besar, maksimal size upload 100MB')
                            return false
                        }
                    } else if (this.selectType == 'file') {
                        if (this.files.size > 100000000) {
                            this.$q.notify('File anda terlalu besar, maksimal size upload 100MB')
                            return false
                        }
                    }

                    this.loading = true;
                    this.$q.notify("Tunggu sebentar");
                    this.$router.back();
                    let formData = new FormData();
                    if (this.selectType == 'photos_videos') {
                        this.files.forEach(file => {
                            formData.append("files[]", file);
                        });
                    } else if (this.selectType == 'file') {
                        formData.append('is_file', true);
                        formData.append("files", this.files);
                    }
                    formData.append("title", "KTA POST");
                    formData.append("body", this.post.body);
                    formData.append("status", "PUBLISHED");
                    formData.append("featured", 0);

                    this.$store
                        .dispatch("Post/store", formData)
                        .then(res => {
                            if (!process.env.DEV) this.sendNotif(res.data)
                            this.$store.dispatch("Auth/getAuth").then(res => {
                                this.$store.dispatch('Notif/init')
                            })
                            this.$q.notify("Berhasil")
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                }
            });
        },
        sendNotif(post) {
            const payload = {
                title: `AGPAII DIGITAL`,
                body: `Postingan baru dari ${this.Auth.auth.name} - ${this.post.body}`,
                params: {
                    sender_id: this.Auth.auth.id,
                    target_id: post.id,
                    target_type: `Post`,
                    text: `Postingan baru dari ${this.Auth.auth.name} - ${this.post.body}`
                },
                to: `/topics/posts`
            };
            this.$store.dispatch("Notif/send", payload).then(res => {
                console.log(res);
            });
        },
        click(e) {
            // Todo
        },
        sort(e) {
            const {
                oldIndex,
                newIndex
            } = e;
            console.log(oldIndex, newIndex);
        },
        sortend(e, list) {
            const {
                oldIndex,
                newIndex
            } = e;
            this.rearrange(list, oldIndex, newIndex);
        },
        rearrange(array, oldIndex, newIndex) {
            if (oldIndex > newIndex) {
                array.splice(newIndex, 0, array[oldIndex]);
                array.splice(oldIndex + 1, 1);
            } else {
                array.splice(newIndex + 1, 0, array[oldIndex]);
                array.splice(oldIndex, 1);
            }
        }
    }
};
</script>

<style>
.list {
    position: relative;
    /* position of list container must be set to `relative` */
}

/* dragging item will be added with a `dragging` class */
/* so you can use this class to define the appearance of it */
.list>*.dragging {
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
}
</style>
