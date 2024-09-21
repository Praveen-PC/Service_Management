import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import Heaader from './common/Heaader'
import { useNavigate, useParams } from 'react-router-dom';
import TableView from './TableView';

const EditTable = () => {

    const {id}=useParams()
    const navigate = useNavigate();

    const [company, setcompany] = useState('');
    const [date, setdate] = useState('');
    const [product, setproduct] = useState('pcb');
    const [type, settype] = useState('returnable');
    const [quantity, setquantity] = useState('');
    const [solvedquantity, setsolvedquantity] = useState('');
    const [remarks, setremarks] = useState('');
    const [person, setperson] = useState('');

    useEffect(() => {
        // Fetch the data for the specific row to edit
        axios.get(`http://localhost:8000/edit/${id}`)
            .then((res) => {
                const data = res.data;
                setcompany(data.company);
                setdate(data.date);
                setproduct(data.product);
                settype(data.type);
                setquantity(data.quantity);
                setsolvedquantity(data.solvedquantity);
                setremarks(data.remarks);
                setperson(data.person);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        // Send updated data to the server
        axios.put(`http://localhost:8000/update/${id}`, {
            company, date, product, type, quantity, solvedquantity, remarks, person
        })
            .then((res) => {
                console.log("Data updated successfully:", res.data);
                // <button onClick={() => navigate('/tabledata')}>Go to Table</button>
                console.log('navigating to baack')
                navigate('/tabledata'); // Redirect to the table view after update
            })
            .catch((err) => {
                console.log(err);
            });
            navigate('/tabledata')
    };


    return (
        <>
            <Heaader />
            <div className='container shadow-lg p-4 mb-5 mt-5 bg-body rounded w-75'>
                <h1 className='text-center'>Edit In & Out</h1>
                <form onSubmit={handleUpdate}>

                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label htmlFor="company" className="form-label">Company :</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={company}
                                    onChange={(e) => setcompany(e.target.value)}
                                    name='company'
                                    required
                                />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Date :</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={date}
                                    onChange={(e) => setdate(e.target.value)}
                                    name='date'
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <div className="mb-3">
                                <label htmlFor="product" className="form-label">Product :</label>
                                <select
                                    className="form-select"
                                    name='product'
                                    onChange={(e) => setproduct(e.target.value)}
                                    value={product}
                                    required
                                >
                                    <option value="pcb">PCB</option>
                                    <option value="rmu">RMU</option>
                                    <option value="controller">CONTROLLER</option>
                                    <option value="keypad">KEYPAD</option>
                                    <option value="accessories">ACCESSORIES</option>
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">Type :</label>
                                <select
                                    className="form-select"
                                    onChange={(e) => settype(e.target.value)}
                                    value={type}
                                    name='type'
                                >
                                    <option value="returnable">RETURNABLE</option>
                                    <option value="non-returnable">NON-RETURNABLE</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                        <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity :</label>
                        <input
                            type="number"
                            className="form-control"
                            onChange={(e) => setquantity(e.target.value)}
                            value={quantity}
                            name='quantity'
                            required
                        />
                    </div>
                        </div>

                    <div className='col'>
                    {/* <div className="mb-3">
                        <label htmlFor="solvedquantity" className="form-label">SolvedQuantity :</label>
                        <input
                            type="number"
                            className="form-control"
                            onChange={(e) => setsolvedquantity(e.target.value)}
                            value={Solvedquantity}
                            name='solvedquantity'
                            required
                        />
                    </div> */}
                      <div className="mb-3" >
                        <label htmlFor="solvedquantity" className="form-label">Solved Quantity :</label>
                        <input
                            type="number"
                            className="form-control"
                            onChange={(e) => setsolvedquantity(e.target.value)}
                            name='solvedquantity'
                            value={solvedquantity}
                            required
                        />
                    </div>

                    </div>
                    </div>



                  

                    <div className="mb-3">
                        <label htmlFor="remarks" className="form-label">Remarks :</label>
                        <textarea
                            className="form-control"
                            style={{ height: "100px" }}
                            cols="50"
                            placeholder="Leave a comment here"
                            value={remarks}
                            onChange={(e) => setremarks(e.target.value)}
                            name='remarks'
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="person" className="form-label">By :</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setperson(e.target.value)}
                            value={person}
                            name='person'
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
    </>
  )
}

export default EditTable