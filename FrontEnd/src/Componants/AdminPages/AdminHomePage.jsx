import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "./AdminHome.scss";
import { context } from "../../Context/Store";
import IsAuthorized from "../../utils/IsAuthorized";

const AdminHomePage = () => {
    const navigate = useNavigate();
    const { UserData, fetchAllOrders, AllOrders, getLastMonthsUsers, Last30DaysUsers, DispatchOrder } = useContext(context);

    const [orders, setOrders] = useState([]);

    IsAuthorized();

    useEffect(() => {
        fetchAllOrders();
        getLastMonthsUsers();
    }, []);

    useEffect(() => {
        setOrders(AllOrders);
    }, [AllOrders]);

    // Count orders by status
    const PendingOrders = orders.filter(order => order.orderStatus === "Pending").length;
    const ConfirmedOrders = orders.filter(order => order.orderStatus === "Confirmed").length;
    const CancelledOrders = orders.filter(order => order.orderStatus === "Cancelled").length;
    const CompletedOrders = orders.filter(order => order.orderStatus === "Completed").length;


    const orderStatusChartData = {
        labels: ["Pending", "Confirmed", "Cancelled", "Completed"],
        datasets: [
            {
                data: [PendingOrders, ConfirmedOrders, CancelledOrders, CompletedOrders],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCD56", "#4CAF50"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCD56", "#4CAF50"],
            },
        ],
    };


    const userChartData = {
        labels: ["New Users (Last 30 Days)", "Existing Users"],
        datasets: [
            {
                data: [Last30DaysUsers.length, 1000 - Last30DaysUsers.length],
                backgroundColor: ["#36A2EB", "#FF6384"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384"],
            },
        ],
    };


    const salesChartData = {
        labels: ["Confirmed Orders", "Other Orders"],
        datasets: [
            {
                data: [
                    ConfirmedOrders,
                    orders.length > 0 ? orders.length - ConfirmedOrders : 0
                ],
                backgroundColor: ["#4CAF50", "#FFC107"],
                hoverBackgroundColor: ["#4CAF50", "#FFC107"],
            },
        ],
    };

    const handleDispatch = async (orderId) => {
        await DispatchOrder(orderId);
        fetchAllOrders();
    };

    return (
        <div className="container-fluid">
            <div className="row admin-home">
                {/* Sidebar */}
                <div className="col admin-sidebar col-xsm-3 col-sm-3 col-md-3 col-lg-2 border">
                    <div className="admin-header">
                        <h4>Admin Panel</h4>
                    </div>
                    <div className="admin-menu">
                        <h5>Dashboard</h5>
                        <h6>Overview</h6>
                        <h6 className="btn-group dropend">
                            <label className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Product
                            </label>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to="/Create/Products" className="dropdown-item">
                                        Create Products
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/get/AllProducts" className="dropdown-item">
                                        All Products
                                    </Link>
                                </li>
                            </ul>
                        </h6>
                        <h6>
                            <Link className="edit-landing-page" to="/admin/landingPage">
                                Edit Landing Page
                            </Link>
                        </h6>
                        <h6>Offers</h6>
                        <h6>Inventory</h6>
                        <h6 onClick={() => navigate("/admin/allOrder")}>Orders</h6>
                        <h6>Sales</h6>
                        <h6 onClick={() => navigate("/admin/allCustomers")}>Customers</h6>
                        <h6>Settings</h6>
                    </div>
                </div>

                {/* Main Content */}
                <div className="col admin-content">
                    {/* Order Summary */}
                    <div className="row order-summary row-cols-lg-4 border">
                        <div className="col order-card">
                            <h4>Total Orders</h4>
                            <p>{orders.length}</p>
                        </div>
                        <div className="col order-card">
                            <h4>Cancelled Orders</h4>
                            <p>{CancelledOrders}</p>
                        </div>
                        <div className="col order-card">
                            <h4>Confirmed Orders</h4>
                            <p>{ConfirmedOrders}</p>
                        </div>
                        <div className="col order-card">
                            <h4>Completed Orders</h4>
                            <p>{CompletedOrders}</p>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="row charts-section row-cols-sm-1 row-cols-md-2 row-cols-lg-3 ">
                        <div className="col chart-container">
                            <h3>User Growth Overview</h3>
                            <Doughnut data={userChartData} />
                        </div>

                        <div className="col chart-container">
                            <h3>Sales Overview</h3>
                            <Doughnut data={salesChartData} />
                        </div>


                        <div className="col chart-container">
                            <h3>Order Status Overview</h3>
                            <Doughnut data={orderStatusChartData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
