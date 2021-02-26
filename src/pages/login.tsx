import { NextPage, GetServerSidePropsWithUser } from 'next'
import { useRouter } from 'next/router'
import Head from 'components/head'
import Button from 'components/button'

import { faTwitch } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LogIn: NextPage = (props) => {
    const router = useRouter()

    const LoginHandler: React.MouseEventHandler = () => {
        router.replace('/auth/twitch')
    }

    return (
        <div className='h-screen flex justify-center bg-yellow-400'>
            <Head title='Log in'></Head>
            <div className='h-80 w-full max-w-md mt-40 p-10 text-center rounded bg-white shadow-md'>
                <h1 className='text-4xl'>LoukHin's Twitch tools</h1>
                <div className='w-full h-full flex flex-col self-center justify-center'>
                    <Button
                        onClick={LoginHandler}
                        className='w-full self-center text-white text-lg duration-200 bg-twitch-purple hover:bg-twitch-purple-dark'
                    >
                        <FontAwesomeIcon icon={faTwitch} className='mr-2' />
                        Log in with Twitch
                    </Button>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSidePropsWithUser = async (context) => {
    const { user } = context.req

    if (user) {
        return {
            props: {},
            redirect: {
                statusCode: 301,
                destination: '/'
            }
        }
    }

    return {
        props: {}
    }
}

export default LogIn
