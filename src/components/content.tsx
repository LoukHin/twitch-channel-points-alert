const Content: React.FC = (props) => {
    return (
        <main className='main flex flex-col flex-grow'>
            <div className='mx-5 mt-5'>{props.children}</div>
        </main>
    )
}

export default Content
