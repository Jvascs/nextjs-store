// Yeni bir kategori oluşturan bir controller fonksiyonu
export const POST = async (req) => {
    try {
        await connectDB(); // Veritabanı bağlantısını başlatın
        const categoryData = await req.json(); // İstek gövdesinden kategori verilerini alın

        if (!categoryData.name || categoryData.name.trim() === "") {
            throw new Error("Kategori adı zorunludur");
        }

        let parentCategory = null;
        if (categoryData.parentCategoryId) {
            // Eğer istek gövdesinde parentCategoryId varsa, üst kategoriyi bulun
            parentCategory = await Category.findById(categoryData.parentCategoryId);
            if (!parentCategory) {
                throw new Error("Geçersiz üst kategori ID");
            }
        }

        const newCategory = new Category({
            name: categoryData.name,
            description: categoryData.description,
            image: categoryData.image,
            parentCategory: parentCategory // Üst kategoriyi atayın
        });

        const savedCategory = await newCategory.save(); // Yeni kategoriyi veritabanına kaydedin

        return NextResponse.json({
            status: 201,
            message: "Başarılı",
            data: savedCategory
        }); // Oluşturulan kategoriyi JSON formatında yanıt olarak döndürün
    } catch (error) {
        console.error("Hata:", error);
        return NextResponse.json({ status: 400, message: error.message });
    }
}