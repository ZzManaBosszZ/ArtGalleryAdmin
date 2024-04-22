import {BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/pages/auth/login";
import ForgotPassword from "./components/pages/auth/forgot-password";
import NotFound from "./components/pages/other/not-found";
import ArtWorkList from "./components/pages/artwork";
import ArtWorkCreate from "./components/pages/artwork/create";
import ArtWorkEdit from "./components/pages/artwork/edit";
import ArtWorkDeleteAt from "./components/pages/artwork/delete-at";
import ArtWorkDetail from "./components/pages/artwork/detail";
import Profile from "./components/pages/auth/profile";
import ResetPassword from "./components/pages/auth/reset-password";
import { useJwt } from "react-jwt";
import { getAccessToken, removeAccessToken } from "./utils/auth";
import ArtistsList from "./components/pages/artist";
import ArtistCreate from "./components/pages/artist/create";
import ArtistEdit from "./components/pages/artist/edit";
import ArtistDeleteAt from "./components/pages/artist/delete-at";

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

                <Route path="/artist-list" element={<ProtectedRoute element={<ArtistsList />} />} />
                <Route path="/artist-create" element={<ProtectedRoute element={<ArtistCreate />} />} />
                <Route path="/artist-edit/:id" element={<ProtectedRoute element={<ArtistEdit />} />} />
                <Route path="/artist-delete-at" element={<ProtectedRoute element={<ArtistDeleteAt />} />} />
                {/* End Genre */}

                {/* Start Movie */}
                <Route path="/artwork-list" element={<ProtectedRoute element={<ArtWorkList />} />} />
                <Route path="/artwork-detail/:id" element={<ProtectedRoute element={<ArtWorkDetail />} />} />
                <Route path="/artwork-create" element={<ProtectedRoute element={<ArtWorkCreate />} />} />
                <Route path="/artwork-edit/:id" element={<ProtectedRoute element={<ArtWorkEdit />} />} />
                <Route path="/artwork-delete-at" element={<ProtectedRoute element={<ArtWorkDeleteAt />} />} />
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
