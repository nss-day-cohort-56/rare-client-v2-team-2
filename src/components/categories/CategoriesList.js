import { useState, useEffect } from "react"
import { getAllCategories, deleteCategory } from "../../managers/CategoryManager"
import { CategoryForm } from "./CategoryForm"

export const CategoriesList = () => {
  const [categories, setCategories] = useState([])
  const [editCategory, setEditCategory] = useState({ label: '' })

  const loadCategories = () => {
    getAllCategories().then(categoriesData => setCategories(categoriesData))
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleDelete = (categoryId) => {
    deleteCategory(categoryId).then(loadCategories)
  }

  return <section className="section">
    <div className="columns">
      <div className="column">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Categories</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map(category => (
                <tr key={category.id}>
                  <td>{category.label}</td>
                  <td>
                    <div className="buttons">
                      <button className="button is-warning" onClick={() => { setEditCategory(category) }}>edit</button>
                      <button className="button is-danger" onClick={() => { handleDelete(category.id) }}>delete</button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="column">
        <CategoryForm loadCategories={loadCategories} category={editCategory} setCategory={setEditCategory} />
      </div>
    </div>
  </section>
}
