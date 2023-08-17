import { APIMessage } from "@/types/APIMessage";
import { Container } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { ComponentProps, FC } from "react";
import Messages from "./Messages";
import Invalid from "./invalid";

const ViewDeletedMessages: FC<{
    searchParams?: { [key: string]: string | string[] | undefined };
}> = async ({ searchParams }) => {
    let invalidProps: ComponentProps<typeof Invalid> = {
        url: undefined,
        error: undefined,
    };

    let response:
        | AxiosResponse<{
              messages: APIMessage[];
              guild: {
                  id: string;
                  name: string;
                  iconURL?: string;
              };
              channel: {
                  id: string;
                  name: string;
                  type: number;
              };
              version: string;
              generatedAt: string;
          }>
        | undefined = undefined;

    if (
        !searchParams?.url ||
        typeof searchParams?.url !== "string" ||
        !searchParams?.url.startsWith("https://cdn.discordapp.com")
    ) {
        invalidProps.url = searchParams?.url;
    } else {
        try {
            console.log(searchParams.url);

            response = await axios.get(searchParams?.url, {
                headers: {
                    Accept: "application/json",
                },
            });
        } catch (e) {
            invalidProps.error = true;
        }
    }

    console.log(searchParams);

    return (
        <main className="min-h-[90vh] py-4 px-0 lg:px-[17.3%]">
            {invalidProps.error || invalidProps.url ? (
                <Invalid {...invalidProps} />
            ) : (
                <Container maxWidth="xl">
                    <Messages messages={response?.data?.messages ?? []} />
                </Container>
            )}
        </main>
    );
};

export default ViewDeletedMessages;
