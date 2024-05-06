const url = {
    BASE_URL: "https://localhost:7270/api",
    MENU: {
        LIST: "/Menu",
    },

    DASHBOARD: {
        TOTAL_OFFER: "Dashboard/total-count-offer",
        TOTAL_USER: "Dashboard/total-count-user",
        TOTAL_ARTIST: "Dashboard/total-count-artist",
        TOTAL_ARTWORK: "Dashboard/total-count-artwork",
        TOTAL_OFFER_TODAY: "Dashboard/total-offer-today",
        TOTAL_REVENUE: "Dashboard/total-revenue",
        CHARTWEEKLY: "Dashboard/revenue/weekly",
        CHARTMONTHLY: "Dashboard/revenue/monthly/{}",
        CHARTYEARLY: "Dashboard/revenue/yearly",
        CHARTPERFORMANCE: "Dashboard/",
        LIST_OFFER_TODAY: "Dashboard/list-offer-today",
    },

    ARTWORK: {
        LIST: "/Artworks",
        DETAIL: "/Artworks/{}",
        CREATE: "/Artworks/create",
        UPDATE: "/Artworks/edit",
        // TRASH: "/Artworks/trash-can",
        DELETE: "/Artworks/delete",
        // RESTORE: "/Artworks/restore/{}",
    },

    ARTIST: {
        LIST: "/Artists",
        DETAIL: "/Artists/{}",
        CREATE: "/Artists/create",
        UPDATE: "/Artists/edit",
        // TRASH: "/Artists/trash-can",
        DELETE: "/Artists/delete",
        // RESTORE: "/Artists/restore/{}",
    },

    ART: {
        LIST: "/SchoolOfArts",
    },

    OFFER: {
        LIST: "/Offers/GetOrderAllAdmin",
        DETAIL: "/Offers/get-by-id-admin",  
        UPDATE: "Offers/update-status-Admin/{}"
    },

    AUTH: {
        LOGIN: "/Auth/login",
        FORGOT_PASSWORD: "/Auth/forgot-password",
        PROFILE: "/Auth/profile",
        UPDATE_PROFILE: "/Auth/update-profile",
        CHANGE_PASSWORD: "/Auth/change-password",
        RESET_PASSWORD: "/Auth/reset-password",
        USER: "/Auth/user"
    },

};
export default url;