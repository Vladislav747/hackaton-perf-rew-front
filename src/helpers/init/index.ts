/**
 * Выпарсить ID из объекта
 * @param obj
 */
export function parseIdsFromGroupContent(obj: any): number[] {
  let arr: number[] = [];

  for (let prop in obj) {
    if (obj[prop].OBJECT === "CAMERA") {
      arr.push(obj[prop].ID);
    }
  }

  return arr;
}
