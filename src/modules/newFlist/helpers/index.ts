/**
 * Этот хелпер поможет хранить раздельно информацию о камерах и информацию о группах.
 *
 * @param currentCameras
 * @param currentGroups
 * @param rawGroup - то что внутри группы
 * @param parentId
 * @returns
 */
export const splitUserGroupsContentForRedux = (
  currentCameras: { [id: number]: CameraSchema },
  currentGroups: { [id in customGroupId]: GroupSchema },
  rawGroup: { [id: string]: CameraSchema | ContentSchema },
  parentId: number
) => {
  let cameras = { ...currentCameras };
  let groups = { ...currentGroups };

  const contentKeys = Object.keys(rawGroup);

  contentKeys.map((id: string) => {
    //Находим объект по id внутри группы
    const currentObj = rawGroup[id];
    const IDOfCurrentObj = rawGroup[id].ID;

    if (currentObj.OBJECT === "CAMERA") {
      cameras = Object.assign(cameras, {
        [IDOfCurrentObj]: currentObj,
      });
    } else if (currentObj.OBJECT === "GROUP") {
      groups = Object.assign(groups, {
        [IDOfCurrentObj]: {
          parentId,
          content: {
            ...currentObj,
          },
        },
      });
    }
  });

  return { cameras, groups };
};

/**
 *
 * Хелпер нужен для мержа новых групп в схему.
 * @param {} currentSchema
 * @param newGroup
 */
export const mergeGroupsContentById = (
  currentGroupsContentById: any,
  newGroup: ContentSchema,
  groupId: number,
  parentId: number
) => {
  let groupsContentById = { ...currentGroupsContentById };

  groupsContentById[groupId] = { parentId: parentId, content: newGroup };

  return groupsContentById;
};
