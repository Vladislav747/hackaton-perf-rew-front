class IStorage {
  get(key) {
    throw new TypeError('Must override method')
  }
  set(data, key) {
    throw new TypeError('Must override method')
  }
  remove(key, data) {
    throw new TypeError('Must override method')
  }
}

export default IStorage
