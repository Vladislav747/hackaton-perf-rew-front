import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
// @ts-ignore-start
import { ifProp } from 'styled-tools'

const Block = styled.div`
    font-family: ${font('primary')};
    background-color: ${ifProp('opaque', palette(0, true), 'transparent')};
    color: ${palette({ grayscale: 1 }, 2)};
`

Block.propTypes = {
    palette: PropTypes.string,
    reverse: PropTypes.bool,
    opaque: PropTypes.bool
}

Block.defaultProps = {
    palette: 'grayscale'
}

export default Block
