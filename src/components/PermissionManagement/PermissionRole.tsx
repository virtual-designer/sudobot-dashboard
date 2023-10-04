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

import useIsDesktop from "@/hooks/useIsDesktop";
import useIsInitialRender from "@/hooks/useIsInitialRender";
import useTogglableState from "@/hooks/useTogglableState";
import { APIPermissionRole } from "@/types/APIPermissionRole";
import { Button, Tooltip } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FC } from "react";
import { FaChevronDown, FaPencil } from "react-icons/fa6";
import { MdSecurity, MdWarning } from "react-icons/md";
import PermissionRoleDelete from "./PermissionRoleDelete";
import PermissionRoleEditModal from "./PermissionRoleEditModal";

interface PermissionRoleProps {
    permission: APIPermissionRole;
}

const PermissionRole: FC<PermissionRoleProps> = ({ permission }) => {
    const [expanded, toggleExpanded] = useTogglableState();
    const [isEditing, toggleEditing] = useTogglableState();
    const isInitialRender = useIsInitialRender();
    const isDesktop = useIsDesktop();

    return (
        <div
            style={{
                background: "#232323",
                padding: "10px 10px 10px 12px",
                margin: "10px " + (isDesktop ? "10px" : "0"),
            }}
        >
            <PermissionRoleEditModal
                isEditing={isEditing}
                toggleEditing={toggleEditing}
                permission={permission}
            />

            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Tooltip
                        content={"This is a named permission role."}
                        delay={1200}
                        color="foreground"
                    >
                        <div>
                            <MdSecurity size={20} />
                        </div>
                    </Tooltip>
                    <h3 className="ml-2">{permission.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="flat"
                        radius="sm"
                        isIconOnly
                        color="primary"
                        onClick={() => toggleEditing()}
                    >
                        <FaPencil size={15} />
                    </Button>

                    <Button
                        onClick={() => toggleExpanded()}
                        variant="flat"
                        radius="sm"
                        isIconOnly
                    >
                        <motion.span
                            animate={{
                                transform: `rotate(${expanded ? 180 : 0}deg)`,
                            }}
                        >
                            <FaChevronDown size={15} />
                        </motion.span>
                    </Button>
                </div>
            </div>

            <div className="overflow-y-hidden">
                <motion.div
                    initial={false}
                    animate={{
                        height: expanded ? "auto" : "0",
                    }}
                    transition={{
                        ease: "easeInOut",
                        duration: isInitialRender ? 0 : 0.2,
                    }}
                >
                    <div>
                        <br />
                        <strong className="font-bold">
                            Granted Permissions
                        </strong>
                        <div>
                            {permission.grantedPermissions?.map(
                                (permissionKey, index, array) => (
                                    <div
                                        key={permissionKey}
                                        className="flex items-center gap-2"
                                    >
                                        {permissionKey === "Administrator" && (
                                            <Tooltip
                                                content={
                                                    <>
                                                        This permission role
                                                        grants Administrator
                                                        permission,
                                                        <br />
                                                        which means users having
                                                        this permission role
                                                        have every possible
                                                        permission.
                                                    </>
                                                }
                                                delay={1000}
                                            >
                                                <div>
                                                    <MdWarning
                                                        className="inline-block"
                                                        size={"1.2em"}
                                                    />
                                                </div>
                                            </Tooltip>
                                        )}
                                        <span className="font-mono">
                                            {`${permissionKey}`}
                                            {array.length - 1 == index
                                                ? ""
                                                : ", "}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>

                        <br />
                        <p className="text-[#999]">
                            The following users and roles have been assigned to
                            this permission role. Adding any new user or role
                            will grant all the configured permissions to that
                            user or users having the role.
                        </p>
                        <br />

                        <strong className="font-bold pb-2 block">Roles</strong>
                        <div>
                            {permission.roles?.map(role => (
                                <div
                                    key={role.id}
                                    className="flex items-center justify-between p-2 rounded-lg bg-[#333]"
                                >
                                    <span>@{`${role.name}`}</span>
                                    <span className="font-mono text-[#999]">
                                        {role.id}
                                    </span>
                                </div>
                            ))}

                            {permission.roles?.length === 0 && (
                                <p className="text-xs text-[#999]">
                                    No role found.
                                </p>
                            )}
                        </div>

                        <br />
                        <strong className="font-bold block pb-2">Users</strong>
                        <div>
                            {permission.users?.map(user => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between p-2 rounded-lg bg-[#333]"
                                >
                                    <span>@{`${user.name}`}</span>
                                    <span className="font-mono text-[#999]">
                                        {user.id}
                                    </span>
                                </div>
                            ))}

                            {permission.users?.length === 0 && (
                                <p className="text-[#999]">No user found.</p>
                            )}

                            <div className="pt-3 flex justify-end">
                                <PermissionRoleDelete
                                    id={permission.id}
                                    guildId={permission.guild_id}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PermissionRole;
