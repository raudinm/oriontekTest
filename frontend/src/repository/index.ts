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

// create address
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

// fetch or delete an address
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