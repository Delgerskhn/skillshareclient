import * as React from 'react'
import { getAccountInfo } from '../api/account'
import { fetchTags, getTags } from '../api/tags'


const AppContext = React.createContext()
function useAppContext() {
    const context = React.useContext(AppContext)
    if (!context) {
        throw new Error(`useAppContext must be used within a AppProvider`)
    }
    return context
}
function AppProvider(props) {
    const [isLoading, setIsLoading] = React.useState(false)
    const [successMsg, setSuccessMsg] = React.useState('')
    const [errorMsg, setErrorMsg] = React.useState('')
    const [popularTags, setTags] = React.useState([])

    const hideAlerts = () => {
        setSuccessMsg('')
        setErrorMsg('')
    }

    React.useEffect(() => {
        (async function () {
            await fetchTags()
            setTags(getTags)
        })()
    }, [])

    React.useEffect(() => {
        setTimeout(hideAlerts, 2000)
    }, [successMsg, errorMsg])

    const value = {
        isLoading,
        setIsLoading,
        successMsg,
        errorMsg,
        setSuccessMsg,
        setErrorMsg,
        popularTags
    };
    return <AppContext.Provider value={value} {...props} />
}
export { AppProvider, useAppContext }