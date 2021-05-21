import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Atom = styled.span`
    font-family: ${font('primary')};
    color: ${palette({ grayscale: 1 }, 2)};
`

Atom.propTypes = {
    palette: PropTypes.string,
    reverse: PropTypes.bool
}

Atom.defaultProps = {
    palette: 'grayscale'
}

Atom.displayName = 'Atom'

export default Atom
