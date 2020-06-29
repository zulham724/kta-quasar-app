// In your main vue file - the one where you create the initial vue instance.
import Vue from 'vue'
import VuePlyr from 'vue-plyr'

// The second argument is optional and sets the default config values for every player.
Vue.use(VuePlyr, {
    plyr: {
        fullscreen: { enabled: false },
        ratio: '1:1',
    },
    emit: ['ended']
})