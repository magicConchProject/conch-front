type Props = {
    Q: string;
};

export default function Question({ Q }: Props) {
    return (
        <div className="flex justify-end">
            <div
                className={`flex justify-end bg-yellow-400 p-1 px-2 sm:max-w-[450px] md:max-w-[650px]  lg:max-w-[800px] rounded-md mr-3 relative ${after}`}
            >
                {Q}
            </div>
        </div>
    );
}

const after = `after:border-[6px] after:border-transparent after:border-t-yellow-400 after:border-l-yellow-400 after:w-0 after:absolute after:top-1.5 after:right-[-10px]`;
