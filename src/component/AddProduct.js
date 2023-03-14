import React,{useState} from 'react'

import axios from 'axios';

import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
    const [name,setName] = useState("");
    const [categori,setCategori] = useState("Makanan");
    const [descrip,setDescrip] = useState("");

    const navigate = useNavigate();

    const saveUser = async (e)=>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/products',{
                name,categori,descrip
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={saveUser}>
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
                    <button type='submit' className='button is succses'>Simpan</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddProduct