import { UseFormRegister } from 'react-hook-form'
import { Label, TextInput } from "flowbite-react";

type FormTextInputProps = {
    label?: string
    name: string
    type?: 'text' | 'email' | 'password'
    placeholder?: string
    register: UseFormRegister<any>
    error: string | undefined
    required?: boolean
}

export const FormTextInput = (props: FormTextInputProps) => {
    const { label, name, type, placeholder, register, error, required } = props
    return (
        <div className="w-full">
            <div className="mb-2 block">
                <Label htmlFor={name} value={label} />
            </div>
            <TextInput
                id={name}
                type={type ? type : "text"}
                placeholder={placeholder}
                {...register(name)}
                helperText={error ? error : ""}
                color={error ? "failure" : ""}
            />
        </div>
    )
}
