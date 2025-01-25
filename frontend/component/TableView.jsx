import React, { useEffect, useState } from 'react'
import Heaader from './common/Heaader'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'

const TableView = () => {
    const [data,setdata]=useState([])
    const [searchtext,setsearchtext]=useState('')
    const [filtersearch,setfiltersearch]=useState([])




    const navigate=useNavigate()

    const server=async()=>{
        await axios.get('http://localhost:8000/tabledata')
        .then((res)=>{
            setdata(res.data)
            setfiltersearch(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
    server()
    },[data])



    const columns=[
        {
            name:'ID',
            selector:row=> row.id,
            sortable:true
        },
        {
            name:'Company',
            selector: row=> row.company,
            sortable:true
    
        },
        {
            name:'Date',
            selector:row => new Date(row.date).toLocaleDateString()  ,
            sortable:true
        },
        { 
            name:'Product',
            selector:row => row.product,
            sortable:true
        },
        {
            name:'Type',
            selector:  row=>row.type,
            sortable:true
        },
        {
            name:'Qunatity',
            selector:row=>row.quantity,
            sortable:true
        },
        {
            name:'SolvedQuantity',
            selector: row=>row.solvedquantity,
            sortable:true
        },
        {
            name:'Remarks',
            selector:row=>row.remarks,
            sortable:true
        },
        {
            name:'By',
            selector:row=> row.person,
            sortable:true
        },
        {
            name: 'Actions',
            cell: row => (
                <div>
                    <button
                        className="btn btn-info btn-sm mx-3"
                        onClick={() => handleEdit(row.id)}
                    >
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(row.id)}
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ]

    const handlesearch=(e)=>{
        const value=e.target.value
        setsearchtext(value)
        const filter=data.filter(item=>
            item.company.toLowerCase().includes(value.toLowerCase())||
            item.person.toLowerCase().includes(value.toLowerCase())
        )
        setfiltersearch(filter)
    }

    const handleEdit=(id)=>{
        navigate(`/edit/${id}`)
    }
    // const handleDelete = async (id) => {
    //     // Send a request to delete the row from the database
    //     await axios.delete(`http://localhost:8000/delete/${id}`)
    //         .then((res) => {
    //             console.log("Row deleted:", res.data);
    //             // Refresh the table data after deletion
    //             navigate('/tabledata')
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/delete/${id}`);
            console.log("Row deleted");
            
           
            // Remove the deleted row from local state
            setdata((prevData) => prevData.filter(row => row.id !== id));
            setfiltersearch((prevData) => prevData.filter(row => row.id !== id));
            server()
        } catch (err) {
            console.log(err);
        }
        
    };
    
   
    
  return (
    <>
<Heaader/>


<div className='container mt-5'>
   <h3 className='mb-3'>Service In & Out :</h3> 
 <input type="seacrh"
 placeholder='search'
 value={searchtext}
onChange={handlesearch}
 className='form-control mb-3'/>
    <DataTable 
    columns={columns}
    data={filtersearch}
    pagination
    highlightOnHover
    ></DataTable>
</div>



    </>
  )
}

export default TableView