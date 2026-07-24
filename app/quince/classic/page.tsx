import React from 'react'

export const dynamic = 'force-dynamic'
import XVAnosDemoUnoTemplate from '@/components/templates/XVAnos/XVAnosDemoUno'

const XVClassicTemplate = ({ customer }: { customer: any }) => {

    return (
        <XVAnosDemoUnoTemplate customer={customer} />
    )
}

export default XVClassicTemplate