import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { 
  Button, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Dialog, IconButton, Tooltip
} from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { AddressProps, fetchOrDeleteAddress } from 'src/repository'

import styles from 'styles/Address.module.css'
import AddressForm from '@/core/AddressForm';


export default function Address({address}: {address: AddressProps}) {
  const router = useRouter()
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);


  /**
   * Delete an address and redirect to the home page
   */
  const handleDelete = async () => {
    await fetchOrDeleteAddress(address.id, true)
    setOpenDeleteDialog(false)
    await router.replace('/')
  }

  /**
   * Called after update an address and it replace the navigation stack with the home page
   */
  const updateCallback = async () => {
    setOpenUpdateDialog(false)
    await router.replace('/')
  }

  return (
    <>
      <Head>
        <title>{address.fullName}</title>
      </Head>
      <div className={styles.container}>
        <div>
          <Tooltip title="Atras" placement="top">
            <IconButton onClick={() => router.back()} style={{marginLeft: "10px"}}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Actualizar" placement="top">
            <div className={styles.card} onClick={() => setOpenUpdateDialog(true)}>
              <h3>{address.fullName}</h3>
              <p>Dirección: {address.address}</p>
              <p>Ciudad: {address.city}</p>
              <p>Estado: {address.state}</p>
              <p>Código postal: {address.zipCode}</p>
            </div>
          </Tooltip>
        </div>
        
        <Button
          style={{color: "red", marginLeft: "20px"}}
          startIcon={<DeleteIcon/>}
          onClick={() => setOpenDeleteDialog(true)}
        >
          Eliminar
        </Button>

        {/* Alert dialog to confirm deletion */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(!openDeleteDialog)}
        >
          <DialogTitle>Eliminar dirección de: {address.fullName}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Se eliminará la direccion guardada en la base de datos de forma permanente, seguro que desea continuar?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(!openDeleteDialog)} color="primary">
              No
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
              Si
            </Button>
          </DialogActions>
        </Dialog>

        {/* Alert dialog to update form */}
        <Dialog
          open={openUpdateDialog}
          onClose={() => setOpenUpdateDialog(!openUpdateDialog)}
        >
          <DialogTitle>Actualizar dirección de: {address.fullName}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <AddressForm updateCallback={updateCallback} address={address} updating />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenUpdateDialog(!openUpdateDialog)} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const data: AddressProps = await fetchOrDeleteAddress(query.id, false)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      address: data
    }
  }
}