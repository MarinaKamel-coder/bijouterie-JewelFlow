import { useEffect, useState } from 'react'
import JewelModal from './components/JewelModal'
import './App.css'

function App() {
  const [jewels, setJewels] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [currentJewel, setCurrentJewel] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMaterial, setFilterMaterial] = useState("Tous")
  const [filterType, setFilterType] = useState("Tous")
  const [loading, setLoading] = useState(true)

  const API = ""; // Proxy géré par Nginx vers /api

  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = () => {
    setLoading(true)
    fetch(`${API}/api/items`)
      .then(res => res.json())
      .then(data => {
        setJewels(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  const handleSave = (data) => {
    const method = data._id ? 'PUT' : 'POST'
    const url = data._id ? `${API}/api/items/${data._id}` : `${API}/api/items`

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
      refreshData()
      setModalOpen(false)
    })
  }

  const deleteJewel = (id) => {
    if(window.confirm("Supprimer ce bijou de l'inventaire ?")) {
      fetch(`${API}/api/items/${id}`, { method: 'DELETE' })
      .then(() => setJewels(jewels.filter(j => j._id !== id)))
    }
  }



  // --- Calculs et Filtres Croisés ---
  const filteredJewels = jewels.filter(j => {
    const matchesSearch = j.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMaterial = filterMaterial === "Tous" || j.material === filterMaterial
    const matchesType = filterType === "Tous" || j.type === filterType
    return matchesSearch && matchesMaterial && matchesType
  })

  const totalValue = filteredJewels.reduce((sum, j) => sum + (Number(j.price) || 0), 0)

  return (
    <div className="dashboard">
      <nav className="side-nav">
        <div className="logo">💎 JewelFlow</div>
        <div className="nav-stats">
          <div className="stat-card">
            <span>Articles affichés</span>
            <strong>{filteredJewels.length}</strong>
          </div>
          <div className="stat-card">
            <span>Valeur (Filtre)</span>
            <strong>{totalValue.toLocaleString()} $</strong>
          </div>
        </div>
        <button className="add-main-btn" onClick={() => { setCurrentJewel(null); setModalOpen(true); }}>
          + Nouveau Bijou
        </button>
      </nav>

      <main className="content">
        <header className="content-header">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Rechercher un bijou..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filters">
            {/* Filtre Type */}
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="Tous">Tous les types</option>
              <option value="Bague">Bagues</option>
              <option value="Collier">Colliers</option>
              <option value="Bracelet">Bracelets</option>
              <option value="Boucles">Boucles</option>
            </select>

            {/* Filtre Matériau */}
            <select value={filterMaterial} onChange={(e) => setFilterMaterial(e.target.value)}>
              <option value="Tous">Tous les matériaux</option>
              <option value="Or">Or</option>
              <option value="Argent">Argent</option>
              <option value="Platine">Platine</option>
              <option value="Diamant">Diamant</option>
            </select>
          </div>
        </header>

        {loading ? (
          <div className="loader">Chargement de la collection de luxe...</div>
        ) : (
          <div className="jewel-grid">
            {filteredJewels.map(j => (
              <div key={j._id} className="jewel-card">
                <div className="card-img">
                  <img src={j.imageUrl} alt={j.name} />
                  <span className="type-badge">{j.type}</span>
                </div>
                <div className="card-info">
                  <h3>{j.name}</h3>
                  <span className={`material-tag tag-${j.material?.toLowerCase()}`}>
                    {j.material}
                  </span>
                  <div className="card-footer">
                    <span className="price">{j.price?.toLocaleString()} $</span>
                    <div className="actions">
                      <button className="edit-btn" onClick={() => { setCurrentJewel(j); setModalOpen(true); }}>✏️</button>
                      <button className="delete-btn" onClick={() => deleteJewel(j._id)}>🗑️</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredJewels.length === 0 && (
              <div className="no-results">Aucun bijou ne correspond à vos critères.</div>
            )}
          </div>
        )}
      </main>

      <JewelModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onSave={handleSave} 
        item={currentJewel}
      />
    </div>
  )
}

export default App