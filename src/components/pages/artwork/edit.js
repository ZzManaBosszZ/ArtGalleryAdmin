import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import Select from "react-select";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import url from "../../services/url";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import Loading from "../../layouts/loading";
import NotFound from "../../pages/other/not-found";

function ArtWorkEdit() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [artworkData, setArtWorkData] = useState({});
    const [artworkImgePreview, setArtWorkImagePreview] = useState("");
    const [coverImgePreview, setCoverImagePreview] = useState("");
    const [errors, setErrors] = useState({});
    const [nameExistsError, setNameExistsError] = useState("");
    const navigate = useNavigate();

    //hiển thị video trailer
    const [videoUrl, setVideoUrl] = useState("");

    //validate
    const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (artworkData.title === "") {
            newErrors.title = "Please enter name ArtWork";
            valid = false;
        } else if (artworkData.title.length < 3) {
            newErrors.title = "Enter at least 3 characters";
            valid = false;
        } else if (artworkData.title.length > 255) {
            newErrors.title = "Enter up to 255 characters";
            valid = false;
        }
        if (artworkData.actor === "") {
            newErrors.actor = "Please enter actor";
            valid = false;
        }
        if (artworkData.movie_image === null) {
            newErrors.movie_image = "Please choose ArtWork photo";
            valid = false;
        }
        if (artworkData.cover_image === null) {
            newErrors.cover_image = "Please choose ArtWork cover photo";
            valid = false;
        }
        if (artworkData.director === "") {
            newErrors.director = "Please enter director";
            valid = false;
        }
        if (artworkData.duration === "") {
            newErrors.duration = "Please enter duration";
            valid = false;
        } else {
            const durationValue = parseFloat(artworkData.duration);
            if (isNaN(durationValue) || durationValue < 60 || durationValue > 200) {
                newErrors.duration = "Please enter a valid duration between 60 and 200 Minute";
                valid = false;
            }
        }
        if (artworkData.release_date === "") {
            newErrors.release_date = "Please enter release_date";
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    //hien thi thong tin ArtWork
    useEffect(() => {
        const userToken = localStorage.getItem("access_token");
        api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        api.get(`${url.ARTWORK.DETAIL.replace("{}", id)}`)
            .then((response) => {
                const initialArtWorkData = {
                    ...response.data,
                    movie_image: response.data.movie_image,
                    release_date: format(new Date(response.data.release_date), "yyyy-MM-dd"),
                };
                setArtWorkData(initialArtWorkData);
            })
            .catch((error) => {
                console.error("Error fetching ArtWork details:", error);
            });
    }, [id]);

    //xử lý update ArtWork
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            const userToken = localStorage.getItem("access_token");
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            try {
                const response = await api.put(url.ARTWORK.UPDATE, artworkData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (response && response.data) {
                    // console.log(response.data);
                    toast.success("Update ArtWork Successffuly.", {
                        // position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        navigate(`/artwork-list`); //chuyển đến trang artwork-list
                    }, 3000);
                } else {
                }
            } catch (error) {
                if (error.response.status === 400 && error.response.data.message === "ArtWork already exists") {
                    setNameExistsError("The name of this ArtWork already exists");
                    toast.error("The name of this ArtWork already exists", {
                        // position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                } else {
                    toast.error("Unable to update ArtWork, please try again", {
                        // position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
                console.error("Error creating test:", error);
                console.error("Response data:", error.response.data);
            }
        }
    };

    // kiểm tra role
    useEffect(() => {
        const fetchUserRole = async () => {
            const token = localStorage.getItem("access_token");
            try {
                const decodedToken = JSON.parse(atob(token.split(".")[1]));
                const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                setUserRole(userRole);

                if (userRole === "User" || userRole === "Shopping Center Manager Staff") {
                    setError(true);
                }
            } catch (error) {
                console.error("Error loading user role:", error);
            }
        };

        fetchUserRole();
    }, []);
    return (
        <>
            {error ? (
                <NotFound />
            ) : (
                <>
                    <Helmet>
                        <title>ArtWork Edit | Art Admin</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="ArtWork Edit" />
                        <div className="row">
                            <div className="col-xl-12 col-xxl-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">ArtWork Edit</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                        ArtWork Name <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={artworkData.title}
                                                            onChange={(e) =>
                                                                setArtWorkData({
                                                                    ...artworkData,
                                                                    title: e.target.value,
                                                                })
                                                            }
                                                            className="form-control"
                                                        />
                                                        {errors.title && <div className="text-danger">{errors.title}</div>}
                                                        {nameExistsError && <div className="text-danger">{nameExistsError}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Description</label>
                                                        <textarea
                                                            value={artworkData.describe}
                                                            onChange={(e) =>
                                                                setArtWorkData({
                                                                    ...artworkData,
                                                                    describe: e.target.value,
                                                                })
                                                            }
                                                            className="form-control"
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Actor <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={artworkData.actor}
                                                            onChange={(e) =>
                                                                setArtWorkData({
                                                                    ...artworkData,
                                                                    actor: e.target.value,
                                                                })
                                                            }
                                                            className="form-control"
                                                        />
                                                        {errors.actor && <div className="text-danger">{errors.actor}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Director <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={artworkData.director}
                                                            onChange={(e) =>
                                                                setArtWorkData({
                                                                    ...artworkData,
                                                                    director: e.target.value,
                                                                })
                                                            }
                                                            className="form-control"
                                                        />
                                                        {errors.director && <div className="text-danger">{errors.director}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Release date <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="date"
                                                            value={artworkData.release_date}
                                                            onChange={(e) =>
                                                                setArtWorkData({
                                                                    ...artworkData,
                                                                    release_date: e.target.value,
                                                                })
                                                            }
                                                            className="form-control"
                                                        />
                                                        {errors.release_date && <div className="text-danger">{errors.release_date}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Movie duration (Hours) <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={artworkData.duration}
                                                            onChange={(e) =>
                                                                setArtWorkData({
                                                                    ...artworkData,
                                                                    duration: e.target.value,
                                                                })
                                                            }
                                                            className="form-control"
                                                        />
                                                        {errors.duration && <div className="text-danger">{errors.duration}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            ArtWorks photos <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="file"
                                                            onChange={(e) => {
                                                                const file = e.target.files[0];
                                                                if (file && /\.(jpg|png|jpeg)$/.test(file.name)) {
                                                                    // Update image preview state
                                                                    setArtWorkImagePreview(URL.createObjectURL(file));

                                                                    // Tiếp tục xử lý
                                                                    setArtWorkData({
                                                                        ...artworkData,
                                                                        movie_image: file,
                                                                    });
                                                                } else {
                                                                    console.error("Unsupported file format or no file selected");
                                                                }
                                                            }}
                                                            className="form-control"
                                                            accept=".jpg, .png, .jpeg"
                                                        />
                                                        {errors.movie_image && <div className="text-danger">{errors.movie_image}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">
                                                            Movie cover photo <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="file"
                                                            onChange={(e) => {
                                                                const file = e.target.files[0];
                                                                if (file && /\.(jpg|png|jpeg)$/.test(file.name)) {
                                                                    // Update image preview state
                                                                    setCoverImagePreview(URL.createObjectURL(file));

                                                                    // Tiếp tục xử lý
                                                                    setArtWorkData({
                                                                        ...artworkData,
                                                                        cover_image: file,
                                                                    });
                                                                } else {
                                                                    console.error("Unsupported file format or no file selected");
                                                                }
                                                            }}
                                                            className="form-control"
                                                            accept=".jpg, .png, .jpeg"
                                                        />
                                                        {errors.cover_image && <div className="text-danger">{errors.cover_image}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Video Trailer</label>
                                                        <input
                                                            type="text"
                                                            name="trailer"
                                                            className="form-control"
                                                            value={artworkData.trailer}
                                                            onChange={(e) => {
                                                                setVideoUrl(e.target.value);
                                                                setArtWorkData({ ...artworkData, trailer: e.target.value });
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-2 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Preview ArtWorks photos</label>
                                                        <img
                                                            id="imgPreview"
                                                            src={artworkImgePreview || artworkData.movie_image}
                                                            alt="Product Preview"
                                                            style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                                            onError={(e) => console.error("Image Preview Error:", e)}
                                                        />{" "}
                                                    </div>
                                                </div>

                                                <div className="col-lg-2 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Preview ArtWork cover photo</label>
                                                        <img
                                                            id="imgPreview"
                                                            src={coverImgePreview || artworkData.cover_image}
                                                            alt="Product Preview"
                                                            style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                                            onError={(e) => console.error("Image Preview Error:", e)}
                                                        />{" "}
                                                    </div>
                                                </div>

                                                <div className="col-lg-2 mb-2">
                                                    <div className="mb-3">
                                                        <label className="text-label form-label">Preview Trailer</label>
                                                        {artworkData.trailer && <ReactPlayer url={artworkData.trailer} width="100%" height="200px" controls />}
                                                    </div>
                                                </div>

                                                <div className="text-end">
                                                    <button type="submit" className="btn btn-default">
                                                        Update ArtWork
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Layout>
                </>
            )}
        </>
    );
}

export default ArtWorkEdit;
