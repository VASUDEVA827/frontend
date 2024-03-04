import logo from './logo.svg';

import { Route, Routes } from 'react-router-dom';
import Userlogin from './Componets/Userlogin';
import Home from './Componets/Home';
import Voter from './Componets/Voter';
import Voterservey from './Componets/Voterservey';
import Servey from './Componets/Servey';
import Volunteer from './Componets/Volunteer';


import Voterreport from './Componets/Voterreport';
import Report from './Componets/Report';

import LogoutButton from './Componets/Logout';
import Sachivalayam from './Componets/Sachivalayam';
import Mandals from './Componets/Mandals';
import Politicalparty from './Componets/Politicalparty';
import Users from './Componets/Users';
import Revanth from './Componets/Revanth';
import SachivalayamNew from './Componets/SachivalayamNew';
import Revanth2 from './Componets/Revanth2';
import Sachi from './Componets/sachi';
import Mandalsnew from './Componets/Mandalnew';
import GenderPieChart from './Componets/New';
import FileUpload from './Componets/Data';
import Demo from './Componets/Demo';
import Admin from './Componets/Admin';
import Dashboard from './Componets/dashboard';






//import Home from './Componets/Home';
//import Slide from './Componets/Slide';

function App() {
  return (
    <div className="App">
      
     
      <Routes>
       
         <Route path='/' element={<Home/>}></Route>
         <Route path='/nav/voterlist' element={<Voter />}></Route>
         <Route path='/nav/voterservey' element={<Voterservey />}></Route>
         <Route path='/nav/servey' element={<Servey/>}></Route>
         <Route path='/nav/volunteer' element={<Volunteer/>}></Route>
         <Route path='/nav/voterreport' element={<Voterreport />}></Route>
         <Route path='/nav/report' element={<Report />}></Route>
         <Route path='/nav/data' element={<FileUpload />}></Route>
         <Route path='/nav/new' element={<GenderPieChart/>}></Route>
         <Route path='/nav/logout' element={<LogoutButton/>}></Route>
         <Route path='nav/Sachivalayam' element={<Sachivalayam />}></Route>
         <Route path='/nav/mandals' element={<Mandals />}></Route>
         <Route path='/nav/Politicalparty' element={<Politicalparty />}></Route>
         <Route path='/nav/Users' element={<Users />}></Route>
         <Route path='/nav/SachivalayamNew' element={<SachivalayamNew />}></Route>
         <Route path='/nav/revanth' element={<Revanth/>}></Route>
         <Route path='/nav/revanthupdate' element={<Revanth2/>}></Route>
         <Route path='/nav/sachi' element={<Sachi/>}></Route>
         <Route path='/nav/dashboard' element={<Dashboard/>}></Route>

         <Route path='/nav/mandalnew' element={<Mandalsnew />}></Route>
         <Route path='/nav/demo' element={<Demo/>}></Route>
         <Route path='/nav/admin' element={<Admin/>}></Route>
     
.      </Routes>  
    
    </div>
  );
}

export default App;
