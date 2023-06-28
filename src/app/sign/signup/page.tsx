"use client";
import SignButton from "@/components/sign/SignButton";
import SignInput from "@/components/sign/SignInput";
import SignPasswordCheckInput from "@/components/sign/SignPasswordCheckInput";
import SignConatiner from "@/components/containers/SignContainer";
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
//https://nextjs.org/docs/app/api-reference/functions/redirect
import { useRouter } from "next/navigation";
import { signUp } from "@/api/user";

export default function SignUp() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    //watch
    const passwordWatch = watch("password");
    const passwordConfirmWatch = watch("passwordConfirm");

    const router = useRouter();

    //회원가입 제출 함수
    const submit: SubmitHandler<any> = (data) => {
        if (data.password !== data.passwordConfirm) {
            return toast.error("비밀번호가 다릅니다.");
        }

        toast
            .promise(signUp(data), {
                loading: "Loading",
                success: () => `회원가입 성공`,
                error: (err) => `${err.toString()}`,
            })
            .then(() => {
                return router.push("/sign/signin");
            });
    };

    //password , passwordConfirm 값 비교 함수
    const compare = () => {
        return passwordWatch && passwordConfirmWatch && passwordWatch === passwordConfirmWatch;
    };

    return (
        <div>
            <SignConatiner title="회원가입">
                <section>
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
                        <SignInput labelName="이름" register={register} label="name" />
                        <SignInput labelName="이메일" type="email" register={register} label="email" />
                        <SignInput labelName="비밀번호" type="password" register={register} label="password" />
                        <SignPasswordCheckInput
                            labelName="비밀번호 확인"
                            type="password"
                            register={register}
                            label="passwordConfirm"
                            compare={compare()}
                        />

                        {/* <SignInput labelName="그룹" required={false} register={register} label="group" /> */}
                        <SignButton buttonName="회원가입하기" />
                    </form>
                    <hr className="my-3" />
                    <Link className="flex justify-center text-gray-400 text-sm" href="/sign/signin">
                        로그인으로 이동
                    </Link>
                </section>
            </SignConatiner>
        </div>
    );
}
