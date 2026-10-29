import { Routes, Route } from 'react-router-dom';
 import AppShell from './components/layout/AppShell';
 import Dashboard from './pages/Dashboard';
 import Inventory from './pages/Inventory';
 import AddItem from './pages/AddItem';
 import ItemDetail from './pages/ItemDetail';
 import Statistics from './pages/Statistics';
 import { ToastContainer, Zoom } from 'react-toastify';

 function App() {
   return (

       <>
       <Routes>
         <Route element={<AppShell />}>
           <Route path="/" element={<Dashboard />} />
           <Route path="/inventory" element={<Inventory />} />
           <Route path="/add" element={<AddItem />} />
           <Route path="/item/:id" element={<ItemDetail />} />
           <Route path="/statistics" element={<Statistics />} />
         </Route>
       </Routes>
       <ToastContainer
 position="bottom-right"
 autoClose={5000}
 hideProgressBar={false}
 newestOnTop={false}
 closeOnClick={false}
 rtl={false}
 pauseOnFocusLoss
 draggable
 pauseOnHover
 theme="light"
 transition={Zoom}
 />
       </>
   );
 }

 export default App;



