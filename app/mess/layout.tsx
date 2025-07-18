"use client";

import SwitchButton from "@/components/navigation/SwitchButton";
import AvatarBanner from "@/components/navigation/AvatarBanner";
import NotificationBanner from "@/components/navigation/NotificationBanner";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MessLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { status } = useSession();

    // Get the current path segment for highlighting the active icon
    const currentPath = pathname.split('/').pop() || "listings";

    // Redirect to home if not logged in
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    // Navigation items with external image URLs
    const navigationItems = [
        {
            id: "listings",
            name: "Listings",
            image: "https://cdn-icons-png.flaticon.com/512/4394/4394562.png"
        },
        {
            id: "dashboard",
            name: "Dashboard",
            image: "https://cdn-icons-png.flaticon.com/512/8899/8899687.png"
        },
        {
            id: "analysis",
            name: "Analysis",
            image: "https://cdn-icons-png.flaticon.com/512/1011/1011528.png"
        },
        {
            id: "leaderboard",
            name: "Leaderboard",
            image: "https://cdn-icons-png.flaticon.com/512/2617/2617955.png"
        },
        {
            id: "profile",
            name: "Profile",
            image: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
        }
    ];

    // Handle avatar click to navigate to the corresponding page
    const handleAvatarClick = (item: { id: string; name: string; image?: string | null }) => {
        router.push(`/mess/${item.id}`);
    };

    return (
        <div className="relative p-6 ">
            <div className="mx-9 ml-18 mb-20">
                {children}

                <SwitchButton />
            </div>
            <NotificationBanner>
                {/* This is an empty fragment, content will be added by the NotificationBanner */}
            </NotificationBanner>
            <AvatarBanner
                items={navigationItems}
                onAvatarClick={handleAvatarClick}
                selectedItemId={currentPath}
                isCanteen={false}
            />
        </div>
    );
}