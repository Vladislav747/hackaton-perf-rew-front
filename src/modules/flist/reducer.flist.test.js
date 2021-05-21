import { actionTypes } from "./actions";
import reducer from "./reducer";
import { StateSchema } from "./schema";

describe("Тестирование flist reducer", () => {
  test("CHANGE_SEARCH_STRING action вызов с каким то текстом", async () => {
    const searchStringPayload = "стр";
    const action = {
      type: actionTypes.CHANGE_SEARCH_STRING,
      payload: {
        searchString: searchStringPayload,
      },
    };

    expect(reducer(StateSchema, action)).toEqual({
      ...StateSchema,
      searchString: searchStringPayload,
    });
  });

  test("GET_GROUP_START action вызов", async () => {
    const action = {
      type: actionTypes.GET_GROUP_START,
    };

    expect(reducer(StateSchema, action)).toEqual({
      ...StateSchema,
      isLoading: true,
    });
  });

  test("GET_GROUP_ERROR action вызов", async () => {
    const action = {
      type: actionTypes.GET_GROUP_ERROR,
    };

    expect(reducer(StateSchema, action)).toEqual({
      ...StateSchema,
      isLoading: false,
    });
  });

  test("GET_LIMITED_INFO_ERROR action вызов", async () => {
    const failedLimitedIdsPayload = ["0_16"];
    const action = {
      type: actionTypes.GET_LIMITED_INFO_ERROR,
      payload: {
        failedLimitedIds: failedLimitedIdsPayload,
      },
    };

    expect(reducer(StateSchema, action)).toEqual({
      ...StateSchema,
      failedLimitedIds: failedLimitedIdsPayload,
      loadingLimitedIds: [],
      loadingLimitedIdsForSelect: [],
    });
  });
});
