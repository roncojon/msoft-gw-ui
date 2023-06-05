/* eslint-disable react/prop-types */
import { Button } from '@mui/material'

const CustomButton = (props) => {
  return (
    <Button 
    {...props}
    variant={props.variant || "contained"}
    >{props.children}</Button>
  )
}

export default CustomButton