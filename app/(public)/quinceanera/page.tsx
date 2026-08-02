import React from 'react'
import XVAnos_classic from '@/components/templates/XVAnos/XVAnos_classic'
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { getInvitationBySlug } from '@/app/(admin)/actions';

interface PageProps {
  params?: Promise<{ slug?: string }>;
  searchParams?: Promise<{ slug?: string }>;
}

const xv_template = async ({ params, searchParams }: PageProps) => {
  const resolvedParams = params ? await params : {};
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const slug = resolvedParams?.slug || resolvedSearchParams?.slug;

  if (!slug) {
    notFound();
  }




  const customer = await getInvitationBySlug(slug);

  if (!customer || !customer.is_published) {
    notFound();
  }

  console.log("Customer Data:", customer);

  return (
    <XVAnos_classic customer={customer} events={customer.events || []} media={customer.media || []} />
  )
}

export default xv_template