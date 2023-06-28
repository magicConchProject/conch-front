"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
    labelName: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    label: string;
};

export default function SignInput({ labelName, type = "text", required = true, register, label }: Props) {
    return (
        <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-500">{labelName}</label>
            <input
                className="rounded-md p-1 px-2 bg-gray-100 border-2 border-gray-200 outline-0"
                type={type}
                required={required}
                {...register(label, { required })}
            />
        </div>
    );
}
