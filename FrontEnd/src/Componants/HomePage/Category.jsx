import React, { useContext } from 'react'
import "./Category.scss";
import { context } from '../../Context/Store';
export const Category = () => {

    const { AllCategories } = useContext(context);

    return (


        <>


            <div className='category-elements d-flex flex-column gap-3'>

                <div className="row row-cols-3  row-cols-md-4 row-cols-lg-6">

                    {AllCategories.map((ele) => (

                        <div key={ele._id} className="col">

                            <img src={ele.img} alt={ele.title} />
                            <h5>{ele.title}</h5>

                            <button className='btn '>Shop Now</button>

                        </div>


                    ))}





                </div>


            </div>





        </>
    )
}
