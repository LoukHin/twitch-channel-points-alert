import { NextPage, GetServerSidePropsWithUser, User } from 'next'
import { useRouter } from 'next/router'
import Head from 'components/head'
import Button from 'components/button'

type Props = {
    data: {
        user?: User
    }
}

const Index: NextPage<Props> = (props) => {
    const router = useRouter()

    const {
        data: { user }
    } = props

    return (
        <>
            <Head title='test'></Head>
            {user ?
                <>
                    {user.display_name}
                    <img src={user.profile_image_url} />
                    <Button
                        onClick={() => {router.push('/logout')}}
                        className='self-center text-white text-lg duration-200 bg-twitch-purple hover:bg-twitch-purple-dark'
                    >
                        Log Out
                    </Button>
                </>
            :
                <Button
                    onClick={() => {router.push('/login')}}
                    className='self-center text-white text-lg duration-200 bg-twitch-purple hover:bg-twitch-purple-dark'
                >
                    Log in
                </Button>
            }
        </>
    )
}

export const getServerSideProps: GetServerSidePropsWithUser = async (context) => {
    const { user } = context.req

    return {
        props: {
            data: {
                user: user || null
            }
        }
    }
}

export default Index
