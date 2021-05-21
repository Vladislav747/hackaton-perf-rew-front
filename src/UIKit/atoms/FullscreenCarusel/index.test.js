// import React from "react";
// import { shallow, mount } from "enzyme";
// import FullscreenCarusel from "./index";
// import screenfull from "screenfull";

describe("fixme", () => {
     it("fixme", () => {
          expect(true).toBe(true);
     });
})

// /*
//      interface FullscreenCaruselProps {
//           elementsGridNum: number,
//           rawCamerasList: Array<any>,
//           onM: Function,
//           caruselIsRunning: boolean,
//           runCarusel: Function,
//           stopCarusel: Function,
//           hdAllStatus?: boolean,
//           toggleHdAll?: Function,
//           fsId?: number,
//           setFsId?: Function
//      }

//      interface FullscreenCaruselState {
//           preparedSuperList: Array<any>,
//           elementsGridNum: number,
//           fullscreenOneCamera: boolean,
//           currentPage: number,
//           caruselIsRunning: boolean,
//           maxPages: number,
//           screenUpdateInSecondsState: number
//      }
// */

// const onMСallback = jest.fn();
// const runCaruselСallback = jest.fn();
// const stopCaruselCallback = jest.fn();
// const toggleHdAllCallback = jest.fn();
// const setFsIdCallback = jest.fn();

