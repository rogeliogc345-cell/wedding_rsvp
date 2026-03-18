'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { callingHelloWorldAction } from '../(admin)/actions'
import { useActionState, startTransition, useEffect } from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

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
        <div className="p-8 flex justify-center ">
            <motion.form
                initial={{ opacity: 0, y: 30 }}
                animate={{
                    opacity: 1, y: 0,
                    borderColor: errors.name ? "#ef4444" : "#d1d5db"

                }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
                <motion.input
                    animate={errors.name ? { x: [-5, 5, -5, 5, 0] } : {}}
                    transition={{ duration: 0.3 }}

                    className='p-2 border border-stone-300 rounded' type="text"
                    {...register("name", { required: 'Name is required' })} placeholder='enter name' />
                {errors.name && <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.4 }}

                    className='text-red-500'>{errors.name.message}</motion.p>}
                <input className='p-2 border border-stone-300 rounded' type="email"
                    {...register("email", { required: 'Email is required' })} placeholder='enter email' />
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                <input className='p-2 border border-stone-300 rounded' type="password"
                    {...register("password", { required: 'Password is required' })} placeholder='enter password' />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}






                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={pending}
                    className='p-2 border border-stone-300 rounded' type="submit">{pending ? (<span className='animate-spin h-5 w-5 rounded-full'></span>) : ('Submit')}</motion.button>
            </motion.form>


            <h1>Hello</h1>

        </div>
    );
}
