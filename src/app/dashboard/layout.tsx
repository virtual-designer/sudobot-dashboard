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

import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    const pathname = usePathname();
    const isRecoveryPage =
        pathname === "/account/recovery" ||
        pathname === "/dashboard/account/recovery";
    const { user } = useAuthWithCheck(!isRecoveryPage);

    return <>{!isRecoveryPage && !user ? null : children}</>;
};

export default Layout;
