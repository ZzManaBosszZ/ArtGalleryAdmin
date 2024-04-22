import {BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/pages/auth/login";
import ForgotPassword from "./components/pages/auth/forgot-password";
import NotFound from "./components/pages/other/not-found";
import MovieList from "./components/pages/movie";
import MovieCreate from "./components/pages/movie/create";
import MovieEdit from "./components/pages/movie/edit";
import MovieDeleteAt from "./components/pages/movie/delete-at";
import Profile from "./components/pages/auth/profile";
import ResetPassword from "./components/pages/auth/reset-password";
import { useJwt } from "react-jwt";
import { getAccessToken, removeAccessToken } from "./utils/auth";
import GalleryList from "./components/pages/gallery";
import GalleryCreate from "./components/pages/gallery/create";
import GalleryEdit from "./components/pages/gallery/edit";
import GalleryDeleteAt from "./components/pages/gallery/delete-at";
import MovieDetail from "./components/pages/movie/detail";
function App() {
    const ProtectedRoute = ({ element }) => {
        const token = getAccessToken();
        const { isExpired, isInvalid } = useJwt(token);

        if (!token || isExpired || isInvalid) {
            removeAccessToken();
            return <Navigate to="/login" />;
        }

        return element;
    };

    const ProtectedLoginRoute = ({ element }) => {
        const token = getAccessToken();
        const { isExpired, isInvalid } = useJwt(token);

        if (token && !isExpired && !isInvalid) {
            return <Navigate to="/" />;
        }

        return element;
    };

    return (
        <div className="App">
            <Router>
            <Routes>
                {/* Start Dashboard */}

                {/* End Dashboard */}


                {/* Start Gallery */}

                <Route path="/gallery-list" element={<ProtectedRoute element={<GalleryList />} />} />
                <Route path="/gallery-create" element={<ProtectedRoute element={<GalleryCreate />} />} />
                <Route path="/gallery-edit/:id" element={<ProtectedRoute element={<GalleryEdit />} />} />
                <Route path="/gallery-delete-at" element={<ProtectedRoute element={<GalleryDeleteAt />} />} />
                {/* End Genre */}

                {/* Start Movie */}
                <Route path="/movie-list" element={<ProtectedRoute element={<MovieList />} />} />
                <Route path="/movie-detail/:id" element={<ProtectedRoute element={<MovieDetail />} />} />
                <Route path="/movie-create" element={<ProtectedRoute element={<MovieCreate />} />} />
                <Route path="/movie-edit/:id" element={<ProtectedRoute element={<MovieEdit />} />} />
                <Route path="/movie-delete-at" element={<ProtectedRoute element={<MovieDeleteAt />} />} />
                {/* End Movie */}

                {/* Start Auth */}
                <Route path="/login" element={<ProtectedLoginRoute element={<Login />} />} />
                <Route path="/forgot-password" element={<ProtectedLoginRoute element={<ForgotPassword />} />} />
                <Route path="/reset-password/:resetToken" element={<ProtectedLoginRoute element={<ResetPassword />} />} />
                <Route path="/profile"  element={<Profile />} />
                {/* <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} /> */}
                {/* End Auth */}

                {/* Start Other page */}
                <Route path="*" element={<NotFound />} />
                {/* End Other page */}
            </Routes>
            </Router>
        </div>
    );
}

export default App;
