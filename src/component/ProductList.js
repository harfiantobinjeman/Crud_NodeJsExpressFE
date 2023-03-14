import React from 'react';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

//pagination
import ReactPaginate from "react-paginate";


const ProductList = () => {
    const [products,setProducts] = useState([]);
    const [page,setPage] = useState(0);
    const [limit,setLimit] = useState(5);
    const [pages,setPages] = useState(0);
    const [rows,setRows] = useState(0);
    const [keyword,setKeyword] = useState("");
    const [query,setQuery] = useState("");


    useEffect(()=>{
        getProduct();
    },[page,keyword]);

    const getProduct =async()=>{
        const response = await axios.get(`
        http://localhost:5000/products?search_query=${keyword}&page=${page}&limit=${limit}`);
        setProducts(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
    };

    const deleteProduct = async (id)=>{
        try {
            await axios.delete(`http://localhost:5000/products/${id}`);
            getProduct();
        } catch (error) {
            console.log(error);
        }
    }
//console.log(getProduct);

const changePage =({selected})=>{
    setPage(selected)
};

const searchData = (e)=>{
    e.preventDefault();
    setPage(0);
    setKeyword(query)
}
  return (
    <div className="container mt-5">
        <div className='columns'>
            <div className="column is-centered">
                <Link to={`add`} className="button is-succses mb-5">Add Product</Link>
                <form onSubmit={searchData}>
                    <div className='field has-addons'>
                        <div className="control is-expanded">
                            <input type="text" 
                            className="input" 
                            value={query}
                            onChange={(e)=>setQuery(e.target.value)}
                            placeholder='Cari Product disini..' />
                        </div>
                        <div className="control">
                            <button type='submit' className='button is-info'>Search</button>
                        </div>
                    </div>
                </form>
                <table className='table is-striped is-bordered is-fullwidth mt-2'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Categori</th>
                            <th>Descripsi</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product)=>(
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.categori}</td>
                            <td>{product.descrip}</td>
                            <td>
                                <Link to={`edit/${product.id}`} className='button is-small is-info'>Edit</Link>
                                <button onClick={()=>deleteProduct(product.id)} className='button is-small is-danger'>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <p>Total Rows : {rows} page : {rows ?  page + 1 : 0} of {pages}</p>
                <nav
                className='pagination is-centered'
                key={rows}
                role='navigation'
                aria-label='pagination'
                >
                    <ReactPaginate 
                    previousLabel={'< Prev'}
                    nextLabel={'Next >'}
                    pageCount={pages}
                    onPageChange={changePage}
                    containerClassName={"pagination-list"}
                    pageLinkClassName={"pagination-link"}
                    previousLinkClassName={"pagination-previous"}
                    nextLinkClassName={"pagination-next"}
                    activeLinkClassName={"pagination-link is-current"}
                    disabledLinkClassName={"pagination-link is-disabled"}
                    />
                </nav>
            </div>
        </div>
    </div>
  )
}

export default ProductList