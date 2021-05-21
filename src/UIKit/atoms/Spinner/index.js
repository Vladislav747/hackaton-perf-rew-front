import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { palette } from 'styled-theme'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Spinner = styled.div`
    position: relative;
    border: 3.2px solid ${palette('grayscale', 1, true)};
    border-bottom-color: ${palette(1)};
    border-radius: 50%;
    box-sizing: border-box;
    margin: 0 auto;
    width: 24px;
    height: 24px;
    animation: ${spin} 1s linear infinite;
`

Spinner.propTypes = {
    palette: PropTypes.string,
    reverse: PropTypes.bool
}

Spinner.defaultProps = {
    palette: 'primary'
}

export default Spinner
