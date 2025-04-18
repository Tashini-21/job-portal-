import React, { useContext } from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import Appbar from './components/Appbar/Appbar'
import RecruiterLogin from './components/Recruiter Login'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplication from './pages/ViewApplication'
import 'quill/dist/quill.snow.css'

const App = () => {

  const {showRecruiterLogin} = useContext(AppContext)

  return(
    <div>

      { showRecruiterLogin && <RecruiterLogin/>}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} /> 
        <Route path='/applications' element={<Applications  />} />
        <Route path='/dashboard' element={<Dashboard/>}>
           <Route path='add-job' element={< AddJob/>}/>
           <Route path='managejobs' element={< ManageJobs/>}/>
           <Route path='view-applications' element={< ViewApplication/>}/>

        </Route>
        
      </Routes>
     
      
    </div>
  )
}

export default App