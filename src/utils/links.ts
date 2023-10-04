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

import {
    MdBarChart,
    MdLockOutline,
    MdRule,
    MdSettings,
    MdShield,
    MdTerminal,
} from "react-icons/md";

export const BOT_INVITE_REQUEST_URL = "https://forms.gle/943kW9q25MpKEwW26";
export const SUPPORT_EMAIL_ADDRESS = "mailto:rakinar2@onesoftnet.eu.org";
export const DOCS_URL = "https://docs.sudobot.onesoftnet.eu.org";
export const BOT_TERMS_URL = `${DOCS_URL}/legal/terms`;
export const BOT_PRIVACY_POLICY_URL = `${DOCS_URL}/legal/privacy`;
export const BOT_GITHUB_REPO_URL = "https://github.com/onesoft-sudo/sudobot";
export const BOT_STATUS_PAGE_URL = "https://osn.freshstatus.io/";
export const SUPPORT_SERVER_INVITE = "https://discord.gg/892GWhTzgs";
export const DOCS_SELF_SETUP_URL = `${DOCS_URL}/getting-started`;
export const DOCS_FEATURES_URL = `${DOCS_URL}/features`;
export const DISCORD_OAUTH_URL = process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL;

export const navbarLinks = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Features",
        url: DOCS_FEATURES_URL,
    },
    {
        name: "Documentation",
        url: DOCS_URL,
    },
    {
        name: "Invite",
        url: BOT_INVITE_REQUEST_URL,
    },
];

export const sidebarItems = [
    {
        name: "Dashboard",
        url: "/dashboard/{id}",
        icon: MdBarChart,
    },
    {
        name: "Commands",
        url: "/settings/{id}/commands",
        icon: MdTerminal,
    },
    {
        name: "Auto Moderation",
        url: "/settings/{id}/automod",
        icon: MdShield,
    },
    {
        name: "Message Rules",
        url: "/settings/{id}/rules",
        icon: MdRule,
    },
    {
        name: "Permissions",
        url: "/settings/{id}/permissions",
        icon: MdLockOutline,
    },
    {
        name: "Account Settings",
        url: "/account",
        icon: MdSettings,
    },
];
