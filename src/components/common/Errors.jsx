/* eslint-disable react/prop-types */
import { Alert } from '@mui/material'

const Errors = ({error}) => {
  return (
        <Alert severity="error">Error — {(error && error.message) || 'Sorry, an error has occurred.'}</Alert>
  )
}

export default Errors