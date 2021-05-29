import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { getAccountInfo } from '../api/account';
import { getUser, signIn as sendSignInRequest } from '../api/auth';
import { RemoveUser } from '../helpers/user-store';
import { useAppContext } from './app';

function AuthProvider(props) {
    const [user, setUser] = useState(null);
    const { setIsLoading } = useAppContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function () {
            setIsLoading(true);
            const result = await getAccountInfo();
            if (result.Ok) {
                setUser(result.Data);
            } else setUser(null);
            setLoading(false);
            setIsLoading(false);
        })();
    }, []);

    const signIn = async (email, password) => {
        const result = await sendSignInRequest(email, password);
        if (result.isOk) {
            setUser(result.data);
        }
        return result;
    }

    const signOut = () => {
        setUser(null);
        RemoveUser()
    }


    return (
        <AuthContext.Provider value={{ user, signIn, signOut, loading }} {...props} />
    );
}

const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }
