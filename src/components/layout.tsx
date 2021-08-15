import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/client'

import { HomeIcon, LogoutIcon, BeakerIcon, CurrencyDollarIcon } from '@heroicons/react/outline'

import Sidebar from 'components/sidebar'
import Navbar from 'components/navbar'
import Dropdown from 'components/dropdown'
import Content from 'components/content'

const navMenuItems = [
    {
        name: 'Sign out',
        icon: <LogoutIcon className='h-5 w-5' />,
        onClick: signOut
    }
]

const sidebarMenuItems = [
    {
        name: 'Home',
        icon: <HomeIcon className='h-5 w-5' />,
        href: '/'
    },
    {
        name: 'Experimental Features',
        icon: <BeakerIcon className='h-5 w-5' />,
        expandable: true as const,
        items: [
            {
                name: 'Channel Points',
                icon: <CurrencyDollarIcon className='h-5 w-5' />,
                href: '/channel-points'
            }
        ]
    }
]

const Layout: React.FC = (props) => {
    const [session, loading] = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !session) router.push('/auth/signin')
    }, [session, loading])

    if (router.pathname === '/auth/signin') return <>{props.children}</>

    return (
        <>
            <Navbar>
                <Dropdown
                    buttonChildren={
                        session?.user?.image ? (
                            <>
                                <img className='w-9 h-9 rounded-full mr-2' src={session.user.image} />
                                {session.user.name}
                            </>
                        ) : undefined
                    }
                    menuItems={navMenuItems}
                />
            </Navbar>
            <div className='flex flex-row min-h-screen-nav'>
                <Sidebar menuItems={sidebarMenuItems} />
                <Content>{props.children}</Content>
            </div>
        </>
    )
}

export default Layout
