const url = {
    BASE_URL: "https://localhost:7270/api",
    MENU: {
        LIST: "/Menu",
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

    SCHOOLOFART: {
        LIST: "/SchoolOfArts",
    },

    AUTH: {
        LOGIN: "/Auth/login",
        FORGOT_PASSWORD: "/Auth/forgot-password",
        PROFILE: "/Auth/profile",
        UPDATE_PROFILE: "/Auth/update-profile",
        CHANGE_PASSWORD: "/Auth/change-password",
        RESET_PASSWORD: "/Auth/reset-password",
    },

};
export default url;