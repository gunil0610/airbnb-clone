"use client";

import { FC, useCallback, useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import { Button } from "../Button";
import { signIn } from "next-auth/react";

interface RegisterModalProps {}

const RegisterModal: FC<RegisterModalProps> = ({}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            await axios.post("/api/auth/register", data);
            toast.success("Account created successfully!");
            registerModal.onClose();
            loginModal.onOpen();
            reset();
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
            <Input
                id="email"
                type="email"
                label="Email"
                disabled={isLoading}
                {...register("email", {
                    required: "Enter Email",
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid email address",
                    },
                })}
                error={errors.email}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                {...register("name", { required: "Enter Your Name" })}
                error={errors.name}
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                {...register("password", {
                    required: "Enter Password",
                    pattern: {
                        value: /^(?=.*?[a-z])(?=.*?[0-9]).{6,}$/,
                        message:
                            "Password should be at least 6 characters, including 1 number and 1 letter",
                    },
                })}
                error={errors.password}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                variant="outline"
                icon={FcGoogle}
                onClick={() => signIn("google")}
            >
                Continue with Google
            </Button>
            <Button
                variant="outline"
                icon={AiFillGithub}
                onClick={() => signIn("github")}
            >
                Continue with Github
            </Button>
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row justify-center items-center gap-2">
                    <p>Already have an account?</p>
                    <p
                        onClick={toggle}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Log in
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;
