interface Props {
    onClick?: React.MouseEventHandler
    className?: string
}

const Button: React.FC<Props> = (props) => {
    const {
        onClick,
        className,
        children
    } = props

    return (
        <button onClick={onClick} className={`mx-2 px-4 md:px-10 py-2 rounded ${className}`}>
            {children}
        </button>
    )
}

export default Button
