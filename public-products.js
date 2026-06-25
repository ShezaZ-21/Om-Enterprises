// Public catalogue data source. Products created in the admin panel live here.
(function () {
    const fallbackImage = 'assets/images/logo.jpeg';
    const defaultFeatures = ['Premium quality product', 'Available for domestic and export orders', 'Contact us for packaging and quantity options'];

    function toPublicProduct(product) {
        const description = product.description || '';
        return {
            ...product,
            id: Number(product.id),
            databaseId: Number(product.id),
            publicId: `db-${product.id}`,
            image: product.image || fallbackImage,
            thumbnail1: product.image || fallbackImage,
            thumbnail2: product.image || fallbackImage,
            shortDescription: description.length > 150 ? `${description.slice(0, 147)}...` : description,
            rating: 5,
            features: defaultFeatures,
            specs: {
                Category: product.category || 'Not specified',
                Price: product.price ? `₹${Number(product.price).toFixed(2)}` : 'Contact for price',
                Availability: 'Contact us for details'
            }
        };
    }

    async function requestProducts(query = '') {
        const response = await fetch(`backend/get-products.php${query}`);
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || 'Unable to load products.');
        return result.data.map(toPublicProduct);
    }

    window.loadPublicProducts = async function () {
        try {
            const databaseProducts = await requestProducts();
            // The original site products are retained while new admin-managed
            // products are displayed first. `publicId` prevents a database ID
            // (for example 4) from replacing an old static product with ID 4.
            const legacyProducts = Array.isArray(window.productsData)
                ? window.productsData.map(product => ({ ...product, publicId: String(product.id), databaseId: product.id }))
                : [];
            return [...databaseProducts, ...legacyProducts];
        } catch (error) {
            console.error('Could not load database products:', error);
            // Preserve the original catalogue as a graceful fallback if the API is offline.
            return Array.isArray(window.productsData) ? window.productsData : [];
        }
    };

    window.getPublicProductById = async function (id) {
        const requestedId = String(id);
        if (!requestedId.startsWith('db-')) {
            const product = typeof window.getProductById === 'function' ? window.getProductById(Number(requestedId)) : null;
            return product ? { ...product, publicId: String(product.id), databaseId: product.id } : null;
        }
        try {
            const products = await requestProducts(`?id=${encodeURIComponent(requestedId.slice(3))}`);
            return products[0] || null;
        } catch (error) {
            return null;
        }
    };
}());
