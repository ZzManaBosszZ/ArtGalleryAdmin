import { Helmet } from "react-helmet";
import Layout from "../../../layouts";
import Breadcrumb from "../../../layouts/breadcrumb";
import { useEffect, useState } from "react";
import url from "../../../services/url";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import Swal from "sweetalert2";
import Loading from "../../../layouts/loading";
import NotFound from "../../../pages/other/not-found";

function ArtWorkDetail() {
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
    const [ArtWorkDetail, setArtWorkDetail] = useState({schoolOfArts: []});

    //hien thi thong tin chi tiet artwork
    useEffect(() => {
        const userToken = localStorage.getItem("access_token");
        api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        api.get(`${url.ARTWORK.DETAIL.replace("{}", id)}`)
            .then((response) => {
                setArtWorkDetail(response.data);
            })
            .catch((error) => {
                // console.error("Error fetching promotion details:", error);
            });
    }, [id]);

    const releaseDate = ArtWorkDetail.release_date;
    const formattedDate = releaseDate ? format(new Date(releaseDate), "yyyy-MM-dd") : "N/A";

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
                        <title>ArtWork Detail | Art Admin</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="ArtWork Detail" />

                        <div className="row">
                            <div className="col-xl-4">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="profile-blog">
                                                    <h4 className="d-inline"> ArtWork Name :</h4>
                                                    <p className="mb-0">{ArtWorkDetail.name}</p>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Artist :</h4>
                                                        <p className="mb-0">{ArtWorkDetail.actor}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Medium :</h4>
                                                        <p className="mb-0">{ArtWorkDetail.medium}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Materials :</h4>
                                                        <p className="mb-0">{ArtWorkDetail.materials} minutes</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Size</h4>
                                                        <p className="mb-0">{ArtWorkDetail.size}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Condition</h4>
                                                        <p className="mb-0">{ArtWorkDetail.condition}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Signature</h4>
                                                        <p className="mb-0">{ArtWorkDetail.signature}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Rarity</h4>
                                                        <p className="mb-0">{ArtWorkDetail.rarity}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">CertificateOfAuthenticity</h4>
                                                        <p className="mb-0">{ArtWorkDetail.certificateOfAuthenticity}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Frame</h4>
                                                        <p className="mb-0">{ArtWorkDetail.frame}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Series</h4>
                                                        <p className="mb-0">{ArtWorkDetail.series}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Price</h4>
                                                        <p className="mb-0">{ArtWorkDetail.price}</p>
                                                    </div>

                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">Number Of Favorites :</h4>
                                                        <p className="mb-0">{ArtWorkDetail.favoriteCount}</p>
                                                    </div>
                                  
                                                    <div style={{ paddingTop: "20px" }}>
                                                        <h4 className="d-inline">School Of Art  :</h4>
                                                        <p className="mb-0">
                                                            {ArtWorkDetail.schoolOfArts.map((schoolOfArt) => (
                                                                <span key={schoolOfArt.id} className="badge light badge-dark">
                                                                    {schoolOfArt.name}  
                                                                </span>
                                                            ))}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="d-inline">Description ArtWork :</h4>
                                        <div className="post-details">{ArtWorkDetail.describe}</div>

                                        <div className="row" style={{ marginTop: "20px" }}>
                                            <div className="col-xl-12">
                                                <h4 className="d-inline">ArtWork Image :</h4>
                                                <div className="post-details">
                                                    {/* <ReactPlayer url={ArtWorkDetail.artWorkImage} controls width="100%" height="250px" /> */}
                                                    <img src={ArtWorkDetail.artWorkImage} alt="image image" style={{ height: "250px", objectFit: "cover" }} className="img-fluid mt-4 mb-4 w-100" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="row" style={{ marginTop: "20px" }}>
                                            <div className="col-xl-6">
                                                <h4 className="d-inline">Image ArtWork :</h4>
                                                <div className="post-details">
                                                    <img src={ArtWorkDetail.movie_image} alt="image image" style={{ height: "180px", objectFit: "cover" }} className="img-fluid mt-4 mb-4 w-100" />
                                                </div>
                                            </div>
                                            <div className="col-xl-6">
                                                <h4 className="d-inline">Cover Image :</h4>
                                                <div className="post-details">
                                                    <img src={ArtWorkDetail.cover_image} alt="image image" style={{ height: "180px", objectFit: "cover" }} className="img-fluid mt-4 mb-4 w-100" />
                                                </div>
                                            </div>
                                        </div> */}
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
export default ArtWorkDetail;
