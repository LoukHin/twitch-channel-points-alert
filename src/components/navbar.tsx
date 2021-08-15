import config from 'lib/config'

const Navbar: React.FC<{ className?: string }> = (props) => {
    return (
        <div className={`mb-14 z-50 ${props.className}`}>
            <div className='w-full top-0 fixed shadow'>
                <div className='h-14 bg-yellow-400 flex flex-row justify-between mx-auto px-4 sm:px-6'>
                    <div className=''>
                        <h1 className='text-4xl'>{config.appName}</h1>
                    </div>
                    <div className='flex justify-end items-center'>{props.children}</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
