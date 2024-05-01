import { Helmet } from "react-helmet";
import Layout from "../../layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState, useRef } from "react";
import api from "../../services/api";
import url from "../../services/url";
import { format } from "date-fns";
import Swal from "sweetalert2";
import Loading from "../../layouts/loading";
import { getAccessToken } from "../../../utils/auth";
function OfferDetail() {
    const { orderCode } = useParams();
    const [offerDetail, setOfferDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadOffer = useCallback(async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        };

        try {
            const offerResponse = await api.get(url.OFFER.DETAIL + `/${orderCode}`, config);
            setOfferDetail(offerResponse.data);
        } catch (error) {
            setError(true);
        }
    }, [orderCode]);

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
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card mt-3">
                            <div className="card-header"> 
                                <span className="float-end"> Invoice: #{offerDetail.orderCode}</span>
                                {/* <strong>01/01/2018</strong> */}
                                <span className="float-end"><strong>Status:</strong>Pending</span>
                            </div>
                            <div className="card-body">
                                <div className="row mb-5">
                                    <div className="mt-4 col-xl-3 col-lg-3 col-md-6 col-sm-12 inv-text">
                                        <h4>From:</h4>
                                        <div> <strong>{}</strong> </div>
                                        <div>Madalinskiego 8</div>
                                        <div>71-101 Szczecin, Poland</div>
                                        <div>Email: info@webz.com.pl</div>
                                        <div>Phone: +48 444 666 3333</div>
                                    </div>
                                    <div className="mt-4 col-xl-3 col-lg-3 col-md-6 col-sm-12 inv-text">
                                        <h4>To:</h4>
                                        <div> <strong>Bob Mart</strong> </div>
                                        <div>Attn: Daniel Marek</div>
                                        <div>43-190 Mikolow, Poland</div>
                                        <div>Email: marek@daniel.com</div>
                                        <div>Phone: +48 123 456 789</div>
                                    </div>

                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th className="center">#</th>
                                                <th>Item</th>
                                                <th>Description</th>
                                                <th className="right">Unit Cost</th>
                                                <th className="center">Qty</th>
                                                <th className="right">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="center text-white">1</td>
                                                <td className="left strong text-white">Origin License</td>
                                                <td className="left text-white">Extended License</td>
                                                <td className="right text-white">$999,00</td>
                                                <td className="center text-white">1</td>
                                                <td className="right text-white">$999,00</td>
                                            </tr>
                                            <tr>
                                                <td className="center">2</td>
                                                <td className="left">Custom Services</td>
                                                <td className="left">Instalation and Customization (cost per hour)</td>
                                                <td className="right">$150,00</td>
                                                <td className="center">20</td>
                                                <td className="right">$3.000,00</td>
                                            </tr>
                                            <tr>
                                                <td className="center">3</td>
                                                <td className="left">Hosting</td>
                                                <td className="left">1 year subcription</td>
                                                <td className="right">$499,00</td>
                                                <td className="center">1</td>
                                                <td className="right">$499,00</td>
                                            </tr>
                                            <tr>
                                                <td className="center">4</td>
                                                <td className="left">Platinum Support</td>
                                                <td className="left">1 year subcription 24/7</td>
                                                <td className="right">$3.999,00</td>
                                                <td className="center">1</td>
                                                <td className="right">$3.999,00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4 col-sm-5"> </div>
                                    <div className="col-lg-4 col-sm-5 ms-auto">
                                        <table className="table table-clear">
                                            <tbody>
                                                <tr>
                                                    <td className="left"><strong>Subtotal</strong></td>
                                                    <td className="right">$8.497,00</td>
                                                </tr>
                                                <tr>
                                                    <td className="left"><strong>Discount (20%)</strong></td>
                                                    <td className="right">$1,699,40</td>
                                                </tr>
                                                <tr>
                                                    <td className="left"><strong>VAT (10%)</strong></td>
                                                    <td className="right">$679,76</td>
                                                </tr>
                                                <tr>
                                                    <td className="left"><strong>Total</strong></td>
                                                    <td className="right"><strong>$7.477,36</strong><br />
                                                        <strong>0.15050000 BTC</strong></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button type="button" className="btn btn-rounded btn-info"><span className="btn-icon-check text-info"></span>Accept Offer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* )} */}
            </Layout>
        </>
    );
}

export default OfferDetail;