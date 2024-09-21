import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from '../component/Index';
import TableView from '../component/TableView';
import EditTable from '../component/EditTable';

function App() {
  

  return (
    <>
     <BrowserRouter>
    <Routes>
      <Route path='/' element={<Index/>}/>
      <Route path='/tabledata' element={<TableView/>}/>
       <Route path='/edit/:id' element={<EditTable/>}/> 
    </Routes>
    </BrowserRouter> 
     
    
    </>
  )
}

export default App
