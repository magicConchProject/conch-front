"use client";

type Props = {
    name: string;
    onClick?: () => void
};
export default function SubmitButton({ name, onClick }: Props) {
    return (
        <button onClick={onClick} type="submit" className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-md font-bold text-yellow-950 text-sm">
            {name}
        </button>
    );
}
