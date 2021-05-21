import React from 'react'
import styled, {keyframes} from 'styled-components'

import { ReactComponent as GearIcon } from '../../../assets/svgs/streetsOnline/RawSvg/gear.svg'
import { ReactComponent as NetworkIcon } from '../../../assets/svgs/streetsOnline/RawSvg/network.svg'
import { ReactComponent as HeartIcon } from '../../../assets/svgs/streetsOnline/RawSvg/heart.svg'
import { any } from 'prop-types'

interface HeaderWithMenuProps {
    selected: boolean
}

const HeaderWithMenu = styled.div<HeaderWithMenuProps>`
    padding-left: 1em;
    padding-right: 1em;
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px 10px 0 0;
    width: 100%;
    height: 100%;
    background-color: ${(props: any) => { return props.selected ? "blue" : '#333333'}};
`
const NameContainer = styled.div`
    font-weight: bold;
    color: white;
    overflow: hidden;
    white-space: nowrap;
`
const InterfaceContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`

const InterfaceIcon = styled.i`
    display: flex;
    font-weight: bold;
    font-size: 1.5em;
    width: 100%;
    height: 100%;
    color: white;
    align-items: center;
    justify-content: center;
    margin: 0.5em;
`

const Wrapper = styled.span`
    display: inline-block;
    width: 1em;
    height: 1em;
    margin: 0.5em;
    box-sizing: border-box;
    font-weight: bold;
    color: white;
    cursor: pointer;
    & > svg {
        width: 100%;
        height: 100%;
        fill: currentcolor;
        stroke: none;
    }
`


const CameraHeadMenu = (props: any) => {
    const { width, height, type, selected, cameraName } = props
    return (<div style={{display: 'flex', flex: '1 1 auto', maxWidth: '100%'}}>
            <HeaderWithMenu selected={selected}>

                <NameContainer>
                    {cameraName}
                </NameContainer>
                
                <InterfaceContainer>
                   {
                        (() => {
                            switch(type) {
                                case 'archive':
                                    return [
                                            /*<Wrapper id="0">
                                                <NetworkIcon/>
                                            </Wrapper>, 

                                            <Wrapper id="1">
                                                <HeartIcon/>
                                            </Wrapper>,

                                            <Wrapper id="2">
                                                <GearIcon/>
                                            </Wrapper>*/
                                        ]
                                    break;
                                case 'online':
                                    break;
                                default: 
                                    return '';
                            }
                        })()
                    } 
                </InterfaceContainer>
                
            </HeaderWithMenu>
        </div>)

}

export default CameraHeadMenu