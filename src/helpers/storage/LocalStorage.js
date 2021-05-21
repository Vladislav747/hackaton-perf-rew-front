import IStorage from './IStorage'
import sendErrorToSentry from '../sentry'

class LocalStorage extends IStorage {
  /**
   * Получить  ключ из LS
   * @param  {string} key
   */
  get(key) {
    try {
      const res = localStorage.getItem(key)
      if (res) {
        return JSON.parse(res)
      }
      return res
    } catch (error) {
      //Очистить ключ в случае неудачи
      localStorage.setItem(key, '')
      sendErrorToSentry(`Ошибка получения ключа ${error}`)
    }
  }
  /**
   * Установить новый ключ в LS
   * @param  {string} key
   * @param  {mixed} data
   */
  set(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      sendErrorToSentry(`Error set data ${key} into storage ${e}`)
    }
  }
  /**
   * Удалить ключ
   * @param  {string} key
   */
  remove(key) {
    localStorage.removeItem(key)
  }
  /**
   *
   * Очистить весь localStorage с того сайта где вы находитесь
   */
  clear() {
    localStorage.clear()
  }
}

export default new LocalStorage()
