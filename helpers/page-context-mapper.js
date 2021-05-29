import { BlogProvider } from "../context/blog"
import { EditorProvider } from "../context/editor"
import AuthLayout from "../shared/auth-layout"
import Layout from "../shared/layout"

export const pageContextMapper = (pathname, Component) => {
    return function ({ pageProps }) {
        if (pathname.startsWith("/auth/"))
            return <AuthLayout>
                <Component {...pageProps} />
            </AuthLayout>
        if (pathname.startsWith("/editor"))
            return <Layout>
                <EditorProvider>
                    <Component {...pageProps} />
                </EditorProvider>
            </Layout>

        if (pathname.startsWith("/blog"))
            return <Layout>
                <BlogProvider>
                    <Component {...pageProps} />
                </BlogProvider>
            </Layout>

        return (<Layout>
            <Component {...pageProps} />
        </Layout>)
    }

}