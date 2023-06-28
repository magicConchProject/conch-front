import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "../common/CustomInput";
import SignInput from "../sign/SignInput";
import SignPasswordCheckInput from "../sign/SignPasswordCheckInput";
import SubmitButton from "../common/SubmitButton";
import toast from "react-hot-toast";
import { editPassword } from "@/api/user";

export default function MngMyPassword() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    //watch
    const passwordWatch = watch("password");
    const passwordConfirmWatch = watch("passwordConfirm");
    const compare = () => {
        return passwordWatch && passwordConfirmWatch && passwordWatch === passwordConfirmWatch;
    };

    const submit: SubmitHandler<any> = (submitdata) => {
        if (submitdata.password !== submitdata.passwordConfirm) {
            return toast(() => "비밀번호가 일치하지 않습니다");
        } else {
            toast.promise(editPassword(submitdata.password), {
                loading: "Loading",
                success: () => "비밀번호 변경 성공",
                error: (err) => `${err.toString()}`,
            });
        }
    };

    return (
        <div className="bg-neutral-50 rounded-md p-2 flex flex-col mb-3">
            <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
                <SignInput labelName="비밀번호" type="password" register={register} label="password" />
                <SignPasswordCheckInput
                    labelName="비밀번호 확인"
                    type="password"
                    register={register}
                    label="passwordConfirm"
                    compare={compare()}
                />
                <SubmitButton name="수정하기" />
            </form>
        </div>
    );
}
