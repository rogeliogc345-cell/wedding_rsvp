import { AddCustomerForm } from '@/components/admin/AddCustomerForm'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { createClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export const dynamic = 'force-dynamic';

const dashboard = async () => {

    const supabase = await createClient();
    const { data: customers, error } = await supabase
        .from("customers")
        .select("*").order("created_at", { ascending: false });


    if (error) return <div>Failed to load customers</div>




    return (
        <div className="p-8">

            <AddCustomerForm />

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Your Invitations</h1>
                <Link href="/dashboard/new">
                    <Button><Plus className="mr-2 h-4 w-4" /> New Invitation</Button>
                </Link>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Couple</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
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
                                <TableCell className="text-muted-foreground">/{customer.slug}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/invite/${customer.slug}`} target="_blank">
                                            <ExternalLink className="h-4 w-4" />
                                        </Link>
                                    </Button>
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