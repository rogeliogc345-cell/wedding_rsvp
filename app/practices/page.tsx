'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { callingHelloWorldAction } from '../(admin)/actions'
import { useActionState, startTransition, useEffect } from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import PhoneMockup from '@/components/mockup/PhoneMockup'
import Portfolio from '@/components/public/XVAnos/components/Portfolio'

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Email is required'),
    password: z.string().min(1, 'Password is required'),

})

export default function PracticePage() {






    const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
        // defaultValues: {
        //     name: 'Rogelio',
        //     email: 'roger@gmail.com',
        //     password: ''
        // }
    })

    const [state, action, pending] = useActionState(callingHelloWorldAction, null)




    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message);
            reset();
        } else {
            toast.error(state.message);
        }
    }, [state])

    const onSubmit = async (data: any) => {
        const formData = new FormData()
        Object.entries(data).forEach(([k, v]) => {
            formData.append(k, v as string);
        });


        startTransition(() => {
            action(formData)
        })
        reset()

    }
    return (
        <div>

            <Portfolio url="http://localhost:3000/invite/hani-quince-celebracion"
                title="XV años Elegancia"
                description="Invitaciones interactivas con confirmación RSVP en tiempo real, mapas integrados y cuenta regresiva." />
            <Portfolio url="http://localhost:3000/quince/demo1"
                title="Elegancia Digital"
                description="Invitaciones interactivas con confirmación RSVP en tiempo real, mapas integrados y cuenta regresiva." />
            <Portfolio url="http://localhost:3000/invite/hani-quince-celebracion"
                title="Elegancia Digital"
                description="Invitaciones interactivas con confirmación RSVP en tiempo real, mapas integrados y cuenta regresiva." />

        </div>



    )
}
