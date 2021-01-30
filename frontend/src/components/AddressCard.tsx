import React from 'react'
import { AddressProps } from 'src/repository'

import styles from 'styles/Home.module.css'


export default function AddressCard({address}: {address: AddressProps}) {


  return (
    <a
      href={`/address/${address.id}`}
      className={styles.card}
    >
      <h3>{address.fullName} &rarr;</h3>
      <p>Dirección: {address.address}</p>
      <p>Ciudad: {address.city}</p>
      <p>Estado: {address.state}</p>
      <p>Código postal: {address.zipCode}</p>
    </a>
  )
}