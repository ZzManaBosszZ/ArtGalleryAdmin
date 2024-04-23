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
function OfferList() {

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    const [error, setError] = useState(null);
    const [offers, setOffers] = useState([]);
    //paginate
    const [currentPage, setCurrentPage] = useState(1);
    const offersPerPage = 8;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const totalPages = Math.ceil(offers.length / offersPerPage);
    const indexOfLastOffer = currentPage * offersPerPage;
    const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
    const currentOffer = offers.slice(indexOfFirstOffer, indexOfLastOffer);
    return (
        <>
            {error ? (
                <NotFound />
            ) : (
                <>
                    <Helmet>
                        <title>Offer List | Art Admin</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="Offer List" />
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-sm mb-0">
                                    <thead>
                                        <tr>
                                            <th class="align-middle">
                                                <div class="form-check custom-checkbox">
                                                    <input type="checkbox" class="form-check-input" id="checkAll" />
                                                    <label class="form-check-label" for="checkAll"></label>
                                                </div>
                                            </th>
                                            <th class="align-middle">Order</th>
                                            <th class="align-middle pe-7">Date</th>
                                            <th class="align-middle" style={{ minWidth: '12.5rem' }}>Ship To</th>
                                            <th class="align-middle text-end">Status</th>
                                            <th class="align-middle text-end">Amount</th>
                                            <th class="no-sort"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="orders">
                                        <tr class="btn-reveal-trigger">
                                            <td class="py-2">
                                                <div class="form-check custom-checkbox checkbox-success">
                                                    <input type="checkbox" class="form-check-input" id="checkbox" />
                                                    <label class="form-check-label" for="checkbox"></label>
                                                </div>
                                            </td>
                                            <td class="py-2">
                                                <a href="#">
                                                    <strong>#181</strong></a> by <strong>Ricky
                                                        Antony</strong><br /><a href="mailto:ricky@example.com">ricky@example.com</a></td>
                                            <td class="py-2">20/04/2020</td>
                                            <td class="py-2">Ricky Antony, 2392 Main Avenue, Penasauka, New Jersey 02149
                                                <p class="mb-0 text-500">Via Flat Rate</p>
                                            </td>
                                            <td class="py-2 text-end"><span class="badge badge-success">Completed<span
                                                class="ms-1 fa fa-check"></span></span>
                                            </td>
                                            <td class="py-2 text-end">$99
                                            </td>
                                            <td class="py-2 text-end">
                                                <div class="dropdown text-sans-serif"><button class="btn btn-primary tp-btn-light sharp" type="button" id="order-dropdown-0" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></span></button>
                                                    <div class="dropdown-menu dropdown-menu-end  py-0" aria-labelledby="order-dropdown-0">
                                                        <div class="py-2"><a class="dropdown-item" href="javascript:void(0);">Completed</a><a class="dropdown-item" href="javascript:void(0);">Processing</a><a class="dropdown-item" href="javascript:void(0);">On Hold</a><a class="dropdown-item" href="javascript:void(0);">Pending</a>
                                                            <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="javascript:void(0);">Delete</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="btn-reveal-trigger">
                                            <td class="py-2">
                                                <div class="form-check custom-checkbox checkbox-success">
                                                    <input type="checkbox" class="form-check-input" id="checkbox" />
                                                    <label class="form-check-label" for="checkbox"></label>
                                                </div>
                                            </td>
                                            <td class="py-2">
                                                <a href="#">
                                                    <strong>#181</strong></a> by <strong>Ricky
                                                        Antony</strong><br /><a href="mailto:ricky@example.com">ricky@example.com</a></td>
                                            <td class="py-2">20/04/2020</td>
                                            <td class="py-2">Ricky Antony, 2392 Main Avenue, Penasauka, New Jersey 02149
                                                <p class="mb-0 text-500">Via Flat Rate</p>
                                            </td>
                                            <td class="py-2 text-end"><span class="badge badge-success">Completed<span
                                                class="ms-1 fa fa-check"></span></span>
                                            </td>
                                            <td class="py-2 text-end">$99
                                            </td>
                                            <td class="py-2 text-end">
                                                <div class="dropdown text-sans-serif"><button class="btn btn-primary tp-btn-light sharp" type="button" id="order-dropdown-0" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></span></button>
                                                    <div class="dropdown-menu dropdown-menu-end  py-0" aria-labelledby="order-dropdown-0">
                                                        <div class="py-2"><a class="dropdown-item" href="javascript:void(0);">Completed</a><a class="dropdown-item" href="javascript:void(0);">Processing</a><a class="dropdown-item" href="javascript:void(0);">On Hold</a><a class="dropdown-item" href="javascript:void(0);">Pending</a>
                                                            <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="javascript:void(0);">Delete</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="btn-reveal-trigger">
                                            <td class="py-2">
                                                <div class="form-check custom-checkbox checkbox-success">
                                                    <input type="checkbox" class="form-check-input" id="checkbox" />
                                                    <label class="form-check-label" for="checkbox"></label>
                                                </div>
                                            </td>
                                            <td class="py-2">
                                                <a href="#">
                                                    <strong>#181</strong></a> by <strong>Ricky
                                                        Antony</strong><br /><a href="mailto:ricky@example.com">ricky@example.com</a></td>
                                            <td class="py-2">20/04/2020</td>
                                            <td class="py-2">Ricky Antony, 2392 Main Avenue, Penasauka, New Jersey 02149
                                                <p class="mb-0 text-500">Via Flat Rate</p>
                                            </td>
                                            <td class="py-2 text-end"><span class="badge badge-success">Completed<span
                                                class="ms-1 fa fa-check"></span></span>
                                            </td>
                                            <td class="py-2 text-end">$99
                                            </td>
                                            <td class="py-2 text-end">
                                                <div class="dropdown text-sans-serif"><button class="btn btn-primary tp-btn-light sharp" type="button" id="order-dropdown-0" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></span></button>
                                                    <div class="dropdown-menu dropdown-menu-end  py-0" aria-labelledby="order-dropdown-0">
                                                        <div class="py-2"><a class="dropdown-item" href="javascript:void(0);">Completed</a><a class="dropdown-item" href="javascript:void(0);">Processing</a><a class="dropdown-item" href="javascript:void(0);">On Hold</a><a class="dropdown-item" href="javascript:void(0);">Pending</a>
                                                            <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="javascript:void(0);">Delete</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-lg-5"></div>
                                    <div className="col-lg-4"></div>
                                    <div className="col-lg-3 text-end">
                                        <nav>
                                            <ul className="pagination pagination-gutter pagination-primary no-bg">
                                                <li className={`page-item page-indicator ${currentPage === 1 ? "disabled" : ""}`}>
                                                    <a className="page-link" href="javascript:void(0)" onClick={handlePrevPage}>
                                                        <i className="la la-angle-left"></i>
                                                    </a>
                                                </li>
                                                {Array.from({ length: totalPages }).map((_, index) => (
                                                    <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                                        <a className="page-link" href="javascript:void(0)" onClick={() => handlePageChange(index + 1)}>
                                                            {index + 1}
                                                        </a>
                                                    </li>
                                                ))}
                                                <li className={`page-item page-indicator ${currentPage === totalPages ? "disabled" : ""}`}>
                                                    <a className="page-link" href="javascript:void(0)" onClick={handleNextPage}>
                                                        <i className="la la-angle-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
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

export default OfferList;