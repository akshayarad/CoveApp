import { createContext, useEffect, useState } from 'react'
import { account } from "../lib/appwrite"
import { ID } from "react-native-appwrite"


export const UserContext = createContext()


// provider: allows to create, track, and update states for context(user states) -- updated using functions
// allows us to pass those values into context provider which wraps app component tree
// children prop = user
// functions mutate the state
// asynch for working w data?
export function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    // user will be null till login
    const [authChecked, setAuthChecked] = useState(false)

    // login function
    async function login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password) 
      const response = await account.get()
      // grabs session object with all the user details
      setUser(response)
    } catch (error) {
      throw Error(error.message)
              
          }
    }

    // register function
    async function register(name, email, password) {
    try {
      await account.create(ID.unique(), email, password, name)
      await login (email,password) 
    } catch (error) {
        throw Error(error.message)
        
    }
    }

    // logout function
    async function logout() {
      await account.deleteSession("current")
      setUser(null)
    }

    async function getInitialUserValue() {
      try{
        const response = await account.get()
        setUser(response)

      } catch (error) {
        setUser(null)
      } finally {
        setAuthChecked(true)
      }

    }
    // will only run once when the components are first rendered
    useEffect(() => {
      getInitialUserValue()

    }, [])

    return (
        <UserContext.Provider value={{user, login, register, logout, authChecked}}>
            {children}
        </UserContext.Provider>
    )

}