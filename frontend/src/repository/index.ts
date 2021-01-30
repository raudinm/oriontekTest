export interface AddressProps {
  id?: number
  fullName?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
}

interface RequestParams {
  endpoint: string
  params?: AddressProps
  method?: "GET" | "POST" | "PUT" | "DELETE"
}

const prepareForRequest = ({endpoint, params=null, method='GET'}: RequestParams): Request => {

  const request = new Request(`${process.env.BACKEND_URL}/${endpoint}`, {
    method,
    body: params !== null ? JSON.stringify({ ...params }): null,
    headers: new Headers({ 
      'Content-Type': 'application/json',
    })
  });

  return request;
}

/**
 *  Create or udate an address
 * @param {AddressProps} data Data to save or update
 * @param {boolean} updating Determines whether to update or create a new entry
 */
export async function createOrUpdateAddress(data: AddressProps, updating?: boolean): Promise<AddressProps> {

  const request = prepareForRequest({
    endpoint: updating ? `addresses/${data.id}` : 'addresses',
    params: data,
    method: updating ? "PUT" : "POST"
  })

  try {
    const created = await fetch(request).then(data => data.json())
    const address: AddressProps = {...created}
    return address

  } catch(err) {
    console.log(err)
    return undefined
  }
  
}


// Fetch all addresses
export async function fetchAddresses(): Promise<any> {

  const request = prepareForRequest({
    endpoint: 'addresses?_sort=updated_at:DESC&_limit=30',
    method: "GET"
  })

  const data = await fetch(request).then(data => data.json())

  return data
}

/**
 * Fetch or delete an address
 * @param {number} addressId Id of the addrees to fetch or delete
 * @param {boolean} deleting If true then the address will be deleted
 */
export async function fetchOrDeleteAddress(addressId: number, deleting: boolean): Promise<AddressProps> {

  const request = prepareForRequest({
    endpoint: `addresses/${addressId}`,
    method: !deleting ? "GET" : "DELETE"
  })

  try {
    const data = await fetch(request).then(data => data.json())
    const address: AddressProps = {...data}

    return address
  } catch(err) {
    console.log(err)
    return undefined
  }
}