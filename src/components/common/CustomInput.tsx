"use client";

import { useEffect } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

type NewType = {
    labelName?: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    label: string;
    value?: string;
    setValue?: any ;
};

type Props = NewType;
export default function CustomInput({ labelName, type = "text", required = true, register, label,value, setValue }: Props) {

    useEffect(() => {setValue && setValue(label, value)}, [])

    return (
        <div className="flex flex-col">
            {labelName && <label className="text-sm mb-1 text-gray-500">{labelName}</label>}
            <input
                className="rounded-md p-1 px-2 bg-gray-100  outline-0"
                type={type}
                required={required}
                {...register(label, { required })}
                
            />
        </div>
    );
}
