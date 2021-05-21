import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ModalContext } from '../../../componentsUI/views/StreetsOnline/StreetsOnline'
import ModalFlexableArchive from './index'
import ArchiveVideoBar from '../ArchiveVideoBar'

storiesOf('UIKit/moleculs/ModalFlexableArchive', module)
    .add('without events', () => (
        <ModalFlexableArchive ModalContext={ModalContext}>
            {{
                VideoBox: <ArchiveVideoBar />
            }}
        </ModalFlexableArchive>
    ))
    .add('with events', () => (
        <ModalFlexableArchive ModalContext={ModalContext}>
            {{
                VideoBox: <ArchiveVideoBar />,
                EventsBox: <>2</>
            }}
        </ModalFlexableArchive>
    ))
