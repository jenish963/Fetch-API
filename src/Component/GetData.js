import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
 
function GetData() {

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState()
    const [filteredProducts, setFilterdProducts] = useState([])
    const [pending, setPending] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("https://dummyjson.com/products?skip=0&limit=100")
        .then(res => {
            setProducts(res.data.products) 
            setFilterdProducts(res.data.products)
            setPending(false)
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
    
    const pageChange = () => {
        
    }

    const handle = (selectableRows) => {
        // console.log(selectableRows);
        navigate(`/product/${selectableRows.id}`)
    }
    
  return (
    <div>
        <DataTable 
        title="Product List"
        fixedHeader
        fixedHeaderScrollHeight='450px'
        selectableRows
        onRowClicked={handle}
        selectableRowsHighlight
        highlightOnHover
        onChangeRowsPerPage={pageChange}
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
        progressPending={pending}
        pagination/>
    </div>
  )
}

export default GetData