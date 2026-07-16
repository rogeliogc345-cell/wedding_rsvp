import { AddCustomerForm } from '@/components/admin/AddCustomerForm'
import { ChangeAdminPasswordForm } from '@/components/admin/ChangeAdminPasswordForm';
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { getCustomers } from '../actions';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Settings } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { LogoutButtonAdmin } from '@/components/admin/LogoutButtonAdmin';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

// ── Category badge — pure Server Component, no 'use client' needed ──────────
function CategoryBadge({ category }: { category: string | null }) {
    if (!category) return <span className="text-muted-foreground text-xs">—</span>;

    const styles: Record<string, string> = {
        wedding: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
        XV: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
    };

    const label: Record<string, string> = {
        wedding: "Wedding",
        XV: "XV",
    };

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[category] ?? "bg-muted text-muted-foreground"
            }`}>
            {label[category] ?? category}
        </span>
    );
}

const dashboard = async () => {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/admin/login');
    }

    const customers = await getCustomers();

    if (!customers) return <div>Failed to load customers</div>




    return (
        <div className="p-8">

            <h1 className='text-4xl font-bold mb-8 '>Dashboard</h1>

            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <AddCustomerForm />
                <ChangeAdminPasswordForm />
            </div>
            <LogoutButtonAdmin />


            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Couple</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead className="text-right">Edit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell className="font-medium">{customer.couple_name}</TableCell>
                                <TableCell>
                                    <Badge variant={customer.is_published ? "default" : "secondary"}>
                                        {customer.is_published ? "Live" : "Draft"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <CategoryBadge category={customer.category} />
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {customer.event_date ? new Date(customer.event_date).toLocaleDateString() : "TBD"}
                                </TableCell>
                                <TableCell className="text-muted-foreground">/{customer.slug}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    {customer.is_published ? (
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/invite/${customer.slug}`} target="_blank">
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button variant="outline" size="sm" disabled>
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    )}
                                    <Button size="sm" asChild>
                                        <Link href={`/dashboard/edit/${customer.id}`}>
                                            <Settings className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>

    )
}

export default dashboard