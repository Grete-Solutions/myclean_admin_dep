import { CountryDataTable } from '@/app/components/countries-data'
import React from 'react'

type Props = {}

export function page({}: Props) {
  return (
    <div><CountryDataTable/></div>
  )
}
