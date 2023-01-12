import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
 
function Table() {

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState()
    const [filteredProducts, setFilterdProducts] = useState([])

    useEffect(() => {
        axios.get("https://dummyjson.com/products?skip=0&limit=100")
        .then(res => {
            setProducts(res.data.products) 
            setFilterdProducts(res.data.products)
        })
        .catch(err => {console.log(err)})
    }, [])

    const columns = [
        {
            name: "Brand",
            selector: (a) => a.brand,
            sortable: true
        },
        {
            name: "Title",
            selector: (a) => a.title
        },
        {
            name: "Description",
            selector: (a) => a.description
        },
        {
            name: "DiscountPercentage",
            selector: (a) => a.discountPercentage,
            sortable: true
        },
        {
            name: "Thumbnail",
            selector: (a) => <img height={50} width={50} src={a.thumbnail} alt="loading" />
        },
    ]

    useEffect(() => {
      const result = products.filter((p) =>{
        return p.brand.toLowerCase().toString().match(search.toLowerCase().toString()) ||
            p.description.toLowerCase().toString().match(search.toLowerCase().toString()) ||
            p.title.toLowerCase().toString().match(search.toLowerCase().toString()) ||
            p.discountPercentage.toString().match(search.toString())
      })

      setFilterdProducts(result)

    }, [search])
    
    
  return (
    <div>
        {/* <table border={1} width={700}>
            <tbody>
            <tr>
            <td>Brand</td>
            <td>Category</td>
            <td>Descrition</td>
            <td>DiscountPercentage</td>
            <td>Thumbnail</td>
            </tr>
            </tbody>
                {products.map((data,index) => (
                    <tr key={index}> 
                    <td>{data.brand}</td>
                    <td>{data.category}</td>
                    <td>{data.description}</td>
                    <td>{data.discountPercentage}</td>
                    <td><img width={50} height={50} src={data.thumbnail} alt="thumbnail"/></td>
                    </tr>)
                )}
        </table>  */}
        <DataTable 
        title="Product List"
        fixedHeader
        fixedHeaderScrollHeight='450px'
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        columns={columns} 
        data={filteredProducts} 
        subHeader
        subHeaderComponent={
            <input 
                type="text"
                placeholder='Search Here...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}/>
        }
        pagination/>
    </div>
  )
}

export default Table