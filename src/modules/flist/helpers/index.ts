import { getIdByObjectKey, getParentObjectKey } from "../schema";

export const validateActiveGroup = (activeGroup: string) => {
  if (!activeGroup) return false;
  try {
    const [parentObjectIdRaw, objectIdRaw] = activeGroup.split("_");
    const [parentObjectId, objectId] = [
      Number(parentObjectIdRaw),
      Number(objectIdRaw),
    ];
    return typeof parentObjectId == "number" && typeof objectId == "number";
  } catch (e) {
    return false;
  }
};

/**
 * Разпарсить из id типа _ только группы с доп проверкой на дубль
 *  и на то что эта группа уже не загружена в качестве текущей.
 * @deprecated
 * @param  {Array<string} cams  - список камер в виде id "родитель_id-камеры"
 * @param {string} currentGroup - id текущей группы
 */
export const parseGroups = (cams: Array<string>, currentGroup: string) => {
  const newGroups: Array<any> = [];
  cams.forEach((el: string) => {
    const groupOfCamera = getParentObjectKey(el);

    if (
      !newGroups.includes(groupOfCamera) &&
      getIdByObjectKey(currentGroup) !== groupOfCamera
    ) {
      newGroups.push(groupOfCamera);
    }
  });

  return newGroups;
};

/**
 * Разпарсить из id типа _ только камеры с доп проверкой на дубль
 *  и на то что эта группа уже не загружена в качестве текущей.
 * @param cams  - список камер в виде id "родитель_id-камеры"
 * @param activeObjectId - id текущей группы
 * @param returnNumber - Возвращать id в формате number (обычно string)
 */
export const parseCamsIds = (
  cams: Array<string>,
  returnNumber: Boolean = false
) => {
  const newCamsIds: Array<string | number> = [];
  cams.forEach((el: string) => {
    if (returnNumber) {
      newCamsIds.push(parseInt(getIdByObjectKey(el)));
    } else {
      newCamsIds.push(getIdByObjectKey(el));
    }
  });

  return newCamsIds;
};

export const createNewArrayWithoutLink = (arrayEl: Array<any>) => {
  return [...[], ...arrayEl];
};
