import React from 'react'
import EditCategoryPage from './EditCategoryPage'
import EditNewCollection from './EditNewCollection'
import EditTrending from './EditTrending'
const LandingPage = () => {
  return (
    <div className='container-fluid '>

      
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
                  src="https://www.beyoung.in/api/catalog/homepage-nov/goat-sale/banner/goat-sale_desktop_30nov.jpg"
                  class="d-block w-100 img"
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
                  src="https://www.beyoung.in/api/catalog/homepage-nov/goat-sale/banner/GOAT-Sale-winter-desktop-12-dec-24.jpg"
                  class="d-block w-100 img"
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
                  src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/12/6/5de27ff7-9f3a-48d1-9dac-882ed0a83b801733424846403-Sale_1920x504-HP-----5.jpg "
                  class="d-block w-100 img"
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


      
      <div className="New-Collection">
         <EditNewCollection/>

    </div>

      
      <div className="trending_div">

        <EditTrending/>
      </div>
      
      <div className="EditCategory">
        <EditCategoryPage />
      </div>



    </div>
  )
}

export default LandingPage