import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./AdminHome.scss";
import { context } from '../../Context/Store';

const AdminHomePage = () => {

    const { fetchAllOrders, AllOrders, getLastMonthsUsers, Last30DaysUsers } = useContext(context)





    useEffect(() => {
        fetchAllOrders();
        getLastMonthsUsers()


    }, []);


    const PendingOrders = AllOrders.filter((ele) => ele.orderStatus === "pending");





    return (
        <div className="container-fluid">
            <div className="row row1">

                <div className="col dashboard col-lg-2">
                    <div className="header">
                        <h4>Admin Panel</h4>
                    </div>
                    <div className="list">
                        <h5>Dashboard</h5>
                        <h6>Overview</h6>

                        <div className="btn-group dropend">
                            <label
                                className="dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ cursor: 'pointer' }}
                            >
                                Create Product
                            </label>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to="/Create/mensProducts" className="dropdown-item">Create Product</Link>
                                </li>
                                {/* <li>
                                    <Link to="/Create/womensProducts" className="dropdown-item">Womens Sector</Link>
                                </li>
                                <li>
                                    <Link to="/Create/kidsProducts" className="dropdown-item">Kids Sector</Link>
                                </li> */}
                            </ul>
                        </div>
                        <h6> <Link to="/admin/landingPage" >Edit Landing Page</Link>   </h6>
                        <h6>Offers</h6>
                        <h6>Inventory</h6>
                        <h6>Orders</h6>
                        <h6>Sales</h6>
                        <h6>Customers</h6>
                        <h6>Settings</h6>
                    </div>
                </div>
                {/* Main Content */}
                <div className="col overview col-lg-10">
                    <div className="row order-status">
                        <div className="col">
                            <h4>Total Orders: {AllOrders.length}</h4>

                        </div>
                        <div className="col">
                            <h4>Pending Orders:{PendingOrders.length}</h4>

                        </div>
                        <div className="col">
                            <h4>Delivery Status:</h4>

                        </div>
                        <div className="col">
                            <h4>New Users (last 30 days): {Last30DaysUsers.length}</h4>
                            <p>All Details</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
