<template>
  <div>
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-btn
          color="teal"
          flat
          dense
          icon="arrow_back"
          @click="$router.back()"
        />
        <q-toolbar-title>
          <div class="text-body2 text-teal text-bold">Postingan</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page v-if="user != null">
      <q-pull-to-refresh @refresh="getUser" color="teal">
        <div class="q-pt-sm row items-start q-gutter-sm">
          <div v-if="loading" style="width:100%">
            <q-card
              flat
              bordered
              class="q-mt-sm"
              style="width:100%"
              v-for="n in 3"
              :key="`loading-${n}`"
              f
            >
              <q-item>
                <q-item-section avatar>
                  <q-skeleton type="QAvatar" animation="fade" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    <q-skeleton type="text" animation="fade" />
                  </q-item-label>
                  <q-item-label caption>
                    <q-skeleton type="text" animation="fade" />
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-skeleton height="200px" square animation="fade" />

              <q-card-section>
                <q-skeleton
                  type="text"
                  class="text-subtitle2"
                  animation="fade"
                />
                <q-skeleton
                  type="text"
                  width="50%"
                  class="text-subtitle2"
                  animation="fade"
                />
              </q-card-section>
            </q-card>
          </div>
          <q-intersection
            v-for="post in user.bookmark_posts.filter(
              item => item.files.length
            )"
            :key="post.id"
            :style="`min-height: 80vh;width: 100vw`"
            :id="`post${post.id}`"
          >
            <item-component :post="post"></item-component>
          </q-intersection>
        </div>
      </q-pull-to-refresh>
    </q-page>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ImageZoomer from "components/ImageZoomerComponent.vue";
import { scroll } from "quasar";
const { getScrollTarget, setScrollPosition } = scroll;

export default {
  props: {
    userId: null,
    postId: null
  },
  components: {
    ItemComponent: () => import("components/post/ItemComponent.vue")
  },
  created() {
    this.getUser().then(res => {
      this.handleScroll();
    });
  },
  mounted() {},
  data() {
    return {
      user: null,
      loading: false
    };
  },
  methods: {
    handleScroll() {
      const ele = document.getElementById(`post${this.postId}`); // You need to get your element here
      // console.log(ele)
      const target = getScrollTarget(ele);
      const offset = ele.offsetTop;
      const duration = 10;
      setScrollPosition(target, offset, duration);
    },
    getUser(done) {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("User/show", this.userId)
          .then(res => {
            this.user = res.data;
            resolve(res);
            if (done) done();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    onLogout() {
      this.$router.push("/login").then(() => {
        this.$store.dispatch("Auth/logout");
      });
    },
    zoom(src) {
      this.$q
        .dialog({
          component: ImageZoomer,
          parent: this,
          src: src
        })
        .onOk(() => {
          console.log("OK");
        })
        .onCancel(() => {
          console.log("Cancel");
        })
        .onDismiss(() => {
          console.log("Called on OK or Cancel");
        });
    }
  },
  computed: {
    ...mapState(["Setting", "Auth"])
  }
};
</script>

<style></style>
