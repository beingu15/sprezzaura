'use client';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Logo } from '@/components/shared/Logo';
import { LayoutDashboard, Newspaper, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Toaster } from "@/components/ui/toaster";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <Sidebar>
                    <SidebarHeader>
                        <Logo />
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === '/admin'}><Link href="/admin"><LayoutDashboard />Dashboard</Link></SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === '/admin/seo-generator'}><Link href="/admin/seo-generator"><Zap />SEO Generator</Link></SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === '/admin/topic-suggester'}><Link href="/admin/topic-suggester"><Newspaper />Topic Suggester</Link></SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
                <main className="flex-1 p-4 md:p-8 bg-secondary/20">
                    {children}
                </main>
            </div>
            <Toaster />
        </SidebarProvider>
    );
}
