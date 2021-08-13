import { useEffect } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import type { CommonProviderOptions } from 'next-auth/providers'
import { getProviders, signIn, getCsrfToken, getSession } from 'next-auth/client'

import { faTwitch } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Head from 'components/head'
import Button from 'components/button'
import config from 'lib/config'

const SignIn: NextPage<{ providers: Array<CommonProviderOptions> }> = ({ providers }) => {
    let redirectUrl = config.appURL

    useEffect(() => {
        const url = new URL(location.href)
        redirectUrl = url.searchParams.get('callbackUrl')!
    })

    return (
        <div className='h-screen flex justify-center bg-yellow-400'>
            <Head title='Sign in'></Head>
            <div className='h-80 w-full max-w-md mt-40 p-10 text-center rounded bg-white shadow-md'>
                <h1 className='text-4xl'>{config.appName}</h1>
                <div className='w-full h-full flex flex-col self-center justify-center'>
                    {Object.values(providers).map((provider) => (
                        <Button
                            key={provider.name}
                            onClick={() =>
                                signIn(provider.id, {
                                    callbackUrl: redirectUrl
                                })
                            }
                            className='w-full self-center text-white text-lg duration-200 bg-twitch-purple hover:bg-twitch-purple-dark'
                        >
                            <FontAwesomeIcon icon={faTwitch} className='mr-2' />
                            Sign in with {provider.name}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SignIn

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context
    const session = await getSession({ req })
    const providers = await getProviders()
    const csrfToken = await getCsrfToken({ req })

    if (session && session.accessToken) {
        return {
            props: {},
            redirect: {
                statusCode: 302,
                destination: '/'
            }
        }
    }

    return {
        props: {
            providers,
            csrfToken
        }
    }
}
