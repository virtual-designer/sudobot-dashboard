"use server";

import "server-only";

import {
    ContactMailFormData,
    ContactMailFormSchema,
} from "@/components/ContactMail/ContactMailFormSchema";
import env from "@/utils/env";
import axios from "axios";
import { headers } from "next/headers";
import { v4 as uuid } from "uuid";

const rateLimitCache = new Map<string, number>();

setInterval(
    () => {
        rateLimitCache.clear();
    },
    1000 * 60 * 60, // 1 hour
);

export async function sendContactMessage(data: ContactMailFormData) {
    const ip = headers().get("x-internal-ip");

    if (!ip) {
        return {
            success: false,
            message: "Cannot proceed with this request.",
        }
    }

    if (rateLimitCache.has(ip)) {
        const lastTime = rateLimitCache.get(ip) ?? 0;

        if (Date.now() - lastTime < 20_000) {
            // 20 seconds
            return {
                success: false,
                message: "You are being rate limited. Please try again later.",
            };
        }
    }

    rateLimitCache.set(ip, Date.now());
    
    if (!env.DISCORD_SUPPORT_WEBHOOK) {
        return {
            success: false,
            message: "No support webhook configured.",
        };
    }

    if (!ContactMailFormSchema.safeParse(data).success) {
        return {
            success: false,
            message: "Invalid data.",
        };
    }

    const form = new FormData();
    const id = uuid();

    form.set(
        "payload_json",
        JSON.stringify({
            content: `# New Support Ticket\n**Ticket ID**: ${id}\n**Assigned To**: None\n### Submitter Information\n**Name:** ${data.name}\n**Email:** ${data.email}\n\n-# Always be careful with file attachments.`,
        }),
    );

    form.set("content", new Blob(data.message.split("")), "message.txt");

    try {
        await axios.postForm(env.DISCORD_SUPPORT_WEBHOOK, form);
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to send the message.",
        };
    }

    return {
        success: true,
    };
}