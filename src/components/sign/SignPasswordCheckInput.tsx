"use client";

import CheckedIcon from "@/components/icons/CheckedIcon";
import ClosedIcon from "@/components/icons/ClosedIcon";
import { FieldValues, UseFormRegister } from "react-hook-form";
type Props = {
    labelName: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    label: string;
    compare: boolean;
};
export default function SignPasswordCheckInput({ labelName, type = "text", required = true, register, label, compare = false }: Props) {
    return (
        <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-500">{labelName}</label>
            <div className="flex items-center rounded-md p-1 px-2 bg-gray-100 border-2 ">
                <input className="flex-1 bg-gray-100 outline-0" type={type} required={required} {...register(label, { required })} />
                {compare ? <CheckedIcon /> : <ClosedIcon />}
            </div>
        </div>
    );
}
