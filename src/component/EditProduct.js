import React,{useState,useEffect} from 'react'

import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

const EditProduct = () => {
    const [name,setName] = useState("");
    const [categori,setCategori] = useState("Makanan");
    const [descrip,setDescrip] = useState("");

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        getProductById();
    },[])
    const updateUser = async (e)=>{
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/products/${id}`,{
                name,categori,descrip
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const getProductById = async()=>{
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setName(response.data.name);
        setCategori(response.data.categori);
        setDescrip(response.data.descrip);
    }
  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={updateUser}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                        type="text"
                        className="input"
                        placeholder='Name' 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Categori</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select 
                            value={categori}
                            onChange={(e)=>setCategori(e.target.value)}>
                                <option value="Makanan">Makanan</option>
                                <option value="Minuman">Minuman</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Descrpisi</label>
                    <div className="control">
                        <textarea
                        type="text"
                        className="input"
                        placeholder='Descripsi'
                        value={descrip}
                        onChange={(e)=>setDescrip(e.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <button type='submit' className='button is succses'>Update</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditProduct