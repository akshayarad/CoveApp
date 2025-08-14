import { createContext } from "react";
///// first understand context and hooks before doing this part
export const UserContext = createContext()

// provider function: allows to create, track, and update states for context(user states)
// allows us to pass those values into context provider which wraps app component tree

export function UserProvider({children}) {
    const [user, setUser] = useState()

    // login function
    async function login(email, password) {

    }

    // register function
    async function register(name, email, password) {

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