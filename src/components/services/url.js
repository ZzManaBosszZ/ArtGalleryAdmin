const url = {
    BASE_URL: "https://localhost:7270/api",
    MENU: {
        LIST: "/Menu",
    },

    MOVIE: {
        LIST: "/movie",
        DETAIL: "/movie/{}",
        CREATE: "/movie/create",
        UPDATE: "/movie/edit",
        TRASH: "/movie/trash-can",
        DELETE: "/movie/delete",
        RESTORE: "/movie/restore/{}",
    },

    GALLERY: {
        LIST: "/gallery/get-all",
        DETAIL: "/gallery/get-by-id/{}",
        CREATE: "/gallery/create",
        UPDATE: "/gallery/edit",
        TRASH: "/gallery/trash-can",
        DELETE: "/gallery/delete",
        RESTORE: "/gallery/restore/{}",
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