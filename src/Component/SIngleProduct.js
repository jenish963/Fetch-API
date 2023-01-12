import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function SIngleProduct() {

    const [products, setProducts] = useState([])
    // const [ind, setInd] = useState(0)
    const [loading, setLoading] = useState(true)

    const {id} = useParams()

    useEffect(() => {

        axios.get(`https://dummyjson.com/products/${id}`)
        .then(res => {
            setProducts(res.data)
            setLoading(false)
            console.log(res.data);
        })
        .catch(err => {console.log(err)});
    
    }, [])


  return (
    <div>
        {
        loading ? <>Loading</> :
        <>
        <div>
           <img src={products.thumbnail} alt="Loading..." />
        </div>
        <div>
        <h1>Brand: {products.brand}</h1> 
        <h2>Title: {products.title}</h2>
        </div>
        <div><b>Description:</b> {products.description}</div>
        <div><b>Discount Price:</b> ₹{products.price-((products.price*products.discountPercentage)/100)} <b>{products.discountPercentage}%  Off</b></div>
        <div><b>Original Price:</b> ₹{products.price}</div>
        <div><b>Stock:</b>{products.stock}</div></>}
    </div>
  )
}

export default SIngleProduct