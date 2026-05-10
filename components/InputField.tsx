type Props = {
    label: string;
    type: string;
    placeholder: string;
};

const InputField = ({ label, type, placeholder }: Props) => {
    return (
        <div className="inputGroup">
        <label>{label}</label>

        <input
            type={type}
            placeholder={placeholder}
        />
        </div>
    );
};

export default InputField;