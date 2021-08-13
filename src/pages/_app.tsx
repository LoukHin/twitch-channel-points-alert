import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false

import 'tailwindcss/tailwind.css'

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
    return (
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default App
