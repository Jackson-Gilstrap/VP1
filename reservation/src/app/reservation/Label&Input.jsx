
const InputBuilder = ({htmlFor, text, type, id, name}) => {
    return (
        <div>
            <label htmlFor={htmlFor}>{text}</label>
            <input type={type} id={id} name={name} />
        </div>
    )
}

export default InputBuilder;
