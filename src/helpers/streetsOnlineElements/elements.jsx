import React, {useEffect, useState}  from 'react'
import styled, {keyframes} from 'styled-components'


const MoveFrame = keyframes`
    from { margin-left:0%; } to { margin-left:-50%; }
`

const RunningTextContainer = styled.a`
    white-space: nowrap;
    animation: 5s linear 0s infinite normal ${MoveFrame};
    overflow: hidden;
    white-space: nowrap;
`

const TextContainerWithoutOverflow = styled.a`
    overflow: hidden;
    white-space: nowrap;
`


export function OverflowTextRow (props) {

    const [isOverflow, setIsOverflow] = useState(false);
    useEffect(() => {
        const element = document.getElementById(`running_text_${props.id}`)
        setIsOverflow(element.scrollWidth > element.clientWidth)
    })
    
    return isOverflow ? <RunningTextContainer id={`running_text_${props.id}`}>{props.text}</RunningTextContainer>
     : <TextContainerWithoutOverflow id={`running_text_${props.id}`}>{props.text}</TextContainerWithoutOverflow>;
}
    
