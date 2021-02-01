import React from 'react'
import { render, cleanup, screen, fireEvent, waitFor } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";

import AddressForm from '../../components/AddressForm'
import { AddressProps } from '../../repository';


afterEach(cleanup)

describe("AddressForm", () => {
  var address: AddressProps;

  beforeEach(() => {
    address = {
      id: 12,
      fullName: "Raudin Moreno",
      address: "8220 NW 68TH ST",
      city: "Miami",
      state: "FL",
      zipCode: "33166-2759"
    }
  })

  test('Load and display form correctly', async () => {
    
    render(<AddressForm address={address} />)

    // Form labels
    expect(screen.getAllByLabelText("Nombre completo")[0]).toBeVisible()
    expect(screen.getAllByLabelText("Dirección")[0]).toBeVisible()
    expect(screen.getAllByLabelText("Ciudad")[0]).toBeVisible()
    expect(screen.getAllByLabelText("Estado")[0]).toBeVisible()
    expect(screen.getAllByLabelText("Código postal")[0]).toBeVisible()
  })

  test('Load and display update form with values', async () => {
    
    render(<AddressForm updating address={address} />)

    // Form values
    expect(screen.getByDisplayValue(address.fullName)).toBeVisible()
    expect(screen.getByDisplayValue(address.address)).toBeVisible()
    expect(screen.getByDisplayValue(address.city)).toBeVisible()
    expect(screen.getByDisplayValue(address.state)).toBeVisible()
    expect(screen.getByDisplayValue(address.zipCode)).toBeVisible()
  })
})