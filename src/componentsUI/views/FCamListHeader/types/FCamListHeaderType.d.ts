interface FCamListHeaderProps {
  name: string;
  id: string;
  parentGroupId: string;
  isSelectable: boolean;
  fullSelectedGroups: boolean;
  setActiveGroupId: (any) => void;
  toggleSelected: Function;
  cleanAll: Function;
}
