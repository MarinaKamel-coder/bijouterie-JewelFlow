import React, { useState, useEffect } from 'react';


const JewelModal = ({ isOpen, onClose, onSave, item }) => {
    const initialState = {
        name: '',
        price: '',
        type: 'Bague',
        material: 'Or',
        imageUrl: '',
        stock: 1
    };

    const [formData, setFormData] = useState(initialState);

    // Initialisation si on est en mode édition
    useEffect(() => {
        if (item) {
            setFormData(item);
        } else {
            setFormData(initialState);
        }
    }, [item, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Images par défaut si l'URL est vide pour rester "joli"
        const defaultImages = {
            "Bague": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop",
            "Collier": "https://images.unsplash.com/photo-1599643477877-537ef527848f?w=400&h=300&fit=crop",
            "Bracelet": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop",
            "Boucles": "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400&h=300&fit=crop"
        };

        const finalData = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
            imageUrl: formData.imageUrl || defaultImages[formData.type]
        };

        onSave(finalData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{item ? 'Modifier le Bijou' : 'Ajouter un Nouveau Bijou'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nom du modèle</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ex: Alliance Royale"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Type</label>
                            <select name="type" value={formData.type} onChange={handleChange}>
                                <option value="Bague">Bague</option>
                                <option value="Collier">Collier</option>
                                <option value="Bracelet">Bracelet</option>
                                <option value="Boucles">Boucles</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Matériau</label>
                            <select name="material" value={formData.material} onChange={handleChange}>
                                <option value="Or">Or</option>
                                <option value="Argent">Argent</option>
                                <option value="Platine">Platine</option>
                                <option value="Diamant">Diamant</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Prix ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>URL de l'image (optionnel)</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="Laissez vide pour l'image par défaut"
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Annuler
                        </button>
                        <button type="submit" className="btn-save">
                            {item ? 'Mettre à jour' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JewelModal;