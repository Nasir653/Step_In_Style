
import "./HomePage.scss";
import NewCollection from "./NewCollection";
import Trending from "./Trending";



//import IsAuthorized from '../utils/IsAuthorized';

function Home() {
   

    


    return (
        <>
            <div className="container-fluid">


                <div>
                    <div
                        id="carouselExampleCaptions"
                        class="carousel slide"
                        data-bs-ride="carousel"
                    >
                        <div class="carousel-indicators">
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="0"
                                class="active"
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
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img
                                    src="https://img.freepik.com/free-photo/studio-close-up-portrait-young-fresh-blonde-woman-brown-straw-poncho-wool-black-trendy-hat-round-glasses-looking-camera-green-leather-had-bag_273443-1121.jpg"
                                    class="d-block w-100"
                                    alt="..."
                                ></img>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p>
                                        Some representative placeholder content for the first slide.
                                    </p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img
                                    src="https://www.dior.com/couture/var/dior/storage/images/pushs-editos/folder-noel-24/s5169ubxpm01e/44577664-1-eng-GB/s5169ubxpm01e_1440_1200.jpg?imwidth=640"
                                    class="d-block w-100"
                                    alt="..."
                                ></img>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Second slide label</h5>
                                    <p>
                                        Some representative placeholder content for the second
                                        slide.
                                    </p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img
                                    src="https://media.istockphoto.com/id/1180369198/photo/winter-portrait-of-happy-children.jpg?s=612x612&w=0&k=20&c=XIPGl3abW8We99MgURR0S1HDu_iYCpajdP50HTnfmhk="
                                    class="d-block w-100"
                                    alt="..."
                                ></img>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Third slide label</h5>
                                    <p>
                                        Some representative placeholder content for the third slide.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            class="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="prev"
                        >
                            <span
                                class="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button
                            class="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="next"
                        >
                            <span
                                class="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                {/* ------------------------------------------ Content --------------------------------------------------------------        */}

             


                {/* ------------------------- End ------------------ ------------------------ */}
            </div>


            <div className="container-fluid">
            
            
                <div className="content   d-flex  flex-column">


                    <div className="New-collection bg-warning">  <NewCollection />   </div>


                    <div className="category">


                        <div className="col-mens">1</div>
                        <div className="col-womens">2</div>


                    </div>


                    <div className="Trending">

                              <Trending/>

                    </div>



                </div>

            
            
            </div> 




            {/* 

           
            
            */
            }





        </>
    );
}

export default Home;
