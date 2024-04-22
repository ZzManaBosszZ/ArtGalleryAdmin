const url = {
    BASE_URL: "https://localhost:7270/api",
    MENU: {
        LIST: "/menu",
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
        LOGIN: "/AUTH/login",
        FORGOT_PASSWORD: "/AUTH/forgot-password",
        PROFILE: "/AUTH/profile",
        UPDATE_PROFILE: "/AUTH/update-profile",
        CHANGE_PASSWORD: "/AUTH/change-password",
        RESET_PASSWORD: "AUTH/reset-password",
    },

};
export default url;