export const StateSchema: NewFlistSchema = {
  selectedCamerasIds: [],
  // По умолчанию 16 - корень улиц онлайн.
  currentSelectedGroupId: 16,
  groupsContentById: {},
  groups: {
    0: {
      parentId: null,
      content: { OBJECT: "GROUP", ID: 0, NAME: "Выбрать камеру" },
    },
    16: {
      parentId: 0,
      content: { OBJECT: "GROUP", ID: 16, NAME: "Все улицы онлайн" },
    },
    239: {
      parentId: 16,
      content: { OBJECT: "GROUP", ID: 239, NAME: "Челябинск" },
    },
  },
  cameras: {},
  isLoading: false,
  rootIsLoaded: false,
  loadFailed: false,
  isInit: false,
  searchString: "",
};
