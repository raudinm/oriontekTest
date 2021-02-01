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
        <div style={{display: "flex", flexDirection: "row"}}>
          <h3>{address.fullName}</h3>
          <h3>&rarr;</h3>
        </div>
        <p>Dirección: {address.address}</p>
        <p>Ciudad: {address.city}</p>
        <p>Estado: {address.state}</p>
        <p>Código postal: {address.zipCode}</p>
      </div>
    </Link>
  )
}