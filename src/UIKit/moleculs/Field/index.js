import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Input, Block } from 'UIKit'

const Error = styled(Block)`
  margin: 0.5rem 0 0;
`

const Wrapper = styled.div`
  margin-bottom: 1rem;
  input[type='checkbox'],
  input[type='radio'] {
    margin-right: 0.5rem;
  }
  label {
    vertical-align: middle;
  }
`

const Field = ({ error, name, invalid, type, id, ...props }) => {
  const inputProps = {
    id,
    name,
    type,
    invalid,
    'aria-describedby': `${name}Error`,
    ...props,
  }
  const renderInputFirst = type === 'checkbox' || type === 'radio'
  return (
    <Wrapper>
      {renderInputFirst && <Input {...inputProps} />}
      {renderInputFirst || <Input {...inputProps} />}
      {invalid && error && (
        <Error id={`${id}Error`} role="alert" palette="danger">
          {error}
        </Error>
      )}
    </Wrapper>
  )
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  invalid: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
}

Field.defaultProps = {
  type: 'text',
}

export default Field
