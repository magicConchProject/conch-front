type Props = {
    Q: string;
};

export default function Question({ Q }: Props) {
    return (
        <div className="flex justify-end">
            <div
                className={`flex justify-end bg-teal-600 text-white p-2 px-3 sm:max-w-[450px] md:max-w-[650px]  lg:max-w-[800px] rounded-lg mr-3 relative ${after}`}
            >
                {Q}
            </div>
        </div>
    );
}

const after = `after:border-[6px] after:border-transparent after:border-t-teal-600 after:border-l-teal-600 after:w-0 after:absolute after:top-1.5 after:right-[-10px]`;
