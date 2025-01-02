import React from 'react'

import "./Womens.scss";
import BestWomensCollection from './BestWomensCollection';
import { Link } from "react-router-dom"

const Womens = () => {
    return (
      
        <>
            



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
                            src="https://worldbalance.com.ph/cdn/shop/files/WOMEN_CATEGORY_BANNER.jpg?v=1731467138&width=5760"
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
                            src="https://img.freepik.com/free-vector/fashion-template-design_23-2150368859.jpg?t=st=1734591357~exp=1734594957~hmac=480870fa92c7c8a6860665ec3a3e077971a8bd0b682c81e33a11eb5fa3b44b66&w=1380"
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
                            src="https://kohsh.in/cdn/shop/collections/kohsh_womens_day_category_banner.jpg?v=1708516701"
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
        
            




            <div className='womens-category'>

                <div className="womens-category-row row row-cols-lg-5 gy-6">

                    <Link className='link' to="/womens/kurtas">

                    <div className="col">


                        <img src="https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/8d992d81-49e6-4dec-89a4-49a8af8beb5d1594222967220-Kurtas-_-Kurta-Sets.jpg" alt="" />
                        </div>
                        
                    </Link>

                    <Link className='link' to="/womens/kurtas">
                    <div className="col">

                        <img src="https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/a048cca8-7b5d-417e-9645-ca98f4b6e52c1594222967506-Sarees.jpg" alt="" />
                        </div>
                    </Link>

                    <Link className='link' to="/womens/kurtas">
                    <div className="col">

                        <img src="https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/b0f459a0-9ef0-4392-a9ed-23892a36e79c1594222966859-Dresses.jpg" alt="" />

                        </div>
                    </Link>

                    <Link className='link' to="/womens/kurtas">
                    <div className="col">

                        <img src="https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/a4dedaa4-3710-4061-b7d6-ca8c83ce9d021594222967117-Heels.jpg" alt="" />

                        </div>
                    </Link>
                            
                    <Link className='link' to="/womens/kurtas">
                    <div className="col">

                        <img src="https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/a352f908-57c8-4c66-b052-18137cf15e6c1594222967074-Handbags.jpg" alt="" />

                    </div>
                    </Link>


                </div>


                <div className="row">

                <BestWomensCollection/>

                </div>




            </div>
            
        </>
  )
}

export default Womens