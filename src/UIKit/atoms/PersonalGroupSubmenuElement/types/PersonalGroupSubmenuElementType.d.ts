interface PersonalGroupSubmenuElementProps {
    element: any;
    deletePersonalGroupForUser: (string) => void;
    openEditGroupModal: (boolean) => void;
    openEditMode: ( number) => void;
    activeGroup: number;
    setActivePersonalGroup: (number) => void;
}
