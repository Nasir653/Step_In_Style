
import { Link } from "react-router-dom";
import { Category } from "./Category";
import "./HomePage.scss";
import NewCollection from "./NewCollection";
import Trending from "./Trending";


function Home() {

    return (

        <>


            <div className="container-fluid">


                <div>
                    <div
                        id="carouselExampleCaptions"
                        className="carousel slide"
                        data-bs-ride="carousel"
                    >
                        <div className="carousel-indicators">
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="0"
                                className="active"
                                aria-current="true"
                                aria-label="Slide 1"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="1"
                                aria-label="Slide 2"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="2"
                                aria-label="Slide 3"
                            ></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img
                                    src="https://www.beyoung.in/api/catalog/homepage-nov/goat-sale/banner/goat-sale_desktop_30nov.jpg"
                                    className="d-block w-100 img"
                                    alt="..."
                                ></img>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p>
                                        Some representative placeholder content for the first slide.
                                    </p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="https://www.beyoung.in/api/catalog/homepage-nov/goat-sale/banner/GOAT-Sale-winter-desktop-12-dec-24.jpg"
                                    className="d-block w-100 img"
                                    alt="..."
                                ></img>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Second slide label</h5>
                                    <p>
                                        Some representative placeholder content for the second
                                        slide.
                                    </p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/12/6/5de27ff7-9f3a-48d1-9dac-882ed0a83b801733424846403-Sale_1920x504-HP-----5.jpg "
                                    className="d-block w-100 img"
                                    alt="..."
                                ></img>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Third slide label</h5>
                                    <p>
                                        Some representative placeholder content for the third slide.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="prev"
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="next"
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                {/* ------------------------------------------ Content --------------------------------------------------------------        */}




                {/* ------------------------- End ------------------ ------------------------ */}
            </div>



            <div className="container-fluid">


                <div className="content   d-flex  flex-column">


                    <div className="New-collection ">  <NewCollection />   </div>


                    <div className="Gender-category">

                        <Link to="/Category/mens">
                            <div className="col-mens">
                                <img src="https://img.freepik.com/premium-vector/men-fashion-collection-social-media-banner-template-design_596383-109.jpg" alt="" />
                            </div>
                        </Link>


                        <Link to="/Category/womens">

                            <div className="col-womens">

                                <img src="https://www.primeemarket.com/cdn/shop/files/1643651730_550x.jpg?v=1645386541" alt="" />


                            </div>


                        </Link>

                        <div className="col-kids">

                            <img src="https://t3.ftcdn.net/jpg/02/11/82/88/360_F_211828832_OnMaambs24g0vZM8HLjqZ8tU5wH4y1oD.jpg" alt="" />


                        </div>


                    </div>


                    <div className="Trending">

                        <Trending />

                    </div>

                </div>



                {/* --------------------------------------------- Items Category ----------------------------------------- */}



                <div className="items-category">


                    <Category />



                </div>


            </div>


        </>


    );
}

export default Home;
