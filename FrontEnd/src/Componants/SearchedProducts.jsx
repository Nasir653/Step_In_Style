import React, { useContext } from 'react'
import { context } from '../Context/Store'

const SearchedProducts = () => {

    const { SearchedItems } = useContext(context);

    
    


    return (
        <div className='cart'>


            {SearchedItems.length > 0 ? (SearchedItems.map((ele) => (

                <div className="items">

                    <img src={ele.imageUrl} alt="ele.title" className="img" />

                    <div className="text">
                        <h4>{ele.title}</h4>
                        <h3>{ele.details}</h3>
                        <h3>{ele.price}</h3>



                        <button>Place Order</button>

                    </div>




                </div>



            ))) : (<p>UnAvaiable</p>)


            }



        </div>

    )
}

export default SearchedProducts