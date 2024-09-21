import React, {useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios'
import Heaader from './common/Heaader';






const Index = () => {
     const [company,setcompany]=useState('')
     const [date,setdate]=useState('')
     const [product,setproduct]=useState('pcb')
     const [type,settype]=useState('returnable')
     const [quantity,setquantity]=useState('')
     const [Solvedquantity,setsolvedquantity]=useState('0')
     const [remarks,setremarks]=useState('')
     const [person,setperson]=useState('')

     const handlesubmit=(e)=>{
      e.preventDefault()
      axios.post('http://localhost:8000/',{company,date,product,type,quantity,Solvedquantity,remarks,person})
      .then((res)=>{
        console.log(res.data)
        console.log("data is inserted")
        setcompany(''),
        setdate(''),
        setproduct('')
        settype(''),
        setquantity(''),
        setsolvedquantity('0'),
        setremarks(''),
        setperson('')
      })
      .catch((err)=> {
        console.log(err)
    })
     }
     




  return (
    <>
   


<Heaader/>
<div className='container shadow-lg p-4 mb-5 mt-5 bg-body rounded w-75'>
  <h1 className='text-center'>In & Out</h1>
<form method='post'> 

<div className='row'>
  <div className='col'>
  <div className="mb-3">
    <label for="company" className="form-label">Company :</label>
    <input type="text" 
    className="form-control"
     id="exampleInputEmail1"
     value={company}
     onChange={(e)=>setcompany(e.target.value)}
     name='company' 
     required
     />
  </div>
  </div>
  <div className='col'>
  <div className="mb-3">
    <label for="date" className="form-label">Date :</label>
    <input
     type="date" 
     className="form-control" 
    value={date}
    onChange={(e)=>setdate(e.target.value)}
    name='date'
    required
    />
  </div>
  </div>
</div>
  

  

  <div className='row'>
    <div className='col'>
    <div className="mb-3">
    <label for="product" className="form-label">Product :</label>
    <select
    class="form-select" 
    name='product' 
    onChange={(e)=>setproduct(e.target.value)}
    value={product}
    required>
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
    <label for="type" className="form-label">Type :</label>
    <select
     class="form-select" aria-label="Default select example"
    onChange={(e)=>settype(e.target.value)}
    value={type}
    name='type'>
  <option value="returnable">RETURNABLE</option>
  <option value="non-returnable">NON-RETURNABLE</option>
</select>
  </div>

    </div>
  </div>


  <div className="mb-3">
    <label for="quantity" className="form-label">Quantity :</label>
    <input 
    type="int" 
    className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    onChange={(e)=>setquantity(e.target.value)}
    value={quantity}
    name='quantity'
    required
    />
  </div>

  <div className="mb-3" hidden>
    <label for="solvedquantity" className="form-label">Solved_Quantity :</label>
    <input 
    type="number" 
    className="form-control" 
    onChange={(e)=>setsolvedquantity(e.target.value)}
    name='solvedquantity'
    value={Solvedquantity}
    required
    />
  </div>

  <div className="mb-3">
    <label for="remarks" className="form-label">Remarks :</label>
    <textarea class="form-control"  
     style={{ height: "100px" }} 
     cols="50" 
    placeholder="Leave a comment here" id="floatingTextarea2" value={remarks} onChange={(e)=>setremarks(e.target.value)} name='remarks' ></textarea>
  </div>

  <div className="mb-3">
    <label for="person" className="form-label">By :</label>
    <input
     type="text" className="form-control" 
    onChange={(e)=>setperson(e.target.value)}
    value={person}
    name='person'
    required
    />
  </div>

  <button onClick={handlesubmit} className="btn btn-primary">Submit</button>
</form>
</div>
    </>
  )
}

export default Index