import React from 'react'
import Head from 'next/head'
import AddressForm from '@/core/AddressForm'
import AddressCard from '@/core/AddressCard'
import { AddressProps, fetchAddresses } from '../src/repository'

import styles from '../styles/Home.module.css'


export default function Home() {
  const [addresses, setAddresses] = React.useState<AddressProps[]>()

  React.useEffect(() => {
    // Fetch data from the server
    fetchAddresses()
    .then((data: AddressProps[]) => setAddresses(data))
  }, [])

  const updateAddressList = (address: AddressProps) => {
    setAddresses([address, ...addresses])
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Direcciones</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{textAlign: "center"}}>
        <h1>Agregar nueva dirección</h1>
        <AddressForm updateAddressList={updateAddressList} />
      </div> 

      <main className={styles.main}>
        <h2>Lista de direcciones</h2>
        <div className={styles.grid}>
          {
            !addresses || addresses.length === 0 &&
            <p>No se encontraron direcciones, agrege la primera...</p>
          }
          {
            addresses?.map((address: AddressProps) => (
              <AddressCard key={address.id} address={address} />
            ))
          }
        </div>
      </main>
    </div>
  )
}
