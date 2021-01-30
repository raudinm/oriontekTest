import React from 'react'
import Link from 'next/link'
import { AddressProps } from 'src/repository'

import styles from 'styles/Home.module.css'


export default function AddressCard({address}: {address: AddressProps}) {

  return (
    <Link
      href={`/address/${address.id}`}
    >
      <div className={styles.card}>
        <h3>{address.fullName} &rarr;</h3>
        <p>Dirección: {address.address}</p>
        <p>Ciudad: {address.city}</p>
        <p>Estado: {address.state}</p>
        <p>Código postal: {address.zipCode}</p>
      </div>
    </Link>
  )
}