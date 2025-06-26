import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
export const userDataContext = createContext()
function UserContext({children}) {
     let {serverUrl} = useContext(authDataContext)// take server url 
     let [userData,setUserData] = useState(null)
     
// function to get user
     const getCurrentUser = async () => {

        try {                                                   // route - currentuser
            let result = await axios.get(serverUrl + "/api/user/currentuser",{withCredentials:true})
            setUserData(result.data) // store data in setuserdata
        } catch (error) {
            setUserData(null)
            console.log(error)
            
        }
        
     }
     // page reload call to getcurrentuser function
        useEffect(()=>{
            getCurrentUser()
        },[])

    let value={
        userData,
        setUserData,getCurrentUser
    }
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext
