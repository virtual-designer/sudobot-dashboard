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

import ForbiddenPage from "@/app/forbidden";
import Sidebar from "@/components/Dashboard/Sidebar";
import { useAuthContext } from "@/contexts/AuthContext";
import { useParams } from "next/navigation";
import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
    const { user } = useAuthContext();
    const { id } = useParams()!;

    if (!user || user?.guilds === undefined || user?.guilds === null)
        return null;

    return (
        <>
            {!user?.guilds.find(g => g.id === id) ? (
                <ForbiddenPage />
            ) : (
                <div className="md:grid md:grid-cols-[25%_73%] lg:grid-cols-[15%_83%] h-[100%] max-h-[89vh] gap-[2%]">
                    <Sidebar />
                    <div className="max-h-[100%] relative overflow-y-scroll">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default DashboardLayout;
