"use client";
import SignButton from "@/components/sign/SignButton";
import SignInput from "@/components/sign/SignInput";
import SignConatiner from "@/components/containers/SignContainer";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useUser from "@/data/use-user";
import { signIn } from "@/api/user";

export default function SignIn() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const router = useRouter();

    const { mutate } = useUser();

    //로그인 제출 함수
    const submit: SubmitHandler<any> = async (data) => {
        toast
            .promise(signIn(data), {
                loading: "Loading",
                success: () => `로그인 성공`,
                error: (err) => `${err.toString()}`,
            })
            .then(() => {
                mutate();
                return router.push("/");
            });
    };

    return (
        <div>
            <SignConatiner title="로그인">
                <section>
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
                        <SignInput labelName="이메일" type="email" label="email" register={register} />

                        <SignInput labelName="비밀번호" type="password" label="password" register={register} />

                        <SignButton buttonName="로그인하기" />
                    </form>
                    <hr className="my-3" />
                    <Link className="flex justify-center text-gray-400 text-sm" href="/sign/signup">
                        회원가입으로 이동
                    </Link>
                </section>
            </SignConatiner>
        </div>
    );
}
