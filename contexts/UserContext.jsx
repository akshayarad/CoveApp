import { createContext, useState } from 'react'
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

    // login function
    async function login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password) 
      const response = await account.get()
      // grabs session object with all the user details
      setUser(response)
    } catch (error) {
      console.log(error.message)
              
          }
    }

    // register function
    async function register(name, email, password) {
    try {
      await account.create(ID.unique(), name, email, password)
      await login (email,password) 
    } catch (error) {
        console.log(error.message)
        
    }
    }

    // logout function
    async function logout() {

    }

    return (
        <UserContext.Provider value={{user, login, register, logout}}>
            {children}
        </UserContext.Provider>
    )

}