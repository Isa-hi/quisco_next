import Heading from '@/components/ui/Heading'
import Link from 'next/link'
import React from 'react'

export default function notFound() {
  return (
    <div className='w-full text-center'>
        <Heading>Producto no encontrado</Heading>
        <Link 
        href={`/admin/products`}
        className='bg-amber-500 text-white font-bold py-2 px-4 rounded'>
            Regresar a la lista de productos
        </Link>
    </div>
  )
}
