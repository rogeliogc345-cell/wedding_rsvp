import React from 'react'
import XVAnos_classic from '@/components/templates/XVAnos/XVAnos_classic'
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

const xv_template = async ({params}:{params:Promise<{slug:string}>}) => {
  const {slug} = await params;
  const supabase = await createClient();
  
  //getting customer data from supabase
  
  const { data: customer, error } = await supabase
    .from("customers")
    .select("*, events(*), media(*)")
    .eq("slug", slug)
    .single();

    if(error){
      throw new Error("Error fetching customer");
    }

    if(!customer || !customer.is_published){
      notFound();
    }

    


    console.log("Customer Data:", customer);


  return (
    <XVAnos_classic customer={customer} events={customer.events} media={customer.media}/>
  )
}

export default xv_template