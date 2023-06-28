type Props = {
    buttonName: string;
    onClick?: () => void;
};

export default function SignButton({ buttonName, onClick }: Props) {
    return <button onClick={onClick} className="bg-yellow-400 hover:bg-yellow-500 p-3 rounded-md font-bold text-yellow-950 mt-2" type="submit">{buttonName}</button>;
}
