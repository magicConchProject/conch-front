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
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import CheckedIcon from "@/components/icons/CheckedIcon";
import ClosedIcon from "@/components/icons/ClosedIcon";

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
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
                        <Input required type="text" placeholder="이름" {...register("name", { required: true })} />
                        <Input required type="email" placeholder="이메일" {...register("email", { required: true })} />
                        <Input required type="password" placeholder="비밀번호" {...register("password", { required: true })} />

                        <InputGroup>
                            <Input
                                required
                                type="password"
                                placeholder="비밀번호 확인"
                                {...register("passwordConfirm", { required: true })}
                            />
                            <InputRightElement>{compare() ? <CheckedIcon /> : <ClosedIcon />}</InputRightElement>
                        </InputGroup>

                        <Button type="submit" colorScheme="teal" variant="solid" className="w-full">
                            회원가입하기
                        </Button>
                    </form>
                    <article className="flex justify-center gap-3 mt-4 items-center">
                        <Link className="flex justify-center text-gray-400 text-sm" href="/sign/signin">
                            로그인으로 이동
                        </Link>
                        <div className="w-[1px] h-[8px] bg-gray-300"></div>
                        <Link className="text-gray-400 text-sm hover:text-gray-500" href="/">
                            홈으로 이동
                        </Link>
                    </article>
                </section>
            </SignConatiner>
        </div>
    );
}
