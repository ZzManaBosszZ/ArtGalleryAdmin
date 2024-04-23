import Layout from "../../layouts/index";
import Breadcrumb from "../../layouts/breadcrumb";
import { Link, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../../services/api";
import url from "../../services/url";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loading from "../../layouts/loading";
import NotFound from "../../pages/other/not-found";
function OfferDetail() {

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    const [error, setError] = useState(null);
    return (
        <>
            {error ? (
                <NotFound />
            ) : (
                <>
                    <Helmet>
                        <title>Offer Detail | Art Admin</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="Offer Detail" />

                        <div class="row">
                            <div class="col-lg-12">

                                <div class="card mt-3">
                                    <div class="card-header"> Invoice <strong>01/01/2018</strong> <span class="float-end">
                                        <strong>Status:</strong> Pending</span> </div>
                                    <div class="card-body">
                                        <div class="row mb-5">
                                            <div class="mt-4 col-xl-3 col-lg-3 col-md-6 col-sm-12 inv-text">
                                                <h4>From:</h4>
                                                <div> <strong>Webz Poland</strong> </div>
                                                <div>Madalinskiego 8</div>
                                                <div>71-101 Szczecin, Poland</div>
                                                <div>Email: info@webz.com.pl</div>
                                                <div>Phone: +48 444 666 3333</div>
                                            </div>
                                            <div class="mt-4 col-xl-3 col-lg-3 col-md-6 col-sm-12 inv-text">
                                                <h4>To:</h4>
                                                <div> <strong>Bob Mart</strong> </div>
                                                <div>Attn: Daniel Marek</div>
                                                <div>43-190 Mikolow, Poland</div>
                                                <div>Email: marek@daniel.com</div>
                                                <div>Phone: +48 123 456 789</div>
                                            </div>
                                            {/* <div class="mt-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start">
                                        <div class="row align-items-center">
											<div class="col-sm-9 text-white"> 
												<div class="brand-logo mb-3">
													<svg  class="logo-abbr" width="43" height="34" viewBox="0 0 43 34" fill="none" xmlns="http://www.w3.org/2000/svg">
														<rect x="22.6154" width="19.6154" height="6.53846" rx="3.26923" fill="white"/>
														<rect x="22.6154" y="9.15387" width="19.6154" height="6.53846" rx="3.26923" fill="white"/>
														<rect x="22.6154" y="18.3077" width="19.6154" height="6.53846" rx="3.26923" fill="white"/>
														<rect x="0.384583" y="18.3077" width="19.6154" height="6.53846" rx="3.26923" fill="white"/>
														<rect x="22.6154" y="27.4615" width="19.6154" height="6.53846" rx="3.26923" fill="white"/>
														<rect x="0.384583" y="27.4615" width="19.6154" height="6.53846" rx="3.26923" fill="white"/>
													</svg>
													<svg class="brand-title ms-2" width="124" height="33" viewBox="0 0 124 33" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M11.65 2.516C14.758 2.516 17.474 3.132 19.798 4.364C22.122 5.596 23.914 7.332 25.174 9.572C26.462 11.784 27.106 14.346 27.106 17.258C27.106 20.142 26.462 22.704 25.174 24.944C23.914 27.184 22.108 28.92 19.756 30.152C17.432 31.384 14.73 32 11.65 32H0.604V2.516H11.65ZM11.188 25.784C13.904 25.784 16.018 25.042 17.53 23.558C19.042 22.074 19.798 19.974 19.798 17.258C19.798 14.542 19.042 12.428 17.53 10.916C16.018 9.404 13.904 8.648 11.188 8.648H7.786V25.784H11.188ZM41.7876 32.336C39.4916 32.336 37.4196 31.846 35.5716 30.866C33.7516 29.886 32.3096 28.486 31.2456 26.666C30.2096 24.846 29.6916 22.718 29.6916 20.282C29.6916 17.874 30.2236 15.76 31.2876 13.94C32.3516 12.092 33.8076 10.678 35.6556 9.698C37.5036 8.718 39.5756 8.228 41.8716 8.228C44.1676 8.228 46.2396 8.718 48.0876 9.698C49.9356 10.678 51.3916 12.092 52.4556 13.94C53.5196 15.76 54.0516 17.874 54.0516 20.282C54.0516 22.69 53.5056 24.818 52.4136 26.666C51.3496 28.486 49.8796 29.886 48.0036 30.866C46.1556 31.846 44.0836 32.336 41.7876 32.336ZM41.7876 26.12C43.1596 26.12 44.3216 25.616 45.2736 24.608C46.2536 23.6 46.7436 22.158 46.7436 20.282C46.7436 18.406 46.2676 16.964 45.3156 15.956C44.3916 14.948 43.2436 14.444 41.8716 14.444C40.4716 14.444 39.3096 14.948 38.3856 15.956C37.4616 16.936 36.9996 18.378 36.9996 20.282C36.9996 22.158 37.4476 23.6 38.3436 24.608C39.2676 25.616 40.4156 26.12 41.7876 26.12ZM65.0438 0.92V32H57.8618V0.92H65.0438ZM68.8205 20.24C68.8205 17.832 69.2685 15.718 70.1645 13.898C71.0885 12.078 72.3345 10.678 73.9025 9.698C75.4705 8.718 77.2205 8.228 79.1525 8.228C80.8045 8.228 82.2465 8.564 83.4785 9.236C84.7385 9.908 85.7045 10.79 86.3765 11.882V8.564H93.5585V32H86.3765V28.682C85.6765 29.774 84.6965 30.656 83.4365 31.328C82.2045 32 80.7625 32.336 79.1105 32.336C77.2065 32.336 75.4705 31.846 73.9025 30.866C72.3345 29.858 71.0885 28.444 70.1645 26.624C69.2685 24.776 68.8205 22.648 68.8205 20.24ZM86.3765 20.282C86.3765 18.49 85.8725 17.076 84.8645 16.04C83.8845 15.004 82.6805 14.486 81.2525 14.486C79.8245 14.486 78.6065 15.004 77.5985 16.04C76.6185 17.048 76.1285 18.448 76.1285 20.24C76.1285 22.032 76.6185 23.46 77.5985 24.524C78.6065 25.56 79.8245 26.078 81.2525 26.078C82.6805 26.078 83.8845 25.56 84.8645 24.524C85.8725 23.488 86.3765 22.074 86.3765 20.282ZM105.936 11.882C106.608 10.79 107.574 9.908 108.834 9.236C110.094 8.564 111.536 8.228 113.16 8.228C115.092 8.228 116.842 8.718 118.41 9.698C119.978 10.678 121.21 12.078 122.106 13.898C123.03 15.718 123.492 17.832 123.492 20.24C123.492 22.648 123.03 24.776 122.106 26.624C121.21 28.444 119.978 29.858 118.41 30.866C116.842 31.846 115.092 32.336 113.16 32.336C111.508 32.336 110.066 32.014 108.834 31.37C107.602 30.698 106.636 29.816 105.936 28.724V32H98.7544V0.92H105.936V11.882ZM116.184 20.24C116.184 18.448 115.68 17.048 114.672 16.04C113.692 15.004 112.474 14.486 111.018 14.486C109.59 14.486 108.372 15.004 107.364 16.04C106.384 17.076 105.894 18.49 105.894 20.282C105.894 22.074 106.384 23.488 107.364 24.524C108.372 25.56 109.59 26.078 111.018 26.078C112.446 26.078 113.664 25.56 114.672 24.524C115.68 23.46 116.184 22.032 116.184 20.24Z" fill="white"/>
													</svg>

												</div>
                                                <span>Please send exact amount: <strong class="d-block">0.15050000 BTC</strong>
                                                    <strong>1DonateWffyhwAjskoEwXt83pHZxhLTr8H</strong></span><br/>
                                                <small class="">Current exchange rate 1BTC = $6590 USD</small>
                                            </div>
                                            <div class="col-sm-3 mt-3"> <img src="images/qr.png" alt="" class="img-fluid width110"/> </div>
                                        </div>
                                    </div> */}
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th class="center">#</th>
                                                        <th>Item</th>
                                                        <th>Description</th>
                                                        <th class="right">Unit Cost</th>
                                                        <th class="center">Qty</th>
                                                        <th class="right">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td class="center text-white">1</td>
                                                        <td class="left strong text-white">Origin License</td>
                                                        <td class="left text-white">Extended License</td>
                                                        <td class="right text-white">$999,00</td>
                                                        <td class="center text-white">1</td>
                                                        <td class="right text-white">$999,00</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="center">2</td>
                                                        <td class="left">Custom Services</td>
                                                        <td class="left">Instalation and Customization (cost per hour)</td>
                                                        <td class="right">$150,00</td>
                                                        <td class="center">20</td>
                                                        <td class="right">$3.000,00</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="center">3</td>
                                                        <td class="left">Hosting</td>
                                                        <td class="left">1 year subcription</td>
                                                        <td class="right">$499,00</td>
                                                        <td class="center">1</td>
                                                        <td class="right">$499,00</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="center">4</td>
                                                        <td class="left">Platinum Support</td>
                                                        <td class="left">1 year subcription 24/7</td>
                                                        <td class="right">$3.999,00</td>
                                                        <td class="center">1</td>
                                                        <td class="right">$3.999,00</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-4 col-sm-5"> </div>
                                            <div class="col-lg-4 col-sm-5 ms-auto">
                                                <table class="table table-clear">
                                                    <tbody>
                                                        <tr>
                                                            <td class="left"><strong>Subtotal</strong></td>
                                                            <td class="right">$8.497,00</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="left"><strong>Discount (20%)</strong></td>
                                                            <td class="right">$1,699,40</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="left"><strong>VAT (10%)</strong></td>
                                                            <td class="right">$679,76</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="left"><strong>Total</strong></td>
                                                            <td class="right"><strong>$7.477,36</strong><br />
                                                                <strong>0.15050000 BTC</strong></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <button type="button" class="btn btn-rounded btn-info"><span class="btn-icon-check text-info"></span>Accept Offer</button>
                                            </div>
                                        </div>
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

export default OfferDetail;