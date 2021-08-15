import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import Layout from 'components/layout'

import 'tailwindcss/tailwind.css'

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
    return (
        <Provider session={pageProps.session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}

export default App
