import { createContext, useState, useEffect } from "react"
import { databases, client } from "../lib/appwrite"
import { ID, Permission, Query, Role } from "react-native-appwrite"
import { useUser } from "../hooks/useUser"

// need these so it knows which database to search for and use
const DATABASE_ID = "68a62ada0002e0813a9b"
const COLLECTION_ID = "68a62b01002beb2eb8cb"

export const LogsContext = createContext()

// children = whatever content the book provider eventually wraps 
export function LogsProvider({ children }) {
    const [logs, setLogs] = useState([])
    // longs will populate the empty array from the database
    // once fetched 
    const { user } = useUser() // comes from user context -- id of user!!

    // to fetch all the logs input 
    async function fetchLogs() {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                // query data to just get subsection of records (by user)
                [
                    Query.equal('userId', user.$id) // grabs all logs where this is true
                ]
            )

            setLogs(response.documents)
            console.log(response.documents)

        } catch (error) {
            console.error(error.message)
        }
    }

    // to get just one log by id (accept id as arg)
    async function fetchLogsById(id) {
        try {
            const response = await databases.getDocument (
                DATABASE_ID,
                COLLECTION_ID,
                id
            )


         return response
        } catch (error) {
            console.error(error.message)
        }
    }

    // creating a log 
    async function createLog(data) {
        try {
            const newLog = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(), // generates id
                { ...data, userId: user.$id }, // pass in data for the record 
                [
                    Permission.read(Role.user(user.$id)), // Permission = from appWrite 
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id)),
                ]
                // only allows the current logged in user to read this

            )
        } catch (error) {
            console.error(error.message)
        }
    }

    // pass in id so we know which one to delete 
    async function deleteLog(id) {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id

            )
        } catch (error) {
            console.error(error.message)
        }
    }

    // runs as soon as the component its in is redered
    useEffect(() => {
        let unsubscribe
        // real time subscription -- pass it this channel to know what to sub to
        const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`

        if (user) {
            fetchLogs()

            unsubscribe = client.subscribe(channel, (response) => {
                const {payload, events} = response
                // payload = any data associated with the event (a new log or deleted log)
                // events = array of strings that each describe the event that triggered response

                if (events[0].includes('create')) {
                    setLogs((prevLogs) => [...prevLogs, payload])
                }

                if (events[0].includes('delete')) {
                    setLogs((prevLogs) => prevLogs.filter((log) => log.$id !== payload.$id))
                }
                

            })
        }
        else {
            setLogs([])
        }

        // clean up function that runs every time you have to re render
        // like for example when user logs out and user val chnages, 
        // runs right before use effect runs again 
        return () => {
            if (unsubscribe) unsubscribe()
        }

    }, [user])


    // return the template 
    return (
        <LogsContext.Provider
            // provide values from context
            // need log state and all the funcs so we can use them in app
            value={{ logs, fetchLogs, fetchLogsById, createLog, deleteLog }}
        >
            {children}
        </LogsContext.Provider>
    )
}