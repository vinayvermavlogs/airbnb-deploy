import React, { createContext, useState } from 'react'
export const authDataContext = createContext()
// frontend take data from backend
function AuthContext({children}) {
    const serverUrl = "https://airbnbdeploy-backend.onrender.com"

    let [loading,setLoading]=useState(false)

    let value={
        serverUrl,
        loading,setLoading
    }
  return (
    <div>
     <authDataContext.Provider value={value}>
        {children}
     </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
