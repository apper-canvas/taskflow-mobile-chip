import tasksData from '@/services/mockData/tasks.json'

let tasks = [...tasksData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(300)
    return [...tasks]
  },

  async getById(id) {
    await delay(200)
    const task = tasks.find(task => task.Id === parseInt(id))
    return task ? { ...task } : null
  },

  async create(taskData) {
    await delay(400)
    const newTask = {
      ...taskData,
      Id: Math.max(...tasks.map(t => t.Id)) + 1,
      completed: false,
      completedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, updates) {
    await delay(300)
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index !== -1) {
      tasks[index] = {
        ...tasks[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      return { ...tasks[index] }
    }
    return null
  },

  async delete(id) {
    await delay(200)
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index !== -1) {
      const deletedTask = tasks.splice(index, 1)[0]
      return { ...deletedTask }
    }
    return null
  },

  async toggleComplete(id) {
    await delay(200)
    const index = tasks.findIndex(task => task.Id === parseInt(id))
    if (index !== -1) {
      tasks[index] = {
        ...tasks[index],
        completed: !tasks[index].completed,
        completedAt: !tasks[index].completed ? new Date().toISOString() : null,
        updatedAt: new Date().toISOString()
      }
      return { ...tasks[index] }
    }
    return null
  },

  async getByCategory(categoryId) {
    await delay(250)
    return tasks.filter(task => task.categoryId === parseInt(categoryId)).map(task => ({ ...task }))
  },

  async getToday() {
    await delay(200)
    const today = new Date().toISOString().split('T')[0]
    return tasks.filter(task => task.dueDate === today && !task.completed).map(task => ({ ...task }))
  },

  async getUpcoming() {
    await delay(200)
    const today = new Date().toISOString().split('T')[0]
    return tasks.filter(task => task.dueDate && task.dueDate > today && !task.completed).map(task => ({ ...task }))
  },

  async getOverdue() {
    await delay(200)
    const today = new Date().toISOString().split('T')[0]
    return tasks.filter(task => task.dueDate && task.dueDate < today && !task.completed).map(task => ({ ...task }))
  },

  async getCompleted() {
    await delay(200)
    return tasks.filter(task => task.completed).map(task => ({ ...task }))
  },

  async search(query) {
    await delay(150)
    const lowercaseQuery = query.toLowerCase()
    return tasks.filter(task => 
      task.title.toLowerCase().includes(lowercaseQuery) ||
      task.description.toLowerCase().includes(lowercaseQuery)
    ).map(task => ({ ...task }))
  }
}