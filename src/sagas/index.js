import { fork, all } from "redux-saga/effects";

import { saga as initSaga } from "../modules/init";
import { saga as flistSaga } from "../modules/flist";
import { saga as flistSagaNew } from "../modules/newFlist";
import { saga as userSaga } from "../modules/user";
import { saga as onlineSaga } from "../modules/streetsOnline";
import { saga as archiveSaga } from "../modules/Archive";
import { saga as EventsSaga } from "../modules/events";
import { saga as sidemenuSaga } from "../modules/sidemenu";
import { saga as playerSaga } from "../modules/player";
import { saga as customGroupsModalSaga } from "../modules/customGroupsModal";
import { saga as customGroupsFlistSaga } from "../modules/customGroupsFlist";
import { saga as favouriteSaga } from "../modules/favourite";

export default function* rootSaga() {
  yield all([
    fork(initSaga),
    fork(userSaga),
    fork(flistSaga),
    fork(flistSagaNew),
    fork(onlineSaga),
    fork(archiveSaga),
    fork(EventsSaga),
    fork(sidemenuSaga),
    fork(playerSaga),
    fork(customGroupsModalSaga),
    fork(customGroupsFlistSaga),
    fork(favouriteSaga),
  ]);
}
