// context/CategoryProvider.js
"use client"
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    // Yalnızca üst kategorileri getiren fonksiyon
    const fetchCategories = async () => {
        try {
            const response = await axios.get("/api/categories/top"); // Yalnızca üst kategorileri getir
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Yeni kategori oluşturmayı sağlayan fonksiyon
    const createCategory = async (newCategory) => {
        try {
            const response = await axios.post("/api/categories", newCategory);
            // Yeni kategori eklendikten sonra tüm kategorileri yeniden getir
            fetchCategories();
            return response.data; // Oluşturulan kategori verisini döndür
        } catch (error) {
            console.error("Error creating category:", error);
            throw error; // Hata durumunda hatayı fırlat
        }
    };

    useEffect(() => {
        fetchCategories(); // Sayfa yüklendiğinde tüm kategorileri getir
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, createCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;
