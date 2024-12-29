import React from 'react'
import EditCategoryPage from './EditCategoryPage'
import EditNewCollection from './EditNewCollection'
const LandingPage = () => {
  return (
    <div className='container-fluid '>

      
      <div className="New-Collection">
         <EditNewCollection/>

    </div>

      
      <div className="EditCategory">
        <EditCategoryPage />
      </div>

    </div>
  )
}

export default LandingPage