import { useContext } from "react";
import { LogsContext } from "../contexts/LogsContext";

export function useLogs() {
    // grabs all values that user context provider gives(user, login, register,logout)
    const context = useContext(LogsContext)

    if(!context) {
        throw new Error("useUser must be used within a LogsProvider")
    }
    return context

}