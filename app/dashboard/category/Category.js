"use client"

import { useContext, useState, useEffect } from 'react';
import { CategoryContext } from "@/Context/CategoryProvider";

const CategoryForm = () => {
    const { categories, createCategory } = useContext(CategoryContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [parentCategories, setParentCategories] = useState([]); // Mevcut üst kategorileri tutmak için bir durum

    useEffect(() => {
        // Veritabanından mevcut kategorileri al
        setParentCategories(categories.filter(category => category.parentCategory === null));
    }, [categories]); // Kategoriler değiştiğinde useEffect çalışır

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCategory({ name, description, parentCategoryId });
            // Kategori başarıyla oluşturulduktan sonra formu temizle
            setName('');
            setDescription('');
            setParentCategoryId('');
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <form className="category-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Kategori Adı:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Açıklama:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="parentCategory">Üst Kategori:</label>
                <select
                    id="parentCategory"
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)}
                >
                    <option value="">-- Üst Kategori Seç --</option>
                    {parentCategories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="submit-button">Kategori Oluştur</button>
        </form>
    );
};

export default CategoryForm;
