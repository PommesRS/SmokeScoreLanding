import styles from "./style";
import { Navbar, Landing, Contact, Login, Register, Footer, AdminMain, Users, Inbox, EmailReader, ProfileMain, Edit, Upload, TestSection } from './components'
import ScrollToHashElement from "./components/ScrollToHashElement";
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./auth";
import {analytics} from './firebase'
import React from 'react'
import { logEvent } from "firebase/analytics";

const App = () => {
  const {currentUser}  = useContext(AuthContext);
  console.log(analytics)
  logEvent(analytics, 'analytics_initiallized')

  return(

    <div className="bg-primary w-full overflow-hidden">
      <ScrollToHashElement/>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
            <Navbar />
        </div>
      </div>

      <Routes>
        {/* Free accessable routes */}
        <Route path='/' Component={Landing} />
        <Route path='/contact' Component={Contact}/>
        <Route path='/login' Component={Login}/>
        <Route path='/register' Component={Register}/>

        {/* Protected Routes */}

        <Route element={<ProtectedRoute currentUserRole={currentUser?.userRole} allowedRoles={[187]}/>}>
          <Route path='admin' Component={AdminMain}>
            <Route path='users' Component={Users}/>
            <Route path='inbox' Component={Inbox}>
              <Route path='read' Component={EmailReader}/>
            </Route>
            <Route path='edit' Component={Edit}/>
            <Route path='test' Component={TestSection}/>
          </Route>
        </Route>

        {/* User Profile */}
        <Route element={<ProtectedRoute currentUserRole={currentUser?.userRole} allowedRoles={[187, 420]}/>}>
          <Route path='profile' Component={ProfileMain}/>
        </Route>

        {/* Producer Profile */}
        <Route element={<ProtectedRoute currentUserRole={currentUser?.userRole} allowedRoles={[187, 69]}/>}>
          <Route path='upload' Component={Upload}/>
        </Route>
        
        {/* Fallback page -> Err 404 */}
        <Route path="*" element={<div className={`${styles.flexCenter} ${styles.heading2} flex-col relative`}>404 <p> Site not found.</p></div>}/>
      </Routes>

      <footer className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
              <Footer />
            </div>
      </footer>

    </div>

  );
}


export default App