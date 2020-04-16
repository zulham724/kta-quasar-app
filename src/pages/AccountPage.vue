<template>
  <div>
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-icon name="person_outline" color="teal" size="sm" />
        <q-toolbar-title>
          <div class="text-body1 text-teal text-bold">{{ Auth.auth.name }}</div>
        </q-toolbar-title>
        <q-space />
        <q-btn
          flat
          dense
          icon="more_vert"
          color="teal"
          @click="drawer = true"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      side="right"
      v-model="drawer"
      show-if-above
      bordered
      :width="200"
      :breakpoint="500"
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="help_outline" size="xs" color="teal" />
            </q-item-section>

            <q-item-section>
              <div class="text-caption">Informasi</div>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="logout" size="xs" color="teal" />
            </q-item-section>

            <q-item-section>
              <div class="text-caption">Logout</div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <q-page>
        <q-pull-to-refresh @refresh="getAuth" color="teal">
          <div class="q-pa-md">
            <div class="row">
              <div class="col-3">
                <div class="row justify-start align-center">
                  <q-avatar size="20vw">
                    <img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" />
                  </q-avatar>
                </div>
              </div>
              <div class="col-3 self-center">
                <div class="row justify-center">
                  <div class="text-body1 text-bold">
                    {{ Auth.auth.posts.length }}
                  </div>
                </div>
                <div class="row justify-center">
                  <div class="text-body2">Diskusi</div>
                </div>
              </div>
              <div class="col-3 self-center">
                <div class="row justify-center">
                  <div class="text-body1 text-bold">
                    {{ Auth.auth.guest_events.length }}
                  </div>
                </div>
                <div class="row justify-center">
                  <div class="text-body2">Hadir acara</div>
                </div>
              </div>
              <div class="col-3 self-center">
                <div class="row justify-center">
                  <div class="text-body1 text-bold">
                    {{ Auth.auth.books_count }}
                  </div>
                </div>
                <div class="row justify-center">
                  <div class="text-body2">Buku Digital</div>
                </div>
              </div>
            </div>
            <div class="row q-pt-md">
              <div class="text-body2 q-pb-sm" v-if="Auth.auth.kta_id">
                No Anggota: {{ Auth.auth.kta_id }}
              </div>
            </div>
            <div class="row">
              <div class="text-caption">
                {{ Auth.auth.profile.long_bio }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <q-btn-group spread>
                <q-btn
                  dense
                  label="Edit Profile"
                  @click="$router.push('/account/edit')"
                />
                <q-btn
                  dense
                  :label="selected_view_post.label"
                  @click="
                    selected_view_post.value == view_posts[0].value
                      ? (selected_view_post = view_posts[1])
                      : (selected_view_post = view_posts[0])
                  "
                />
              </q-btn-group>
            </div>
          </div>
          <post-photo-component
            v-if="selected_view_post.value == 'text'"
          ></post-photo-component>
          <post-text-component
            v-if="selected_view_post.value == 'photo'"
          ></post-text-component>
        </q-pull-to-refresh>
      </q-page>
    </q-page-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    PostPhotoComponent: () =>
      import("components/account/PostPhotoComponent.vue"),
    PostTextComponent: () => import("components/account/PostTextComponent.vue")
  },
  data() {
    return {
      drawer: false,
      view_posts: [
        {
          label: "Post Gambar",
          value: "photo"
        },
        {
          label: "Post Teks",
          value: "text"
        }
      ],
      selected_view_post: {
        label: "Post Teks",
        value: "text"
      }
    };
  },
  methods: {
    getAuth(done) {
      this.$store.dispatch("Auth/getAuth").then(res => {
        done();
      });
    }
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  }
};
</script>

<style></style>
