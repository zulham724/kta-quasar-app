import multiguard from "vue-router-multiguard";
import store from "./../store";
import moment from "moment";
import { Notify } from 'quasar'

// cek auth apakah sudah login atau belum
const auth = function(to, from, next) {
    let isLoggedIn = store().getters["Auth/isLoggedIn"];
    if (isLoggedIn) {
        next();
    } else {
        next("/login");
    }
};

// cek apakah user sudah bayar apa belum
const actived = function(to, from, next) {
    const monthDifference = moment(new Date()).diff(
        new Date(store().getters["Auth/auth"].user_activated_at),
        "months",
        true
    );
    if (
        store().getters["Auth/auth"] &&
        store().getters["Auth/auth"].user_activated_at != null
    ) {
        next();
    } else {
        next("/payment");
    }
};

const checkProfile = function(to, from, next) {
    if (store().getters["Auth/auth"].profile.district_id != null) {
        next();
    } else {
        Notify.create('Tolong lengkapi lokasi instansi anda')
        next("/account/edit");
    }
};

const routes = [{
        path: "/",
        beforeEnter: multiguard([auth, actived]),
        component: () =>
            import ("layouts/MainLayout.vue"),
        children: [{
                path: "",
                name: "home",
                component: () =>
                    import ("pages/HomePage.vue")
            },
            {
                name: "account",
                path: "account",
                component: () =>
                    import ("pages/AccountPage.vue")
            },
            {
                name: "event",
                path: "event",
                component: () =>
                    import ("pages/EventPage.vue")
            },
            {
                path: "feature",
                name: "feature",
                component: () =>
                    import ("pages/FeaturePage.vue")
            },
            // ---------------------
            {
                path: '/user/profile/:userId',
                name: 'userprofile',
                component: () =>
                    import ('pages/user/ProfilePage.vue'),
                props: true
            },
            {
                path: '/user/photolist/:userId/:postId',
                name: 'userphotolist',
                component: () =>
                    import ('pages/user/PhotoListPage.vue'),
                props: true
            },
            {
                path: '/post/like/:postId',
                name: 'postlike',
                component: () =>
                    import ('pages/post/LikePage.vue'),
                props: true
            },
            {
                path: '/post/comment/like/:commentId',
                name: 'postcommentlike',
                component: () =>
                    import ('pages/post/comment/LikePage.vue'),
                props: true
            }
        ]
    },
    {
        path: '/activity',
        beforeEnter: multiguard([auth, actived]),
        name: 'activity',
        component: () =>
            import ('pages/ActivityPage.vue'),
    },
    {
        path: "/user/search",
        beforeEnter: multiguard([auth, actived]),
        name: "usersearch",
        component: () =>
            import ("pages/user/SearchPage.vue")
    },
    {
        path: "/information",
        beforeEnter: multiguard([auth, actived, checkProfile]),
        name: "information",
        component: () =>
            import ("pages/InformationPage.vue")
    },
    {
        path: "/payment/history",
        beforeEnter: multiguard([auth, actived]),
        name: "paymenthistory",
        component: () =>
            import ("pages/payment/HistoryPage.vue")
    },
    {
        path: "/province",
        beforeEnter: multiguard([auth, actived]),
        name: "province",
        component: () =>
            import ("pages/ProvincePage.vue")
    },
    {
        path: "/city/:name/:id",
        beforeEnter: multiguard([auth, actived]),
        name: "city",
        component: () =>
            import ("pages/CityPage.vue"),
        props: true
    },
    {
        path: "/district/:name/:id",
        beforeEnter: multiguard([auth, actived]),
        name: "district",
        component: () =>
            import ("pages/DistrictPage.vue"),
        props: true
    },
    {
        path: "/districtuserlist/:districtId",
        name: "districtuserlist",
        beforeEnter: multiguard([auth, actived]),
        component: () =>
            import ('pages/user/DistrictUserListPage.vue'),
        props: true
    },
    {
        path: "/book/create",
        beforeEnter: multiguard([auth, actived]),
        name: "bookcreate",
        component: () =>
            import ("pages/book/CreatePage.vue")
    },
    {
        path: "/book/search",
        beforeEnter: multiguard([auth, actived]),
        name: "booksearch",
        component: () =>
            import ("pages/book/SearchPage.vue")
    },
    {
        path: "/murottal",
        beforeEnter: multiguard([auth, actived]),
        name: "murottal",
        component: () =>
            import ("pages/MurottalPage.vue")
    },
    {
        path: "/dailyprayer",
        beforeEnter: multiguard([auth, actived]),
        name: "dailyprayer",
        component: () =>
            import ("pages/DailyPrayerPage.vue")
    },
    {
        path: "/membercard",
        beforeEnter: multiguard([auth, actived, checkProfile]),
        name: "membercard",
        component: () =>
            import ("pages/MemberCardPage.vue")
    },
    {
        path: "/book",
        beforeEnter: multiguard([auth, actived]),
        name: "book",
        component: () =>
            import ("pages/BookPage.vue")
    },
    {
        path: "/otherapplication",
        beforeEnter: multiguard([auth, actived]),
        name: "otherapplication",
        component: () =>
            import ("pages/OtherApplicationPage.vue")
    },
    {
        path: "/account/edit",
        beforeEnter: multiguard([auth, actived]),
        name: "accountedit",
        component: () =>
            import ("pages/account/EditPage.vue")
    },
    {
        path: "/account/changeavatar",
        beforeEnter: multiguard([auth, actived]),
        name: "accountchangeavatar",
        component: () =>
            import ("pages/account/ChangeAvatarPage.vue"),
        props: true
    },
    {
        path: "/globalchat",
        beforeEnter: multiguard([auth, actived]),
        name: "globalchat",
        component: () =>
            import ("pages/GlobalChatPage.vue")
    },
    {
        path: "/event/:eventId/guest",
        beforeEnter: multiguard([auth, actived]),
        name: "eventguest",
        component: () =>
            import ("pages/event/GuestPage.vue"),
        props: true
    },
    {
        path: "/post/comment/:postId",
        beforeEnter: multiguard([auth, actived]),
        name: "postcomment",
        component: () =>
            import ("pages/post/CommentPage.vue"),
        props: true
    },
    {
        path: "/event/contribution",
        beforeEnter: multiguard([auth, actived]),
        name: "eventcontribution",
        component: () =>
            import ("pages/event/ContributionPage.vue")
    },
    {
        path: "/event/absent",
        beforeEnter: multiguard([auth, actived]),
        name: "eventabsent",
        component: () =>
            import ("pages/event/AbsentPage.vue"),
        props: true
    },
    {
        path: "/event/create",
        beforeEnter: multiguard([auth, actived]),
        name: "eventcreate",
        component: () =>
            import ("pages/event/CreatePage.vue")
    },
    {
        path: "/post/create",
        beforeEnter: multiguard([auth, actived]),
        name: "postcreate",
        component: () =>
            import ("pages/post/CreatePage.vue")
    },
    {
        path: "/event/participation",
        beforeEnter: multiguard([auth, actived]),
        name: "eventparticipation",
        component: () =>
            import ("pages/event/ParticipationPage.vue")
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
    {
        path: "/payment",
        name: "payment",
        component: () =>
            import ("pages/PaymentPage.vue")
    }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
    routes.push({
        path: "*",
        component: () =>
            import ("pages/Error404.vue")
    });
}

export default routes;
