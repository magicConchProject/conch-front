"use client";
import { usePathname } from "next/navigation";
export default function NavbarContainer({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return <>{pathname != "/sign/signup" && pathname != "/sign/signin" && <div>{children}</div>}</>;
}
