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
import { Button, Input, Stack } from "@chakra-ui/react";

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
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
                        <Stack spacing={4} align="center">
                            <Input required type="email" placeholder="이메일 입력" {...register("email", { required: true })} />
                            <Input required type="password" placeholder="비밀번호 입력" {...register("password", { required: true })} />

                            <Button type="submit" colorScheme="teal" variant="solid" className="w-full">
                                로그인하기
                            </Button>
                        </Stack>
                    </form>
                    <article className="flex justify-center gap-3 mt-4 items-center">
                        <Link className="text-gray-400 text-sm hover:text-gray-500" href="/sign/signup">
                            회원가입 하기
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
