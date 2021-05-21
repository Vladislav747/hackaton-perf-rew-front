/**
 * Проверка что объект не пустой
 * @param {object} data
 */
export const checkIsObjEmpty = function(data: object): boolean {
  return Object.keys(data).length === 0;
};

/**
 * Валидация строка имеет вид который нам нужен
 * @param {string} str - строка для
 * @param {object} regExpToMatch - RegExp паттерн
 */
export const validateStrForLs = function(
  str: string,
  regExpToMatch: any = new RegExp(
    "^[0-9]{1,10}_[0-9]{1,10}$|[0-9]{1,10}_[a-z]{1,10}$"
  )
): boolean {
  return regExpToMatch.test(str);
};

/**
 * Создать объект из массива
 * @param {Array} arr - массив
 */
export const createObjFromArr = function(arr: Array<any>): Object {
  const obj: any = {};

  for (let i = 0; i < arr.length; i++) {
    obj[i] = arr[i];
  }

  return obj;
};

/**
 * Создать массив из объекта
 * @param {Object} obj - объект
 */
export const createArrFromObj = function(obj: any): any[] {
  const arr: Array<any> = [];

  for (let prop in obj) {
    arr.push(obj[prop]);
  }

  return arr;
};
