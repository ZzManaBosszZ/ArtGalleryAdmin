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
function ClientList() {

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    const [error, setError] = useState(null);
    const [clients, setClient] = useState([]);
    //paginate
    const [currentPage, setCurrentPage] = useState(1);
    const clientsPerPage = 8;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const totalPages = Math.ceil(clients.length / clientsPerPage);
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClient = clients.slice(indexOfFirstClient, indexOfLastClient);

    return (
        <>
            {error ? (
                <NotFound />
            ) : (
                <>
                    <Helmet>
                        <title>Client List | Art Admin</title>
                    </Helmet>
                    {loading ? <Loading /> : ""}
                    <Layout>
                        <Breadcrumb title="Client List" />
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-sm mb-0 table-striped student-tbl">
                                    <thead>
                                        <tr>
                                            <th class=" pe-3">
                                                <div class="form-check custom-checkbox mx-2">
                                                    <input type="checkbox" class="form-check-input" id="checkAll" />
                                                    <label class="form-check-label" for="checkAll"></label>
                                                </div>
                                            </th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th class=" ps-5" style={{ minWidth: '200px' }}>Billing Address
                                            </th>
                                            <th>Joined</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="customers">
                                        <tr class="btn-reveal-trigger">
                                            <td class="py-2">
                                                <div class="form-check custom-checkbox mx-2">
                                                    <input type="checkbox" class="form-check-input" id="checkbox1" />
                                                    <label class="form-check-label" for="checkbox1"></label>
                                                </div>
                                            </td>
                                            <td class="py-3">
                                                <a href="#">
                                                    <div class="media d-flex align-items-center">
                                                        <div class="avatar avatar-xl me-2">
                                                            <div class=""><img class="rounded-circle img-fluid"
                                                                src="images/avatar/5.png" width="30" alt="" />
                                                            </div>
                                                        </div>
                                                        <div class="media-body">
                                                            <h5 class="mb-0 fs--1">Ricky Antony</h5>
                                                        </div>
                                                    </div>
                                                </a>
                                            </td>
                                            <td class="py-2"><a
                                                href="mailto:ricky@example.com">info@example.com</a></td>
                                            <td class="py-2"> <a href="tel:2012001851">(201) 200-1851</a></td>
                                            <td class="py-2 ps-5">2392 Main Avenue, Penasauka</td>
                                            <td class="py-2">30/03/2018</td>
                                            <td class="py-2 text-end">
                                                <div class="dropdown"><button class="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span class="fs--1"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></span></button>
                                                    <div class="dropdown-menu dropdown-menu-end border py-0">
                                                        <div class="py-2"><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item text-danger" href="#!">Delete</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="btn-reveal-trigger">
                                            <td class="py-2">
                                                <div class="form-check custom-checkbox mx-2">
                                                    <input type="checkbox" class="form-check-input" id="checkbox2" />
                                                    <label class="form-check-label" for="checkbox2"></label>
                                                </div>
                                            </td>
                                            <td class="py-3">
                                                <a href="#">
                                                    <div class="media d-flex align-items-center">
                                                        <div class="avatar avatar-xl me-2">
                                                            <img class="rounded-circle img-fluid"
                                                                src="images/avatar/1.png" alt="" width="30" />
                                                        </div>
                                                        <div class="media-body">
                                                            <h5 class="mb-0 fs--1">Emma Watson</h5>
                                                        </div>
                                                    </div>
                                                </a>
                                            </td>
                                            <td class="py-2"><a href="mailto:emma@example.com">info@example.com</a>
                                            </td>
                                            <td class="py-2"> <a href="tel:2122288403">(212) 228-8403</a></td>
                                            <td class="py-2 ps-5">2289 5th Avenue, New York
                                            </td>
                                            <td class="py-2">11/07/2017</td>
                                            <td class="py-2 text-end">
                                                <div class="dropdown"><button class="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span class="fs--1"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></span></button>
                                                    <div class="dropdown-menu dropdown-menu-end border py-0">
                                                        <div class="py-2"><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item text-danger" href="#!">Delete</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="btn-reveal-trigger">
                                            <td class="py-2">
                                                <div class="form-check custom-checkbox mx-2">
                                                    <input type="checkbox" class="form-check-input" id="checkbox3" />
                                                    <label class="form-check-label" for="checkbox3"></label>
                                                </div>
                                            </td>
                                            <td class="py-3">
                                                <a href="#">
                                                    <div class="media d-flex align-items-center">
                                                        <div class="avatar avatar-xl me-2">
                                                            <div class=""><img class="rounded-circle img-fluid"
                                                                src="images/avatar/5.png" width="30" alt="" />
                                                            </div>
                                                        </div>
                                                        <div class="media-body">
                                                            <h5 class="mb-0 fs--1">Rowen Atkinson</h5>
                                                        </div>
                                                    </div>
                                                </a>
                                            </td>
                                            <td class="py-2"><a href="mailto:rown@example.com">info@example.com</a>
                                            </td>
                                            <td class="py-2"> <a href="tel:2012001851">(201) 200-1851</a></td>
                                            <td class="py-2 ps-5">112 Bostwick Avenue, Jersey City
                                            </td>
                                            <td class="py-2">05/04/2016</td>
                                            <td class="py-2 text-end">
                                                <div class="dropdown"><button class="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span class="fs--1"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></span></button>
                                                    <div class="dropdown-menu dropdown-menu-end border py-0">
                                                        <div class="py-2"><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item text-danger" href="#!">Delete</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="btn-reveal-trigger">
                                            <td class="py-2">
                                                <div class="form-check custom-checkbox mx-2">
                                                    <input type="checkbox" class="form-check-input" id="checkbox4" />
                                                    <label class="form-check-label" for="checkbox4"></label>
                                                </div>
                                            </td>
                                            <td class="py-3">
                                                <a href="#">
                                                    <div class="media d-flex align-items-center">
                                                        <div class="avatar avatar-xl me-2">
                                                            <img class="rounded-circle img-fluid"
                                                                src="images/avatar/1.png" alt="" width="30" />
                                                        </div>
                                                        <div class="media-body">
                                                            <h5 class="mb-0 fs--1">Antony Hopkins</h5>
                                                        </div>
                                                    </div>
                                                </a>
                                            </td>
                                            <td class="py-2"><a
                                                href="mailto:antony@example.com">info@example.com</a></td>
                                            <td class="py-2"> <a href="tel:9013243127">(901) 324-3127</a></td>
                                            <td class="py-2 ps-5">3448 Ile De France St #242, </td>
                                            <td class="py-2">05/04/2018</td>
                                            <td class="py-2 text-end">
                                                <div class="dropdown"><button class="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span class="fs--1"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></span></button>
                                                    <div class="dropdown-menu dropdown-menu-end border py-0">
                                                        <div class="py-2"><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item text-danger" href="#!">Delete</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="btn-reveal-trigger">
                                            <td class="py-2">
                                                <div class="form-check custom-checkbox mx-2">
                                                    <input type="checkbox" class="form-check-input" id="checkbox5" />
                                                    <label class="form-check-label" for="checkbox5"></label>
                                                </div>
                                            </td>
                                            <td class="py-3">
                                                <a href="#">
                                                    <div class="media d-flex align-items-center">
                                                        <div class="avatar avatar-xl me-2">
                                                            <img class="rounded-circle img-fluid"
                                                                src="images/avatar/1.png" alt="" width="30" />
                                                        </div>
                                                        <div class="media-body">
                                                            <h5 class="mb-0 fs--1">Jennifer Schramm</h5>
                                                        </div>
                                                    </div>
                                                </a>
                                            </td>
                                            <td class="py-2"><a
                                                href="mailto:jennifer@example.com">info@example.com</a></td>
                                            <td class="py-2"> <a href="tel:8283829631">(828) 382-9631</a></td>
                                            <td class="py-2 ps-5">659 Hannah Street, Charlotte
                                            </td>
                                            <td class="py-2">17/03/2016</td>
                                            <td class="py-2 text-end">
                                                <div class="dropdown"><button class="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span class="fs--1"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></span></button>
                                                    <div class="dropdown-menu dropdown-menu-end border py-0">
                                                        <div class="py-2"><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item text-danger" href="#!">Delete</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="btn-reveal-trigger">
                                            <td class="py-2">
                                                <div class="form-check custom-checkbox mx-2">
                                                    <input type="checkbox" class="form-check-input" id="checkbox6" />
                                                    <label class="form-check-label" for="checkbox6"></label>
                                                </div>
                                            </td>
                                            <td class="py-3">
                                                <a href="#">
                                                    <div class="media d-flex align-items-center">
                                                        <div class="avatar avatar-xl me-2">
                                                            <div class=""><img class="rounded-circle img-fluid"
                                                                src="images/avatar/5.png" width="30" alt="" />
                                                            </div>
                                                        </div>
                                                        <div class="media-body">
                                                            <h5 class="mb-0 fs--1">Raymond Mims</h5>
                                                        </div>
                                                    </div>
                                                </a>
                                            </td>
                                            <td class="py-2"><a
                                                href="mailto:raymond@example.com">info@example.com</a></td>
                                            <td class="py-2"> <a href="tel:5624685646">(562) 468-5646</a></td>
                                            <td class="py-2 ps-5">2298 Locust Court, Artesia
                                            </td>
                                            <td class="py-2">12/07/2014</td>
                                            <td class="py-2 text-end">
                                                <div class="dropdown"><button class="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span class="fs--1"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></span></button>
                                                    <div class="dropdown-menu dropdown-menu-end border py-0">
                                                        <div class="py-2"><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item text-danger" href="#!">Delete</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="btn-reveal-trigger">
                                            <td class="py-2">
                                                <div class="form-check custom-checkbox mx-2">
                                                    <input type="checkbox" class="form-check-input" id="checkbox7" />
                                                    <label class="form-check-label" for="checkbox7"></label>
                                                </div>
                                            </td>
                                            <td class="py-3">
                                                <a href="#">
                                                    <div class="media d-flex align-items-center">
                                                        <div class="avatar avatar-xl me-2">
                                                            <img class="rounded-circle img-fluid"
                                                                src="images/avatar/1.png" alt="" width="30" />
                                                        </div>
                                                        <div class="media-body">
                                                            <h5 class="mb-0 fs--1">Michael Jenkins</h5>
                                                        </div>
                                                    </div>
                                                </a>
                                            </td>
                                            <td class="py-2"><a
                                                href="mailto:jenkins@example.com">info@example.com</a></td>
                                            <td class="py-2"> <a href="tel:3026138829">(302) 613-8829</a></td>
                                            <td class="py-2 ps-5">4678 Maud Street, Philadelphia
                                            </td>
                                            <td class="py-2">15/06/2014</td>
                                            <td class="py-2 text-end">
                                                <div class="dropdown"><button class="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span class="fs--1"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></span></button>
                                                    <div class="dropdown-menu dropdown-menu-end border py-0">
                                                        <div class="py-2"><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item text-danger" href="#!">Delete</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="btn-reveal-trigger">
                                            <td class="py-2">
                                                <div class="form-check custom-checkbox mx-2">
                                                    <input type="checkbox" class="form-check-input" id="checkbox8" />
                                                    <label class="form-check-label" for="checkbox8"></label>
                                                </div>
                                            </td>
                                            <td class="py-3">
                                                <a href="#">
                                                    <div class="media d-flex align-items-center">
                                                        <div class="avatar avatar-xl me-2">
                                                            <img class="rounded-circle img-fluid"
                                                                src="images/avatar/1.png" alt="" width="30" />
                                                        </div>
                                                        <div class="media-body">
                                                            <h5 class="mb-0 fs--1">Kristine Cadena</h5>
                                                        </div>
                                                    </div>
                                                </a>
                                            </td>
                                            <td class="py-2"><a
                                                href="mailto:cadena@example.com">info@example.com</a></td>
                                            <td class="py-2"> <a href="tel:3172737814">(317) 273-7814</a></td>
                                            <td class="py-2 ps-5">3412 Crestview Manor, Indianapolis</td>
                                            <td class="py-2">15/04/2015</td>
                                            <td class="py-2 text-end">
                                                <div class="dropdown"><button class="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span class="fs--1"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></span></button>
                                                    <div class="dropdown-menu dropdown-menu-end border py-0">
                                                        <div class="py-2"><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item text-danger" href="#!">Delete</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="btn-reveal-trigger">
                                            <td class="py-2">
                                                <div class="form-check custom-checkbox mx-2">
                                                    <input type="checkbox" class="form-check-input" id="checkbox9" />
                                                    <label class="form-check-label" for="checkbox9"></label>
                                                </div>
                                            </td>
                                            <td class="py-3">
                                                <a href="#">
                                                    <div class="media d-flex align-items-center">
                                                        <div class="avatar avatar-xl me-2">
                                                            <div class=""><img class="rounded-circle img-fluid"
                                                                src="images/avatar/5.png" width="30" alt="" />
                                                            </div>
                                                        </div>
                                                        <div class="media-body">
                                                            <h5 class="mb-0 fs--1">Ricky Antony</h5>
                                                        </div>
                                                    </div>
                                                </a>
                                            </td>
                                            <td class="py-2"><a
                                                href="mailto:ricky@example.com">info@example.com</a></td>
                                            <td class="py-2"> <a href="tel:2012001851">(201) 200-1851</a></td>
                                            <td class="py-2 ps-5">2392 Main Avenue, Penasauka</td>
                                            <td class="py-2">30/03/2018</td>
                                            <td class="py-2 text-end">
                                                <div class="dropdown"><button class="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span class="fs--1"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></span></button>
                                                    <div class="dropdown-menu dropdown-menu-end border py-0">
                                                        <div class="py-2"><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item text-danger" href="#!">Delete</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="btn-reveal-trigger">
                                            <td class="py-2">
                                                <div class="form-check custom-checkbox mx-2">
                                                    <input type="checkbox" class="form-check-input" id="checkbox10" />
                                                    <label class="form-check-label" for="checkbox10"></label>
                                                </div>
                                            </td>
                                            <td class="py-3">
                                                <a href="#">
                                                    <div class="media d-flex align-items-center">
                                                        <div class="avatar avatar-xl me-2">
                                                            <img class="rounded-circle img-fluid"
                                                                src="images/avatar/1.png" alt="" width="30" />
                                                        </div>
                                                        <div class="media-body">
                                                            <h5 class="mb-0 fs--1">Emma Watson</h5>
                                                        </div>
                                                    </div>
                                                </a>
                                            </td>
                                            <td class="py-2"><a href="mailto:emma@example.com">info@example.com</a>
                                            </td>
                                            <td class="py-2"> <a href="tel:2122288403">(212) 228-8403</a></td>
                                            <td class="py-2 ps-5">2289 5th Avenue, New York
                                            </td>
                                            <td class="py-2">11/07/2017</td>
                                            <td class="py-2 text-end">
                                                <div class="dropdown"><button class="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span class="fs--1"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></span></button>
                                                    <div class="dropdown-menu dropdown-menu-end border py-0">
                                                        <div class="py-2"><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item text-danger" href="#!">Delete</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="btn-reveal-trigger">
                                            <td class="py-2">
                                                <div class="form-check custom-checkbox mx-2">
                                                    <input type="checkbox" class="form-check-input" id="checkbox11" />
                                                    <label class="form-check-label" for="checkbox11"></label>
                                                </div>
                                            </td>
                                            <td class="py-3">
                                                <a href="#">
                                                    <div class="media d-flex align-items-center">
                                                        <div class="avatar avatar-xl me-2">
                                                            <div class=""><img class="rounded-circle img-fluid"
                                                                src="images/avatar/5.png" width="30" alt="" />
                                                            </div>
                                                        </div>
                                                        <div class="media-body">
                                                            <h5 class="mb-0 fs--1">Rowen Atkinson</h5>
                                                        </div>
                                                    </div>
                                                </a>
                                            </td>
                                            <td class="py-2"><a href="mailto:rown@example.com">info@example.com</a>
                                            </td>
                                            <td class="py-2"> <a href="tel:2012001851">(201) 200-1851</a></td>
                                            <td class="py-2 ps-5">112 Bostwick Avenue, Jersey City
                                            </td>
                                            <td class="py-2">05/04/2016</td>
                                            <td class="py-2 text-end">
                                                <div class="dropdown"><button class="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span class="fs--1"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></span></button>
                                                    <div class="dropdown-menu dropdown-menu-end border py-0">
                                                        <div class="py-2"><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item text-danger" href="#!">Delete</a></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr class="btn-reveal-trigger">
                                            <td class="py-2">
                                                <div class="form-check custom-checkbox mx-2">
                                                    <input type="checkbox" class="form-check-input" id="checkbox16" />
                                                    <label class="form-check-label" for="checkbox16"></label>
                                                </div>
                                            </td>
                                            <td class="py-3">
                                                <a href="#">
                                                    <div class="media d-flex align-items-center">
                                                        <div class="avatar avatar-xl me-2">
                                                            <img class="rounded-circle img-fluid"
                                                                src="images/avatar/1.png" alt="" width="30" />
                                                        </div>
                                                        <div class="media-body">
                                                            <h5 class="mb-0 fs--1">Kristine Cadena</h5>
                                                        </div>
                                                    </div>
                                                </a>
                                            </td>
                                            <td class="py-2"><a
                                                href="mailto:cadena@example.com">info@example.com</a></td>
                                            <td class="py-2"> <a href="tel:3172737814">(317) 273-7814</a></td>
                                            <td class="py-2 ps-5">3412 Crestview Manor, Indianapolis</td>
                                            <td class="py-2">15/04/2015</td>
                                            <td class="py-2 text-end">
                                                <div class="dropdown"><button class="btn btn-primary tp-btn-light sharp" type="button" data-bs-toggle="dropdown"><span class="fs--1"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></span></button>
                                                    <div class="dropdown-menu dropdown-menu-end border py-0">
                                                        <div class="py-2"><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item text-danger" href="#!">Delete</a></div>
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

export default ClientList;