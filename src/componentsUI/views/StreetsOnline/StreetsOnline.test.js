import React from 'react'
import { Provider } from 'react-redux'

import { shallow, mount } from 'enzyme'
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'

import StreetsOnline from './StreetsOnline'

describe('fixme', () => {
  it('fixme', () => {
    expect(true).toBe(true)
  })
})

// const mockStore = configureStore([])

// describe('<StreetsOnline Connected React-Redux Component/>', () => {
//   let store
//let component;

//   beforeEach(() => {
//     store = mockStore({
//       currentSelectedCamerasProps: [
//         {
//           OBJECT: 'CAMERA',
//           ID: 962,
//           NAME: 'Артиллерийская - 1й Пятилетки',
//           HLS: '/live/cam962-master.m3u8',
//           REALTIME_HLS: '/live/cam957-realtime-master.m3u8',
//           ACCESS: {
//             LIVE: { REASON: '', STATUS: true },
//             ARCHIVE: { REASON: '', STATUS: true },
//             DOWNLOAD: { REASON: '', STATUS: true },
//             MOVEMENT: {
//               REASON: 'У Вас нет доступа в архив движений',
//               STATUS: true,
//             },
//           },
//           SNAPSHOT: {
//             HD: '/snapshots/cam962.jpg',
//             LOSSY: '/snapshots/cam962_lossy.jpg',
//           },
//           ARCHIVE: {
//             LINK:
//               '"archive/cam962.m3u8?START_TIME=29.10.2020+12:12&STOP_TIME=28.11.2020+12:12"',
//             START_TIME: '29.10.2020 12:12',
//             STOP_TIME: '28.11.2020 12:12',
//           },
//           ADDRESS: null,
//           COORDINATES: {
//             LONGITUDE: '61.435034',
//             LATITUDE: '55.168162',
//           },
//           PUBLICITY: false,
//         },
//         {
//           OBJECT: 'CAMERA',
//           ID: 101,
//           NAME: 'Коммуны - Энгельса',
//           HLS: '/live/cam101-master.m3u8',
//           REALTIME_HLS: '/live/cam101-realtime-master.m3u8',
//           ACCESS: {
//             LIVE: { REASON: '', STATUS: true },
//             ARCHIVE: { REASON: '', STATUS: true },
//             DOWNLOAD: { REASON: '', STATUS: true },
//             MOVEMENT: {
//               REASON: 'У Вас нет доступа в архив движений',
//               STATUS: true,
//             },
//           },
//           SNAPSHOT: {
//             HD: '/snapshots/cam101.jpg',
//             LOSSY: '/snapshots/cam101_lossy.jpg',
//           },
//           ARCHIVE: {
//             LINK:
//               'archive/cam101.m3u8?START_TIME=29.10.2020+12:12&STOP_TIME=28.11.2020+12:12',
//             START_TIME: '29.10.2020 12:12',
//             STOP_TIME: '28.11.2020 12:12',
//           },
//           ADDRESS: 'Челябинск, ул. Коммуны, д. 88, п. 4',
//           COORDINATES: {
//             LONGITUDE: '61.380977',
//             LATITUDE: '55.162283',
//           },
//           PUBLICITY: false,
//         },
//         {
//           OBJECT: 'CAMERA',
//           ID: 100,
//           NAME: 'Ленина - Энгельса',
//           HLS: '/live/cam100-master.m3u8',
//           REALTIME_HLS: '/live/cam100-realtime-master.m3u8',
//           ACCESS: {
//             LIVE: { REASON: '', STATUS: true },
//             ARCHIVE: { REASON: '', STATUS: true },
//             DOWNLOAD: { REASON: '', STATUS: true },
//             MOVEMENT: {
//               REASON: 'У Вас нет доступа в архив движений',
//               STATUS: true,
//             },
//           },
//           SNAPSHOT: {
//             HD: '/snapshots/cam100.jpg',
//             LOSSY: '/snapshots/cam100_lossy.jpg',
//           },
//           ARCHIVE: {
//             LINK:
//               'archive/cam100.m3u8?START_TIME=29.10.2020+12:12&STOP_TIME=28.11.2020+12:12',
//             START_TIME: '29.10.2020 12:12',
//             STOP_TIME: '28.11.2020 12:12',
//           },
//           ADDRESS: null,
//           COORDINATES: {
//             LONGITUDE: '61.381241',
//             LATITUDE: '55.159752',
//           },
//           PUBLICITY: false,
//         },
//       ],
//       currentView: 'FOUR_PANEL',
//       currentSortFunctionName: 'default',
//       currentShowSceletonState: true,
//       currentPlayngIds: [],
//       currentSortType: 'inc',
//       fullscreenMode: false,
//       calculatedNum: 3,
//       playAllState: false,
//       playStateIds: [],
//       hdAllStatus: false,
//     })
//   })(
//     (component = renderer.create(
//       <Provider store={store}>
//         <StreetsOnline />
//       </Provider>
//     ))
//   )

//   //TODO: Раскомменить только этот
//   it('should render with given state from Redux store', () => {
//     expect(component.toJSON()).toMatchSnapshot()
//   })

//   it('should dispatch an action on button click', () => {})

//   const wrap = (props = {}) => shallow(<StreetsOnline {...props} />)
//   const wrapMount = (props = {}) => mount(<StreetsOnline {...props} />)
//   it('Check that StreetsOnline should take a snapshot', () => {
//     const { asFragment } = render(<StreetsOnline />)
//     expect(asFragment(<StreetsOnline />).toMatchSnapshot())
//   })
// })
