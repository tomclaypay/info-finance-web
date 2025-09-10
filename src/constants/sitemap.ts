export const endpoint = process.env.NEXT_PUBLIC_HASURA_URL ?? ''

export const headers = {
  'content-type': 'application/json',
}

export const options = {
  method: 'POST',
  headers,
}
