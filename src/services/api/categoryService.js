import categoriesData from '@/services/mockData/categories.json'

let categories = [...categoriesData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const categoryService = {
  async getAll() {
    await delay(200)
    return [...categories]
  },

  async getById(id) {
    await delay(150)
    const category = categories.find(cat => cat.Id === parseInt(id))
    return category ? { ...category } : null
  },

  async create(categoryData) {
    await delay(300)
    const newCategory = {
      ...categoryData,
      Id: Math.max(...categories.map(c => c.Id)) + 1,
      taskCount: 0
    }
    categories.push(newCategory)
    return { ...newCategory }
  },

  async update(id, updates) {
    await delay(250)
    const index = categories.findIndex(cat => cat.Id === parseInt(id))
    if (index !== -1) {
      categories[index] = {
        ...categories[index],
        ...updates
      }
      return { ...categories[index] }
    }
    return null
  },

  async delete(id) {
    await delay(200)
    const index = categories.findIndex(cat => cat.Id === parseInt(id))
    if (index !== -1) {
      const deletedCategory = categories.splice(index, 1)[0]
      return { ...deletedCategory }
    }
    return null
  },

  async updateTaskCount(id, count) {
    await delay(100)
    const index = categories.findIndex(cat => cat.Id === parseInt(id))
    if (index !== -1) {
      categories[index] = {
        ...categories[index],
        taskCount: count
      }
      return { ...categories[index] }
    }
    return null
  }
}