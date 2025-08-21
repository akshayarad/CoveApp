import { createContext, useState } from "react"
import { databases } from "../lib/appwrite"
import { ID, Permission, Role } from "react-native-appwrite"
import { useUser } from "../hooks/useUser"


const DATABASE_ID = "68a62ada0002e0813a9b"
const COLLECTION_ID = "68a62b01002beb2eb8cb"

export const LogsContext = createContext()

export function LogsProvider({children}) {
    const [logs, setLogs] = useState ([])
    const {user} = useUser() 

    async function fetchLogs() {
        try{

        } catch (error) {
            console.error(error.message)
        }
    }

    async function fetchLogsById(id) {
        try{

        } catch (error) {
            console.error(error.message)
        }
    }

    async function createLog(data) {
        try{
            const newLog = await databases.createDocument(
                DATABASE_ID, 
                COLLECTION_ID,
                ID.unique(),
                {...data, userId: user.$id},
                [
                    Permission.read(Role.user(user.$id)),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id)),
                ]
                // only allows the current logged in user to read this

            )
        } catch (error) {
            console.error(error.message)
        }
    }

    async function deleteLog(id) {
        try{

        } catch (error) {
            console.error(error.message)
        }
    }


    return (
        <LogsContext.Provider
        value={{logs, fetchLogs, fetchLogsById, createLog, deleteLog}}
        >
        {children}
        </LogsContext.Provider>
    )
}