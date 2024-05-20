import EnsureAuthenticated from "@/components/Auth/EnsureAuthenticated";
import UnsavedChangesAlert from "@/components/Dashboard/UnsavedChangesAlert";
import Navbar from "@/components/Navigation/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ConfigMutationProvider } from "@/contexts/ConfigMutationProvider";
import { getAppRouterURL } from "@/utils/routing";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
    const cookieStore = cookies();
    const { pathname } = getAppRouterURL();

    if (!cookieStore.get("logged_in")) {
        redirect(`/login?ct=${encodeURIComponent(pathname)}`);
    }

    return (
        <ConfigMutationProvider>
            <Navbar />
            <EnsureAuthenticated />
            <div className="lg:grid lg:h-[calc(100svh-4rem)] lg:grid-cols-[minmax(250px,20%)_auto] lg:gap-5 lg:overflow-y-hidden">
                <Sidebar className="z-[100] hidden lg:block" />
                <div className="lg:h-[calc(100svh-3.2rem)] lg:overflow-y-scroll">{children}</div>
            </div>
            <UnsavedChangesAlert />
        </ConfigMutationProvider>
    );
}
