import React from 'react'
import styles from '../styles/Home.module.css'
import ShowDetails from './showDetails'

const Bookmarks = ({groupedArr,showDetails,handleDetails}) => {
  return (
    <div className="bookMarkContainer" style={{display:'flex',columnGap:"100px"}}>
    <div className="leftDiv">
    {
     groupedArr && groupedArr.length>0 &&
     (
       groupedArr.map((singleCategory,index)=>{
        return (
         <div>
           <h4>{singleCategory[0][0].category}</h4>
          <div className={styles.bookmarkDiv}>
          {
             singleCategory[0].map(item=>{
               return (
                 <div  style={{display:"flex",justifyContent:"space-between",marginBottom:'4px'}}>
                  <a href={item.url} target="_blank">{item.title}</a>
                   <button onClick={()=>handleDetails(item)} style={{height:"30px"}}>Details</button>
                   </div>
               )
             })
           }
          </div>
           </div>
        )
       })
     )
    }
    </div>
    <div className="RightDiv">
     {
     showDetails&& <ShowDetails showDetails={showDetails} />
     }

    </div>

     </div>
  )
}

export default Bookmarks