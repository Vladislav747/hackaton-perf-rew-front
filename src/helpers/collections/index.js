/**
 * Преобразовать исходный объект добавив туда определенные данные
 * @param {object} object
 * @param {*} item
 * @param {string} item
 */
export const mapObjectWithProperty = (object, item, idKey = "id") => {
  //TODO: Такое условие вообще возможно для этой ф-ции в рамках ее функциональности
  //при том что в item обычно прилетают объекты...
  if (Array.isArray(item)) {
    for (let i = 0; i < item.length; i++) {
      object = mapObjectWithProperty(object, item[i]);
    }
    return object;
  }
  if (object && object.byId) {
    const curObject = object.byId[item[idKey]] || {};
    object.byId[item[idKey]] = { ...curObject, ...item };
    if (object.allIds && !object.allIds.includes(item[idKey])) {
      object.allIds.push(item[idKey]);
    }
  }
  return object;
};

/**
 * Фильтровать объекты по id
 * Убрать id элементы или элемент из объекта object
 * @param {object} object
 * @param {array | string} id - массив уже найденных ранее элементов
 */
export const filterElementsFromObject = (object, id) => {
  /*
    Проверяем что id найденных элементов это массив
    Если это массив то проделываем эту функцию для каждого элемента
  */
  if (Array.isArray(id)) {
    for (let i = 0; i < id.length; i++) {
      object = filterElementsFromObject(object, id[i]);
    }
    return object;
  }
  /*
    В нашем случае object это objectsState из store
    Проверяем его наличие и наличия свойства byId у объекта 
    и что наш id содержится в свойстве byId объекта store
    то мы УДАЛЯЕМ этот id в свойстве byId 
  */
  if (object && object.byId && object?.byId[id]) {
    delete object.byId[id];
  }
  /*
    В нашем случае object это objectsState из store
    Проверяем его наличие и наличия свойства allIds у объекта 
    и что object.allIds это массив

  */
  if (object && object.allIds && Array.isArray(object?.allIds)) {
    /*
     * Убираем элемент из массива данных
     */
    object.allIds = object.allIds.filter(item => item !== id);
  }
  return object;
};
