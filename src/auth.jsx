import React, { useEffect, useState} from 'react'
import { auth, db } from './firebase'
import { doc, getDoc } from "firebase/firestore";
import styles from "./style";

export const AuthContext = React.createContext('arsch');

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserRole, setCurrentUserRole] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(async user => {
          if (user) {
            setCurrentUser(user);
            setIsFetching(true);

            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const dbUserData = {
                    displayName: docSnap.data().userName,
                    userRole: docSnap.data().userRole
                }
                user = {...user, ...dbUserData}
                setCurrentUser(user);
                setIsFetching(false);
            }else{
                console.error("doc dosen't exist")
            }

            return
          }
    
          setCurrentUser(null);
          setCurrentUserRole(null);
          setIsFetching(false);
        });
    
        return () => unsubscribe();
      }, []);

      if (isFetching) {
        return <h2 className='flex justify-center items-center text-white h-screen text font-poppins font-semibold xs:text-[48px] text-[40px] xs:leading-[76.8px] leading-[66.8px]'>Loading...</h2>;
      }

    return (
        <AuthContext.Provider value={{currentUser, currentUserRole}}>
            {children}
        </AuthContext.Provider>
        
    )
}

