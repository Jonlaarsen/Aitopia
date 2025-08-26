"use client";

import {
  FileImage,
  FileText,
  FileVolumeIcon,
  Image,
  LucideFileVideo,
  MessageSquareText,
  Mic,
  Settings2,
  SquareActivity,
  Video,
  WalletCards,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: SquareActivity },
  { title: "Generate Image", url: "/image-generator", icon: Image },
  { title: "Generate Video", url: "/video-generator", icon: Video },
  { title: "Speech to Text", url: "/speech-to-text", icon: Mic },
  { title: "Text to speech", url: "/text-to-speech", icon: MessageSquareText },
  { title: "My Images", url: "/image-gallery", icon: LucideFileVideo },
  { title: "My Videos", url: "/video-gallery", icon: FileImage },
  {
    title: "Speech Gallery",
    url: "/speech-to-text-gallery",
    icon: FileVolumeIcon,
  },
  {
    title: "Text Gallery",
    url: "/text-to-speech-gallery",
    icon: FileText,
  },
  { title: "Settings", url: "/account-settings", icon: Settings2 },
  { title: "Billing", url: "/billing", icon: WalletCards },
];

export function NavMain() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {navItems.map((item) => (
          <Link
            href={item.url}
            key={item.title}
            className={cn(
              "rounded-none",
              pathname === item.url
                ? "bg-sidebar-accent text-black"
                : "text-zinc-500"
            )}
          >
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
