import Link from "next/link";

type Props = {
    title: string;
    children: React.ReactNode;
};

export default function SignConatiner({ title, children }: Props) {
    return (
        <>
            <div className="flex item-center justify-between">
                <h1 className="mb-2 text-xl font-bold">{title}</h1>
                <Link className="text-gray-400 text-sm hover:text-gray-500" href="/">
                    홈으로
                </Link>
            </div>

            <hr className="mb-3" />
            {children}
        </>
    );
}
