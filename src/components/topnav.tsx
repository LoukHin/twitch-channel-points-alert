import config from "lib/config"

const TopNav: React.FC = (props) => {
    return (
        <div className='mb-12 w-full fixed'>
            <div className='h-12 bg-twitch-purple'>
                <div className='ml-auto'>
                    <h1 className='text-1'>{config.appName}</h1>
                </div>
            </div>
        </div>
    )
}

export default TopNav
