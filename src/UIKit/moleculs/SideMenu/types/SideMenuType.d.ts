interface SideMenuProps {
  optionsForStreetsMenu: Array<optionForStreetMenu>;
  chooseCity: Function;
  showExtendedSidebarStatus: boolean;
  setExtendedSidebarStatus: Function;
  openAddGroupModal: (boolean) => void;
  personalGroups: Array;
  deletePersonalGroupForUser: (string) => void;
  openEditGroupModal: (boolean) => void;
  openEditMode: (number) => void;
  activeGroup: number;
  setActivePersonalGroup: (number) => void;
  showExtendedSubMenuCustomGroupsStatus: boolean;
  showExtendedSubMenuStreetsStatus: boolean;
  setSubmenuCustomGroupsStatus: (boolean) => void;
  setSubmenuStreetsStatus: (boolean) => void;
  chooseFavourites: () => void;
}

type optionForStreetMenu = {
  id: string;
  name: string;
};

type showSubMenuHandlerType = "streets" | "video" | "customGroups";
