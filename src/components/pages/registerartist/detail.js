import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState, useRef } from "react";
import api from "../../services/api";
import url from "../../services/url";
import { format } from "date-fns";
import Swal from "sweetalert2";
import Loading from "../../layouts/loading";
import { getAccessToken } from "../../../utils/auth";
function RegisterArtistDetail() {
    const { id } = useParams();
    const [registerDetail, setRegisterDetail] = useState([]);
    const [action, setAction] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loadOffer = useCallback(async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        };

        try {
            const offerResponse = await api.get(`${url.REGISTER_ARTIST.DETAIL.replace("{}", id)}`, config);
            setRegisterDetail(offerResponse.data);
        } catch (error) {
            setError(true);
        }
    }, [id]);

    const handleSubmit = async (action) => {
        const userToken = localStorage.getItem("access_token");
        api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        try {
            const response = await api.put(`${url.REGISTER_ARTIST.UPDATE.replace("{}", id)}`, { action }, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response && response.status === 204) {
                // console.log(response.data);
                Swal.fire({
                    text: "Accpet User to become Artist",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Done",
                });
                setTimeout(() => {
                    navigate(`/register-artist-list`); //chuyển đến trang register-artist-list
                }, 2000);
            } else {
                Swal.fire({
                    text: "Reject User to become Artist",
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Done",
                });
                setTimeout(() => {
                    navigate(`/register-artist-list`); //chuyển đến trang register-artist-list
                }, 2000);
            }
        } catch (error) {

            console.error("Error creating test:", error);
            console.error("Response data:", error.response.data);

        }
    };

    useEffect(() => {
        setLoading(true);

        loadOffer();

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [loadOffer]);

    return (
        <>
            <Helmet>
                <title>Offer Detail | Art Admin</title>
            </Helmet>

            {loading ? <Loading /> : ""}

            <Layout>
                <Breadcrumb title="Offer Detail" />
                {/* {error ? (
                    <div className="card">
                        <div className="card-body">
                            <h2>No offer history found. Please check again!</h2>
                            <Link to="/" className="btn btn-rounded btn-primary">
                                <span className="btn-icon-start text-primary">
                                    <i className="fa fa-shopping-cart"></i>
                                </span>
                                Back to Offer
                            </Link>
                        </div>
                    </div>
                ) : ( */}

                <Link to="/register-artist-list" className="btn btn-rounded btn-primary">
                    
                    Back to Register List
                </Link>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card mt-3">
                            <div className="card-header">
                                <span className="float-end"> Register ID: #{registerDetail.offerCode}</span>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th className="center">User ID</th>
                                                <th>Image</th>
                                                <th>User Name</th>
                                                <th>Description</th>
                                                <th className="right">Biography</th>
                                                <th className="right">Role</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="center text-white">{registerDetail.userId}</td>
                                                <td className="center text-white">{registerDetail.userName}</td>
                                                <td className="left strong text-white">{registerDetail.artWorkNames}</td>
                                                <td className="left text-white">Extended License</td>
                                                <td className="right text-white">{registerDetail.offerPrice}</td>
                                                <td className="right text-white">{registerDetail.role}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4 col-sm-5"> </div>
                                    <div className="col-lg-4 col-sm-5 ms-auto">
                                        {/* <table className="table table-clear">
                                            <tbody>
                                                <tr>
                                                    <td className="left"><strong>Total</strong></td>
                                                    <td className="right"><strong>${offerDetail.toTal}</strong><br /></td>
                                                </tr>
                                            </tbody>
                                        </table> */}
                                        <button type="button" className="btn btn-rounded btn-info" onClick={() => handleSubmit('accept')}><span className="btn-icon-check text-info"></span>Accept</button>
                                        <button type="button" className="btn btn-rounded btn-info1" onClick={() => handleSubmit('refuse')}><span className="btn-icon-check text-info"></span>Reject</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default RegisterArtistDetail;