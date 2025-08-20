import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function useUser() {
    // grabs all values that user context provider gives(user, login, register,logout)
    const context = useContext(UserContext)

    if(!context) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context

}