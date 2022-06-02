import React from 'react'
import '../css/CategoryPage.css'
import { Link, useParams } from 'react-router-dom';


function CategoryPage() {

    const {category}=useParams();
  return (
    <div className='categoryContent'><Link to="/" > CategoryPage</Link> {category}</div>
  )
}

export default CategoryPage