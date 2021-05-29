import { useRouter } from 'next/router';
import React from 'react'
import { useAuth } from '../context/auth';

const withAuth = (WrappedComponent) => {
    const Wrapper = ({ children, ...props }) => {
        const router = useRouter();
        const { user, loading, signOut } = useAuth();

        if (!loading) {
            if (user == null) {
                signOut()
                router.push('/auth/login')
            }
        } else {
            return <div></div>
        }
        return (<WrappedComponent {...props} >{children}</WrappedComponent>)
    }

    return Wrapper
}

export { withAuth }