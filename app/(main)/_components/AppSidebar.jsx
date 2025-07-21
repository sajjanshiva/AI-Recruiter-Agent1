// /components/AppSidebar.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SideBarOptions } from "@/services/Constants";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function AppSidebar() {

    const path=usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center gap-4 mt-5">
        <Image
          src="/logo3.png"
          alt="logo"
          width={200}
          height={100}
          className="w-[180px] bg-[#f8f9fa] p-1" // add styling if you want to match bg
        />

        <Link href={'/dashboard/create-interview'}>
        <Button className="w-[90%]">
          <Plus className="mr-2" />
          Create New Interview
        </Button>
       </Link>

      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarOptions.map((option, index) => (
                <SidebarMenuItem key={index} className={'p-1'}>
                  <SidebarMenuButton asChild className={`p-5 ${path == option.path && 'bg-blue-50'}`}>
                    <Link href={option.path} className="flex items-center gap-2">
                      <option.icon className={` ${path==option.path&&'text-primary'}` } />
                      <span className={`text-[16px] font-medium${path==option.path&&'text-primary'}` }>{option.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
