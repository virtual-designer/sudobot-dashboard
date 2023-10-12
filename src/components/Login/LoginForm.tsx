/*
* This file is part of SudoBot Dashboard.
*
* Copyright (C) 2021-2023 OSN Developers.
*
* SudoBot Dashboard is free software; you can redistribute it and/or modify it
* under the terms of the GNU Affero General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* SudoBot Dashboard is distributed in the hope that it will be useful, but
* WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with SudoBot Dashboard. If not, see <https://www.gnu.org/licenses/>.
*/

"use client";

import { login } from "@/api/routes/auth";
import { AuthContextAction, useAuthContext } from "@/contexts/AuthContext";
import { useRouterContext } from "@/contexts/RouterContext";
import {
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    Input,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FC, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Alert from "../Common/Alert";
import Link from "../Router/Link";
import DiscordLogin from "./DiscordLogin";

interface LoginFormData {
    username: string;
    password: string;
}

const LoginForm: FC = () => {
    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm<LoginFormData>({});
    const router = useRouterContext();
    const rememberRef = useRef(true);
    const { user, dispatch } = useAuthContext();

    const mutation = useMutation({
        mutationFn: login,
        mutationKey: ["login"],
        onError(error: AxiosError<{ error?: string }>) {
            console.log("Login failed", error);
        },
        onSuccess(data) {
            console.log("Login successful");

            try {
                (rememberRef.current ? localStorage : sessionStorage).setItem(
                    "user",
                    JSON.stringify(data.data.user)
                );
            } catch (e) {}

            dispatch?.({
                type: AuthContextAction.Login,
                payload: {
                    user: data.data.user,
                },
            });

            router?.push("/dashboard");
        },
    });

    useEffect(() => {
        if (user?.token) {
            router?.push("/dashboard");
        }
    }, [user]);

    const onValid = (data: LoginFormData) => {
        mutation.mutate(data);
    };

    return (
        <form
            className="mx-2 my-3 p-4 rounded-lg w-[calc(100vw-20px)] sm:w-[auto] md:min-w-[20vw]"
            onSubmit={handleSubmit(onValid)}
            style={{
                background:
                    "linear-gradient(to right, rgba(45, 45, 45, 0.5), rgba(45, 45, 45, 0.6))",
                boxShadow: "0 0 2px 0 rgba(255, 255, 255, 0.6)",
            }}
        >
            <style jsx global>
                {`
                    div:not([data-focus]) > div > label {
                        color: #999 !important;
                    }
                `}
            </style>
            {user === undefined && (
                <>
                    <CircularProgress isIndeterminate className="mx-auto" />
                </>
            )}

            {user !== undefined && (
                <>
                    {mutation.error?.response?.data?.error && (
                        <Alert type="error">
                            {mutation.error?.response?.data?.error ??
                                "An error has occurred"}
                            .
                        </Alert>
                    )}

                    {mutation.data?.data?.user && (
                        <Alert type="success">Login successful.</Alert>
                    )}

                    <Input
                        type="text"
                        label="Username"
                        labelPlacement="inside"
                        color="primary"
                        variant="bordered"
                        {...register("username", {
                            required: true,
                            value: "",
                        })}
                        description={
                            <p className="text-red-500">
                                {errors?.username?.type === "required"
                                    ? "Please specify a username to log in!"
                                    : ""}
                            </p>
                        }
                    />

                    <br />

                    <Input
                        type="password"
                        label="Password"
                        labelPlacement="inside"
                        color="primary"
                        variant="bordered"
                        {...register("password", {
                            required: true,
                            value: "",
                        })}
                        description={
                            <p className="text-red-500">
                                {errors?.password?.type === "required"
                                    ? "Please provide your password to log in!"
                                    : ""}
                            </p>
                        }
                    />
                    <div className="flex items-center justify-between mt-2">
                        <Checkbox
                            defaultSelected
                            onChange={event =>
                                (rememberRef.current = !!event.target.checked)
                            }
                        >
                            <p className="text-xs md:text-md">Remember me</p>
                        </Checkbox>
                        <Link
                            href="/account/recovery"
                            className="link ml-3 text-xs md:text-md"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <br />

                    <Button
                        type="submit"
                        fullWidth
                        color="primary"
                        variant="flat"
                        isLoading={mutation.isLoading}
                    >
                        Login
                    </Button>

                    <Divider className="my-5" />

                    <DiscordLogin isDisabled={mutation.isLoading} />
                </>
            )}
        </form>
    );
};

export default LoginForm;
