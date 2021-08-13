import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'components/head'
import Button from 'components/button'
import TopNav from 'components/topnav'
import { signOut, useSession } from 'next-auth/client'
import { useEffect } from 'react'

const Index: NextPage = (props) => {
    const [session, loading] = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !session) router.push('/auth/signin')
    }, [session, loading])

    return (
        <>
            <Head title='test'></Head>
            <TopNav></TopNav>
            {session?.user?.image ? <img src={session.user.image} /> : ''}
            Signed in as {JSON.stringify(session?.user?.name)} <br />
            <Button
                onClick={() => signOut()}
                className='self-center text-white text-lg duration-200 bg-twitch-purple hover:bg-twitch-purple-dark'
            >
                Sign out
            </Button>

            <div className="h-80"></div>
            <div className="h-80"></div>
            <div className="h-80"></div>
            <div className="h-80"></div>
            <div className="h-80"></div>
        </>
    )
}

export default Index
