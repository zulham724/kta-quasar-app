import multiguard from 'vue-router-multiguard'
import store from './../store'

// cek auth apakah sudah login atau belum
const auth = function(to, from, next) {
    let isLoggedIn = store().getters['Auth/isLoggedIn']
    if (isLoggedIn) {
        next()
    } else {
        next('/login')
    }
}

const routes = [{
        path: '/',
        beforeEnter: multiguard([auth]),
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
            path: '',
            name: 'home',
            component: () =>
                import ('pages/HomePage.vue')
        }, {
            name: 'account',
            path: 'account',
            component: () =>
                import ('pages/AccountPage.vue')
        }, {
            name: 'event',
            path: 'event',
            component: () =>
                import ('pages/EventPage.vue')
        }, {
            path: "feature",
            name: "feature",
            component: () =>
                import ('pages/FeaturePage.vue')
        }]
    },
    {
        path: '/otherapplication',
        name: 'otherapplication',
        component: () =>
            import ('pages/OtherApplicationPage.vue')
    },
    {
        path: '/account/edit',
        name: 'accountedit',
        component: () =>
            import ('pages/account/EditPage.vue')
    },
    {
        path: '/account/changeavatar',
        name: 'accountchangeavatar',
        component: () =>
            import ('pages/account/ChangeAvatarPage.vue'),
        props: true
    },
    {
        path: '/globalchat',
        name: 'globalchat',
        component: () =>
            import ('pages/GlobalChatPage.vue')
    },
    {
        path: '/event/:eventId/guest',
        name: 'eventguest',
        component: () =>
            import ('pages/event/GuestPage.vue'),
        props: true
    },
    {
        path: "/post/comment/:postId",
        name: "postcomment",
        component: () =>
            import ("pages/post/CommentPage.vue"),
        props: true
    },
    {
        path: '/event/contribution',
        name: 'eventcontribution',
        component: () =>
            import ('pages/event/ContributionPage.vue')
    },
    {
        path: '/event/absent',
        name: 'eventabsent',
        component: () =>
            import ('pages/event/AbsentPage.vue'),
        props: true
    },
    {
        path: '/event/create',
        name: 'eventcreate',
        component: () =>
            import ('pages/event/CreatePage.vue')
    },
    {
        path: '/post/create',
        name: 'postcreate',
        component: () =>
            import ('pages/post/CreatePage.vue')
    },
    {
        path: '/event/participation',
        name: 'eventparticipation',
        component: () =>
            import ('pages/event/ParticipationPage.vue')
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("pages/LoginPage.vue")
    },
    {
        path: "/register",
        name: "register",
        component: () =>
            import ("pages/RegisterPage.vue")
    },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () =>
            import ('pages/Error404.vue')
    })
}

export default routes