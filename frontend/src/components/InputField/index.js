import React from 'react'
import { TextField, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const InputField = ({ error, ...props }) => (
  <>
    <TextField variant="outlined" {...props} />
    {error &&
      <Typography color="error">{error}</Typography>}
  </>
)

InputField.propTypes = {
  error: PropTypes.string,
}

export default InputField