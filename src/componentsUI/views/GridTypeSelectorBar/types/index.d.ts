interface GridTypeSelectorBarProps {
     currentGridType: string,
     setCalculatedNum: Function,
     calculatedNum: number,
     onSelectView: Function
}

interface ViewSelectorContainerProps {
     active: boolean,
     displayReady: boolean,
     ref?: any,
     falloutMenu? : boolean
}