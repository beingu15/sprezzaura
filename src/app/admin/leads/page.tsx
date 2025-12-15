'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { collection, query, orderBy, Timestamp } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface Lead {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    submissionDate?: Timestamp;
}

export default function LeadsPage() {
    const firestore = useFirestore();
    
    const leadsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'contact_form_submissions'), orderBy('submissionDate', 'desc'));
    }, [firestore]);

    const { data: leads, isLoading, error } = useCollection<Lead>(leadsQuery);

    const formatDate = (timestamp: Timestamp | undefined) => {
        if (!timestamp) return 'N/A';
        return timestamp.toDate().toLocaleString();
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-2 font-headline">Leads</h1>
            <p className="text-muted-foreground mb-6">Here are the latest submissions from your contact form.</p>
            
            <Card>
                <CardContent>
                    {isLoading && (
                        <div className="space-y-4 p-6">
                           <Skeleton className="h-8 w-full" />
                           <Skeleton className="h-10 w-full" />
                           <Skeleton className="h-10 w-full" />
                           <Skeleton className="h-10 w-full" />
                        </div>
                    )}
                    {error && (
                         <Alert variant="destructive" className="mt-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                Could not load leads. Please ensure you have the correct permissions to view this data.
                            </AlertDescription>
                        </Alert>
                    )}
                    {!isLoading && !error && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Message</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leads && leads.length > 0 ? (
                                    leads.map(lead => (
                                        <TableRow key={lead.id}>
                                            <TableCell className="text-xs whitespace-nowrap">{formatDate(lead.submissionDate)}</TableCell>
                                            <TableCell>{lead.name}</TableCell>
                                            <TableCell>{lead.email}</TableCell>
                                            <TableCell>{lead.subject}</TableCell>
                                            <TableCell className="max-w-[300px] truncate">{lead.message}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center h-24">
                                            No leads yet.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
