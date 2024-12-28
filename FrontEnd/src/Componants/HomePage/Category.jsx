import React, { useContext } from 'react'
import "./Category.scss";
import { context } from '../../Context/Store';
export const Category = () => {

    const { AllCategories } = useContext(context);

    return (


        <>


            <div className='category-elements d-flex flex-column gap-3'>

                <div className="row  gap-5 row-col-lg-5">

                    {AllCategories.map((ele) => (

                        <div className="col">

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
