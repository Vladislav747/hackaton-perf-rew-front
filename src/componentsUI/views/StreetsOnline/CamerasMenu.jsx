import React from 'react'
import CamerasGrid from './CamerasGrid'
import FilterBar from './FilterBar'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CamerasListWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const CamerasList = () => 
        <CamerasListWrapper>
            <FilterBar />
            <CamerasGrid />
        </CamerasListWrapper>


CamerasList.propTypes = {}

CamsFunctionalList.displayName = 'CamerasList'

export default CamerasList