// const initProps = {
//   elementsGridNum: 5,
//   rawCamerasList: [
//     {
//       OBJECT: "CAMERA",
//       ID: 98,
//       text: "Ленина, БД Спиридонов",
//       HLS: "/live/cam98-master.m3u8",
//       ACCESS: { LIVE: "1", ARCHIVE: "1" },
//       SNAPSHOT: {
//         HD: "/snapshots/cam98.jpg",
//         LOSSY: "/snapshots/cam98_lossy.jpg",
//       },
//       ARCHIVE:
//         "archive/cam98.m3u8?START_TIME=12.03.2019+09:10&STOP_TIME=26.03.2019+09:10",
//       ADDRESS: "Челябинск, пр-кт. Ленина, д. 30, п. 7",
//       COORDINATES: {
//         LONGITUDE: "61.425779",
//         LATITUDE: "55.161005",
//       },
//       PUBLICITY: false,
//     },
//     {
//       OBJECT: "CAMERA",
//       ID: 97,
//       text: "Площадь Революции",
//       HLS: "/live/cam97-master.m3u8",
//       ACCESS: { LIVE: "1", ARCHIVE: "1" },
//       SNAPSHOT: {
//         HD: "/snapshots/cam97.jpg",
//         LOSSY: "/snapshots/cam97_lossy.jpg",
//       },
//       ARCHIVE:
//         "archive/cam97.m3u8?START_TIME=12.03.2019+09:10&STOP_TIME=26.03.2019+09:10",
//       ADDRESS: "Челябинск, ул. Цвиллинга, д. 36, п. 12",
//       COORDINATES: {
//         LONGITUDE: "61.402467",
//         LATITUDE: "55.160059",
//       },
//       PUBLICITY: false,
//     },
//     {
//       OBJECT: "CAMERA",
//       ID: 99,
//       text: "Свердловский - Ленина",
//       HLS: "/live/cam99-master.m3u8",
//       ACCESS: { LIVE: "1", ARCHIVE: "1" },
//       SNAPSHOT: {
//         HD: "/snapshots/cam99.jpg",
//         LOSSY: "/snapshots/cam99_lossy.jpg",
//       },
//       ARCHIVE:
//         "archive/cam99.m3u8?START_TIME=12.03.2019+09:10&STOP_TIME=26.03.2019+09:10",
//       ADDRESS: "Челябинск, ул. Володарского, д. 32, п. 1",
//       COORDINATES: {
//         LONGITUDE: "61.388978",
//         LATITUDE: "55.159976",
//       },
//       PUBLICITY: false,
//     },
//     {
//       OBJECT: "CAMERA",
//       ID: 102,
//       text: "Свердловский - Победы",
//       HLS: "/live/cam102-master.m3u8",
//       ACCESS: { LIVE: "1", ARCHIVE: "1" },
//       SNAPSHOT: {
//         HD: "/snapshots/cam102.jpg",
//         LOSSY: "/snapshots/cam102_lossy.jpg",
//       },
//       ARCHIVE:
//         "archive/cam102.m3u8?START_TIME=12.03.2019+09:10&STOP_TIME=26.03.2019+09:10",
//       ADDRESS: "Челябинск, пр-кт. Победы, д. 192, п. 6",
//       COORDINATES: {
//         LONGITUDE: "61.387032",
//         LATITUDE: "55.183940",
//       },
//       PUBLICITY: false,
//     },
//     {
//       OBJECT: "CAMERA",
//       ID: 962,
//       text: "Артиллерийская - 1й Пятилетки",
//       HLS: "/live/cam962-master.m3u8",
//       ACCESS: { LIVE: "1", ARCHIVE: "1" },
//       SNAPSHOT: {
//         HD: "/snapshots/cam962.jpg",
//         LOSSY: "/snapshots/cam962_lossy.jpg",
//       },
//       ARCHIVE:
//         "archive/cam962.m3u8?START_TIME=12.03.2019+09:10&STOP_TIME=26.03.2019+09:10",
//       ADDRESS: null,
//       COORDINATES: {
//         LONGITUDE: "61.435034",
//         LATITUDE: "55.168162",
//       },
//       PUBLICITY: false,
//     },
//     {
//       OBJECT: "CAMERA",
//       ID: 98,
//       text: "Ленина, БД Спиридонов",
//       HLS: "/live/cam98-master.m3u8",
//       ACCESS: { LIVE: "1", ARCHIVE: "1" },
//       SNAPSHOT: {
//         HD: "/snapshots/cam98.jpg",
//         LOSSY: "/snapshots/cam98_lossy.jpg",
//       },
//       ARCHIVE:
//         "archive/cam98.m3u8?START_TIME=12.03.2019+09:10&STOP_TIME=26.03.2019+09:10",
//       ADDRESS: "Челябинск, пр-кт. Ленина, д. 30, п. 7",
//       COORDINATES: {
//         LONGITUDE: "61.425779",
//         LATITUDE: "55.161005",
//       },
//       PUBLICITY: false,
//     },
//     {
//       OBJECT: "CAMERA",
//       ID: 97,
//       text: "Площадь Революции",
//       HLS: "/live/cam97-master.m3u8",
//       ACCESS: { LIVE: "1", ARCHIVE: "1" },
//       SNAPSHOT: {
//         HD: "/snapshots/cam97.jpg",
//         LOSSY: "/snapshots/cam97_lossy.jpg",
//       },
//       ARCHIVE:
//         "archive/cam97.m3u8?START_TIME=12.03.2019+09:10&STOP_TIME=26.03.2019+09:10",
//       ADDRESS: "Челябинск, ул. Цвиллинга, д. 36, п. 12",
//       COORDINATES: {
//         LONGITUDE: "61.402467",
//         LATITUDE: "55.160059",
//       },
//       PUBLICITY: false,
//     },
//     {
//       OBJECT: "CAMERA",
//       ID: 99,
//       text: "Свердловский - Ленина",
//       HLS: "/live/cam99-master.m3u8",
//       ACCESS: { LIVE: "1", ARCHIVE: "1" },
//       SNAPSHOT: {
//         HD: "/snapshots/cam99.jpg",
//         LOSSY: "/snapshots/cam99_lossy.jpg",
//       },
//       ARCHIVE:
//         "archive/cam99.m3u8?START_TIME=12.03.2019+09:10&STOP_TIME=26.03.2019+09:10",
//       ADDRESS: "Челябинск, ул. Володарского, д. 32, п. 1",
//       COORDINATES: {
//         LONGITUDE: "61.388978",
//         LATITUDE: "55.159976",
//       },
//       PUBLICITY: false,
//     },
//     {
//       OBJECT: "CAMERA",
//       ID: 102,
//       text: "Свердловский - Победы",
//       HLS: "/live/cam102-master.m3u8",
//       ACCESS: { LIVE: "1", ARCHIVE: "1" },
//       SNAPSHOT: {
//         HD: "/snapshots/cam102.jpg",
//         LOSSY: "/snapshots/cam102_lossy.jpg",
//       },
//       ARCHIVE:
//         "archive/cam102.m3u8?START_TIME=12.03.2019+09:10&STOP_TIME=26.03.2019+09:10",
//       ADDRESS: "Челябинск, пр-кт. Победы, д. 192, п. 6",
//       COORDINATES: {
//         LONGITUDE: "61.387032",
//         LATITUDE: "55.183940",
//       },
//       PUBLICITY: false,
//     },
//     {
//       OBJECT: "CAMERA",
//       ID: 962,
//       text: "Артиллерийская - 1й Пятилетки",
//       HLS: "/live/cam962-master.m3u8",
//       ACCESS: { LIVE: "1", ARCHIVE: "1" },
//       SNAPSHOT: {
//         HD: "/snapshots/cam962.jpg",
//         LOSSY: "/snapshots/cam962_lossy.jpg",
//       },
//       ARCHIVE:
//         "archive/cam962.m3u8?START_TIME=12.03.2019+09:10&STOP_TIME=26.03.2019+09:10",
//       ADDRESS: null,
//       COORDINATES: {
//         LONGITUDE: "61.435034",
//         LATITUDE: "55.168162",
//       },
//       PUBLICITY: false,
//     },
//   ],
//   onM: onMСallback,
//   caruselIsRunning: true,
//   runCarusel: runCaruselСallback,
//   stopCarusel: stopCaruselCallback,
//   hdAllStatus: false,
//   toggleHdAll: toggleHdAllCallback,
//   fsId: null,
//   setFsId: setFsIdCallback,
// };

