function LabelField ({htmlFor, id, text}) {
    return (
        <label htmlFor={htmlFor} id={id} className="block text-sm font-medium text-zinc-400 mb-2 mt-2">{text}</label>
    )
}

export default LabelField;