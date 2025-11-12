import { useContext } from "react";
import { LogsContext } from "../contexts/LogsContext";

export function useLogs() {
    // grabs all values that logs context provider gives
    const context = useContext(LogsContext)

    if(!context) {
        throw new Error("useUser must be used within a LogsProvider")
    }
    return context

}