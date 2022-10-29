import React from 'react'
import styles from '../styles/Home.module.css'
const ShowDetails = ({showDetails}) => {
  return (
        showDetails&&
        <div className={styles.details} style={{border:"1px solid black!important"}}>
         <p>Title:{showDetails.title}</p>
         <p>Url:{showDetails.url}</p>
         <p>Category:{showDetails.category}</p>
       </div>
  )
}

export default ShowDetails