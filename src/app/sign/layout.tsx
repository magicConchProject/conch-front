type Props = {
    children: React.ReactNode;
};

export default function SignLayout({ children }: Props) {
    //여기에 로그인 됐는지 확인하는 로직 작성하고 로그인 된 상태면 redirect 시키기

    return (
        <div className="bg-slate-200 w-full flex justify-center items-center">
            <div className="w-96 bg-slate-50 rounded-lg p-4">{children}</div>
        </div>
    );
}
