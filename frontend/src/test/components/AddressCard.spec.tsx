import React from 'react'
import { render, cleanup } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";

import AddressCard from '../../components/AddressCard'
import { AddressProps } from '../../repository';


afterEach(cleanup)

describe("AddressCard", () => {
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

  test('Load and display address correctly', async () => {
    
    const {getByText} = render(<AddressCard address={address} />)

    expect(getByText(address.fullName)).toBeVisible()
    expect(getByText(`Dirección: ${address.address}`)).toBeVisible()
    expect(getByText(`Ciudad: ${address.city}`)).toBeVisible()
    expect(getByText(`Estado: ${address.state}`)).toBeVisible()
    expect(getByText(`Código postal: ${address.zipCode}`)).toBeVisible()

  })
})