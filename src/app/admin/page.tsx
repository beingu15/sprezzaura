import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Newspaper, Inbox } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 font-headline">Admin Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/admin/leads">
                    <Card className="hover:bg-accent/10 hover:border-primary/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium">Leads</CardTitle>
                            <Inbox className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                View and manage submissions from your contact form.
                            </p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/seo-generator">
                    <Card className="hover:bg-accent/10 hover:border-primary/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium">SEO Description Generator</CardTitle>
                            <Zap className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Generate SEO-friendly descriptions for services and blog posts.
                            </p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/topic-suggester">
                    <Card className="hover:bg-accent/10 hover:border-primary/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium">Blog Topic Suggester</CardTitle>
                            <Newspaper className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Get AI-powered suggestions for new blog topics.
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
