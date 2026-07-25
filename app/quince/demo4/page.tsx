import React from 'react'
import XVAnosDemoCuatro from '@/components/templates/XVAnos/XVAnosDemoCuatro'

export const dynamic = 'force-dynamic'

const XVDemo4Page = ({ customer }: { customer?: any }) => {
  return <XVAnosDemoCuatro customer={customer} />
}

export default XVDemo4Page
