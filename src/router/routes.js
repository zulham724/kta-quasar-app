import multiguard from "vue-router-multiguard";
import store from "./../store";
import moment from "moment";
import { Notify } from "quasar";

// cek auth apakah sudah login atau belum
const auth = function(to, from, next) {
    let isLoggedIn = store().getters["Auth/isLoggedIn"];
    let isUnAuthorized = store().getters["Auth/isUnAuthorized"];
    if (isLoggedIn && !isUnAuthorized) {
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

// cek apakah sudah mengisi status guru (PNS/Non-PNS) apa belum
const check_teacher_status = function(to, from, next){
    if(store().getters["Auth/auth"] && store().getters["Auth/auth"].pns_status != null){
        next();
    }else{
        Notify.create("Tolong isi status guru");
        next("/account/edit");
    }
}

const checkProfile = function(to, from, next) {
    if (store().getters["Auth/auth"].profile.district_id != null) {
        next();
    } else {
        Notify.create("Tolong lengkapi lokasi instansi anda");
        next("/account/edit");
    }
};

const routes = [{
        path: "/",
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
                beforeEnter: multiguard([auth, actived]),
                component: () =>
                    import ("pages/AccountPage.vue")
            },
            {
                name: "event",
                path: "event",
                beforeEnter: multiguard([auth, actived, check_teacher_status]),
                component: () =>
                    import ("pages/EventPage.vue")
            },
            {
                path: "feature",
                name: "feature",
                beforeEnter: multiguard([auth, actived, check_teacher_status]),
                component: () =>
                    import ("pages/FeaturePage.vue")
            },
            // ---------------------
            {
                path: "/user/:userId/book",
                name: "userbook",
                beforeEnter: multiguard([auth, actived, check_teacher_status]),
                component: () =>
                    import ("pages/user/BookPage.vue"),
                props: true
            },
            {
                path: "/user/:userId/event",
                name: "userevent",
                beforeEnter: multiguard([auth, actived, check_teacher_status]),
                component: () =>
                    import ("pages/user/EventPage.vue"),
                props: true
            },
            {
                path: "/user/profile/:userId",
                name: "userprofile",
                beforeEnter: multiguard([auth, actived, check_teacher_status]),
                component: () =>
                    import ("pages/user/ProfilePage.vue"),
                props: true
            },
            {
                path: "/user/photolist/:userId/:postId",
                name: "userphotolist",
                beforeEnter: multiguard([auth, actived, check_teacher_status]),
                component: () =>
                    import ("pages/user/PhotoListPage.vue"),
                props: true
            },
            {
                path: "/user/documentlist/:userId",
                name: "userdocumentlist",
                beforeEnter: multiguard([auth, actived, check_teacher_status]),
                component: () =>
                    import ("pages/user/DocumentListPage.vue"),
                props: true
            },
            {
                path: "/post/like/:postId",
                name: "postlike",
                beforeEnter: multiguard([auth, actived, check_teacher_status]),
                component: () =>
                    import ("pages/post/LikePage.vue"),
                props: true
            },
            {
                path: "/post/comment/like/:commentId",
                name: "postcommentlike",
                beforeEnter: multiguard([auth, actived, check_teacher_status]),
                component: () =>
                    import ("pages/post/comment/LikePage.vue"),
                props: true
            },
            {
                path: "/murottal",
                beforeEnter: multiguard([auth, actived, check_teacher_status]),
                name: "murottal",
                component: () =>
                    import ("pages/MurottalPage.vue")
            },
            {
                path: "/dailyprayer",
                beforeEnter: multiguard([auth, actived, check_teacher_status]),
                name: "dailyprayer",
                component: () =>
                    import ("pages/DailyPrayerPage.vue")
            },
            {
                path: "/bookmark",
                name: "bookmark",
                beforeEnter: multiguard([auth, actived, check_teacher_status]),
                component: () =>
                    import ("pages/BookmarkPage.vue")
            },
            {
                path: "/sharedmedia",
                name: "sharedmedia",
                component: () =>
                    import ("pages/SharedMedia.vue")
            },
            {
                path: "/bookmarklist/:userId/:postId",
                name: "bookmarklist",
                beforeEnter: multiguard([auth, actived, check_teacher_status]),
                component: () =>
                    import ("pages/bookmark/ListPage.vue"),
                props: true
            },
            {
                path: "/sharedmedialist/:userId/:postId",
                name: "sharedmedialist",
                component: () =>
                    import ("pages/sharedmedia/ListPage.vue"),
                props: true
            },
            {
                path: "/announcement",
                beforeEnter: multiguard([auth]),
                component: () =>
                    import ("pages/AnnouncementPage.vue")
            }
        ]
    },
    {
        path: "/activity",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
        name: "activity",
        component: () =>
            import ("pages/ActivityPage.vue")
    },
    {
        path: "/user/search",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
        name: "usersearch",
        component: () =>
            import ("pages/user/SearchPage.vue")
    },
    {
        path: "/information",
        beforeEnter: multiguard([auth, actived, checkProfile, check_teacher_status]),
        name: "information",
        component: () =>
            import ("pages/InformationPage.vue")
    },
    {
        path: "/payment/history",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
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
        path: "/paymentprovince/:month/:year",
        beforeEnter: multiguard([auth, actived]),
        name: "paymentprovince",
        component: () =>
            import ("pages/PaymentProvince.vue"),
        props: true
    },
    {
        path: "/paymentcity/:province_id/:province_name/:month/:year",
        beforeEnter: multiguard([auth, actived]),
        name: "paymentcity",
        component: () =>
            import ("pages/PaymentCity.vue"),
        props: true
    },
    {
        path: "/district/:name/:id",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
        name: "district",
        component: () =>
            import ("pages/DistrictPage.vue"),
        props: true
    },
    {
        path: "/districtuserlist/:districtId",
        name: "districtuserlist",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
        component: () =>
            import ("pages/user/DistrictUserListPage.vue"),
        props: true
    },
    {
        path: "/paymentcityuserlist/:cityName/:cityId/:month/:year",
        name: "paymentcityuserlist",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
        component: () =>
            import ("pages/user/PaymentCitytUserListPage.vue"),
        props: true
    },
    {
        path: "/book/create",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
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
        path: "/membercard",
        beforeEnter: multiguard([auth, actived, checkProfile]),
        name: "membercard",
        component: () =>
            import ("pages/MemberCardPage.vue")
    },
    {
        path: "/book",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
        name: "book",
        component: () =>
            import ("pages/BookPage.vue")
    },
    {
        path: "/otherapplication",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
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
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
        name: "globalchat",
        component: () =>
            import ("pages/GlobalChatPage.vue")
    },
    {
        path: "/event/:eventId/guest",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
        name: "eventguest",
        component: () =>
            import ("pages/event/GuestPage.vue"),
        props: true
    },
    {
        path: "/post/comment/:postId",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
        name: "postcomment",
        component: () =>
            import ("pages/post/CommentPage.vue"),
        props: true
    },
    {
        path: "/post/:postId/edit",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
        component: () =>
            import ("pages/post/EditPage.vue"),
        name: "postedit",
        props: true
    },
    {
        path: "/event/contribution",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
        name: "eventcontribution",
        component: () =>
            import ("pages/event/ContributionPage.vue")
    },
    {
        path: "/event/absent",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
        name: "eventabsent",
        component: () =>
            import ("pages/event/AbsentPage.vue"),
        props: true
    },
    {
        path: "/event/create",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
        name: "eventcreate",
        component: () =>
            import ("pages/event/CreatePage.vue")
    },
    {
        path: "/post/create",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
        name: "postcreate",
        component: () =>
            import ("pages/post/CreatePage.vue")
    },
    {
        path: "/event/participation",
        beforeEnter: multiguard([auth, actived, check_teacher_status]),
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
