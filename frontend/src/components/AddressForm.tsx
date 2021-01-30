import React from 'react'
import { FormikHelpers, useFormik } from "formik";
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles'
import { 
  TextField, Button, Paper, Grid, CircularProgress
} from '@material-ui/core';

import { AddressProps, createOrUpdateAddress } from "src/repository"


// Styles 
const useStyles = makeStyles(theme => ({
  paper: {
    padding: "15px",
    borderRadius: "15px"
  },
  field: {
    marginTop: "12px"
  },
  button: {
    marginTop: "12px",
    marginBottom: "12px"
  }
}))

// Form params types
interface FormProps {
  address?: AddressProps 
  updating?: boolean
  // Called after create new address
  updateAddressList?: (adddress: AddressProps) => void,
  // Called after update an address
  updateCallback?: () => void
}

// Validations
const AddressSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Muy Corto!')
    .max(50, 'Muy Largo!')
    .required('Requerido'),
  address: Yup.string()
    .min(5, 'Muy Corto!')
    .max(100, 'Muy Largo!')
    .required('Requerido'),
  city: Yup.string()
    .min(5, 'Muy Corto!')
    .max(15, 'Muy Largo!')
    .required('Requerido'),
  state: Yup.string()
    .min(2, 'Muy Corto!')
    .max(15, 'Muy Largo!')
    .required('Requerido'),
  zipCode: Yup.string()
    .min(4, 'Muy Corto!')
    .max(15, 'Muy Largo!')
    .required('Requerido'),
});


const AddressForm = (
  {updateAddressList, updating, address, updateCallback }: FormProps
) => {

  const classes = useStyles()
  const [loading, setLoading] = React.useState(false)

  // Handle address creation
  const handleSubmit = async (values: AddressProps, formikHelpers: FormikHelpers<AddressProps>) => {
    setLoading(true)

    let address = await createOrUpdateAddress({...values})
    updateAddressList && updateAddressList(address) // add to the list
    formikHelpers.resetForm() // Clear form

    setLoading(false)
  }

  // Handle address update
  const handleUpdate = async (values: AddressProps, formikHelpers: FormikHelpers<AddressProps>) => {
    setLoading(true)

    await createOrUpdateAddress({...values, id: address.id}, true)
    formikHelpers.resetForm()
    updateCallback()
    
    setLoading(false)
  }

  const formik = useFormik({
    initialValues: {
      fullName: updating ? address.fullName : "", 
      address: updating ? address.address : "",
      city: updating ? address.city : "",
      state: updating ? address.state : "",
      zipCode: updating ? address.zipCode : ""
    },
    validationSchema: AddressSchema,
    onSubmit: !updating ? handleSubmit : handleUpdate
  });

  return (
    <Paper className={classes.paper} variant="outlined">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          id="fullName"
          name="fullName"
          label="Nombre completo"
          className={classes.field}
          value={formik.values.fullName}
          onChange={formik.handleChange}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />
        <TextField
          variant="outlined"
          fullWidth
          id="address"
          name="address"
          label="Dirección"
          className={classes.field}
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <TextField
          variant="outlined"
          fullWidth
          id="city"
          name="city"
          label="Ciudad"
          className={classes.field}
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} item>
            <TextField
              variant="outlined"
              fullWidth
              id="state"
              name="state"
              label="Estado"
              className={classes.field}
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>
          <Grid xs={12} sm={6} item>
            <TextField
              variant="outlined"
              fullWidth
              id="zipCode"
              name="zipCode"
              label="Código postal"
              className={classes.field}
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
              helperText={formik.touched.zipCode && formik.errors.zipCode}
            />
          </Grid>
        </Grid>
        <Button 
          className={classes.button} 
          disabled={
            loading || updating && (
              formik.values.fullName === address.fullName && 
              formik.values.address === address.address &&
              formik.values.city === address.city &&
              formik.values.state === address.state &&
              formik.values.zipCode === address.zipCode
            )
          }
          color="primary" variant="contained" fullWidth type="submit"
        >
          {loading ? <CircularProgress size={22} /> : "Submit"}
        </Button>
      </form>
    </Paper>
  )
}

export default AddressForm