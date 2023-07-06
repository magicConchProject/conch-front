"use client";

import CheckedIcon from "@/components/icons/CheckedIcon";
import ClosedIcon from "@/components/icons/ClosedIcon";
import { Input } from "@chakra-ui/react";
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
            <div className="flex items-center rounded-md p-1 px-2 bg-gray-100 border-2 ">
                <Input className="flex-1 " type={type} required={required} {...register(label, { required })} />
                {compare ? <CheckedIcon /> : <ClosedIcon />}
            </div>
        </div>
    );
}
