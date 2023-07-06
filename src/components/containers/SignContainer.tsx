import Link from "next/link";

type Props = {
    title: string;
    children: React.ReactNode;
};

export default function SignConatiner({ title, children }: Props) {
    return (
        <>
            <div className="flex item-center justify-center mb-3">
                <h1 className="mb-2 text-xl font-bold">{title}</h1>
            </div>

            {children}
        </>
    );
}