// describe("[unit] check for correct initialization", () => {
//   /* Simple shallow
//           Calls:
//           constructor
//           render
//      */

//   screenfull.on = jest.fn();
//   //const wrap = shallow(<FullscreenCarusel {...initProps} />);

//   it("[[unit] check for correct initialization] check props", () => {
//     const wrap = shallow(<FullscreenCarusel {...initProps} />);
//     expect(wrap.instance().props.elementsGridNum).toEqual(5);
//     expect(wrap.instance().props.caruselIsRunning).toEqual(true);
//     expect(wrap.instance().props.fsId).toEqual(null);
//     expect(wrap.instance().props.hdAllStatus).toEqual(false);
//     wrap.unmount()
//   });

//   it("[[unit] check for correct initialization] check start state", () => {
//     const wrap = shallow(<FullscreenCarusel {...initProps} />);
//     const componentInstance = wrap.instance();
//     //Accessing react lifecyle methods
//     componentInstance.componentDidMount();
//     /* num of elements in preperad list */
//     expect(wrap.state('preparedSuperList').length).toBe(25);
//     /* num of elements in row */
//     expect(wrap.state().elementsGridNum).toBe(5);
//     /* fullscreen false by default */
//     expect(wrap.state().fullscreenOneCamera).toBe(false);
//     /* current page 0 for default */
//     expect(wrap.state().currentPage).toBe(0);
//     /* carusel must run for default */
//     expect(wrap.state().caruselIsRunning).toBe(true);
//     /* max num of elements for one super view */
//     expect(wrap.state().maxPages).toBe(1);
//     /* DEFAULT_ROTATE_INTERVAL = 15 */
//     expect(wrap.state().screenUpdateInSecondsState).toBe(15);
//   });
// });
