
'use client';

import { useEffect, useState } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Logo } from '@/components/shared/Logo';
import { LayoutDashboard, Newspaper, Zap, Inbox, LogOut, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Toaster } from "@/components/ui/toaster";
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const auth = useAuth();
    const firestore = useFirestore();
    const { user, isUserLoading } = useUser();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAdmin = async () => {
            if (isUserLoading) return;
            if (!user) {
                // Middleware should handle this, but as a fallback:
                if (pathname !== '/admin/login') {
                    router.push('/admin/login');
                }
                return;
            }

            try {
                const adminDoc = await getDoc(doc(firestore, 'roles_admin', user.uid));
                if (adminDoc.exists()) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                    router.push('/');
                }
            } catch (error) {
                console.error("Admin check failed", error);
                setIsAdmin(false);
            }
        };

        checkAdmin();
    }, [user, isUserLoading, firestore, router, pathname]);

    const handleLogout = async () => {
        await auth.signOut();
        await fetch('/api/auth/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'logout' }),
        });
        router.push('/admin/login');
    };

    // Don't wrap the login page in the sidebar layout
    if (pathname === '/admin/login') {
        return <>{children}<Toaster /></>;
    }

    if (isUserLoading || isAdmin === null) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isAdmin === false) {
        return null; // Redirecting in useEffect
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <Sidebar>
                    <SidebarHeader className="p-4">
                        <Logo />
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === '/admin'}><Link href="/admin"><LayoutDashboard />Dashboard</Link></SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === '/admin/leads'}><Link href="/admin/leads"><Inbox />Leads</Link></SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === '/admin/seo-generator'}><Link href="/admin/seo-generator"><Zap />SEO Generator</Link></SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === '/admin/topic-suggester'}><Link href="/admin/topic-suggester"><Newspaper />Topic Suggester</Link></SidebarMenuButton>
                            </SidebarMenuItem>
                            <div className="mt-auto p-4 border-t">
                                <SidebarMenuItem>
                                    <SidebarMenuButton onClick={handleLogout} className="text-destructive hover:text-destructive">
                                        <LogOut /> Logout
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </div>
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
                <main className="flex-1 p-4 md:p-8 bg-secondary/20">
                    <Breadcrumbs className="mb-4" />
                    {children}
                </main>
            </div>
            <Toaster />
        </SidebarProvider>
    );
}
