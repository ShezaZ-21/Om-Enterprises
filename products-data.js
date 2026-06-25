// Product Data System
const productsData = [
    {
        id: 1,
        name: "Premium Tamarind Sauce",
        category: "Sauces",
        tag: "Featured",
        image: "img/phto.png",
        thumbnail1: "img/phto.png",
        thumbnail2: "img/phto.png",
        rating: 4.9,
        description: "Premium Tamarind Sauce crafted from carefully selected tamarind pulp and natural ingredients. Known for its rich sweet and tangy flavor, it is the perfect accompaniment for chaats, samosas, snacks, street food, and various Indian cuisines. Made using high-quality tamarind sourced from trusted farms to ensure authentic taste and freshness.",
        features: [
            "100% Natural Ingredients",
            "Halal & FSSAI Certified",
            "No Artificial Preservatives",
            "Shelf Life: 12 Months"
        ],
        specs: {
            "Net Weight": "500ml",
            "Packaging": "Glass Bottle",
            "Storage": "Cool, Dry Place",
            "Origin": "India"
        },
        shortDescription: "Premium Tamarind Sauce crafted from carefully selected tamarind pulp and natural ingredients. Known for its rich sweet and tangy flavour."
    },
    {
        id: 2,
        name: "Fresh Green Chilli",
        category: "Fresh Vegetables",
        tag: "Featured",
        image: "img/chlli.png",
        thumbnail1: "img/chlli.png",
        thumbnail2: "img/chlli.png",
        rating: 4.8,
        description: "Premium-quality fresh green chillies sourced directly from trusted farms across India. Carefully harvested and selected to ensure vibrant color, rich flavour, and optimal freshness. Ideal for culinary applications, food processing, spice manufacturing, and export markets.",
        features: [
            "Premium Export Grade",
            "Vibrant Color",
            "Rich Flavour",
            "Optimal Freshness",
             "Halal & FSSAI Certified"
        ],
        specs: {
            "Product Type": "Fresh Green Chilli",
            "Quality Grade": "Premium Export Grade",
            "Packaging": "As Per Customer Requirement",
            "Storage": "Cool & Dry Conditions",
            "Origin": "India"
        },
        shortDescription: "Premium-quality fresh green chillies sourced directly from trusted farms across India. Carefully harvested and selected to ensure vibrant color, rich flavour, and optimal freshness."
    },
    {
        id: 3,
        name: "Fresh Onions",
        category: "Fresh Vegetables",
        tag: "Featured",
        image: "img/onion.png",
        thumbnail1: "img/onion.png",
        thumbnail2: "img/onion.png",
        rating: 4.7,
        description: "Premium-quality fresh onions sourced directly from trusted farms across India. Carefully selected for their uniform size, rich flavour, and extended shelf life. Ideal for culinary use, food processing, retail markets, and international export requirements.",
        features: [
            "Uniform Size & Quality",
            "Rich Flavour Profile",
            "Extended Shelf Life",
            "Halal & FSSAI Certified",
            "Export Grade"
        ],
        specs: {
            "Product Type": "Fresh Onions",
            "Quality Grade": "Premium Export Grade",
            "Packaging": "As Per Customer Requirement",
            "Storage": "Cool & Ventilated",
            "Origin": "India"
        },
        shortDescription: "Premium-quality fresh onions sourced directly from trusted farms across India. Carefully selected for their uniform size, rich flavour, and extended shelf life."
    },
    {
        id: 4,
        name: "Fresh Pomegranate",
        category: "Fresh Fruits",
        tag: "Featured",
        image: "img/pomegranate.png",
        thumbnail1: "img/pomegranate.png",
        thumbnail2: "img/pomegranate.png",
        rating: 4.9,
        description: "Premium-quality fresh pomegranates sourced from carefully selected farms across India. Renowned for their vibrant ruby-red arils, natural sweetness, and exceptional nutritional value, our pomegranates are harvested at optimal maturity to ensure superior taste, freshness, and shelf life. Ideal for fresh consumption, juice production, food processing, retail distribution, and export markets.",
        features: [
            "Vibrant Ruby-Red Arils",
            "Natural Sweetness",
            "High Nutritional Value",
            "Halal & FSSAI Certified",
            "Optimal Harvest Maturity"
        ],
        specs: {
            "Product Type": "Fresh Pomegranate",
            "Quality Grade": "Premium Export Grade",
            "Packaging": "As Per Customer Requirement",
            "Storage": "Cool & Dry",
            "Origin": "India"
        },
        shortDescription: "Premium-quality fresh pomegranates sourced from carefully selected farms across India. Renowned for their vibrant ruby-red arils, natural sweetness, and exceptional nutritional value."
    },
    {
        id: 5,
        name: "Fresh Grapes",
        category: "Fresh Fruits",
        tag: "Featured",
        image: "img/grapes.png",
        thumbnail1: "img/grapes.png",
        thumbnail2: "img/grapes.png",
        rating: 4.8,
        description: "Premium-quality fresh grapes sourced from carefully selected vineyards across India. Renowned for their sweet taste, vibrant color, and exceptional nutritional value, our grapes are harvested at optimal maturity to ensure superior taste, freshness, and shelf life. Ideal for fresh consumption, juice production, wine making, retail distribution, and export markets.",
        features: [
            "Sweet Taste & Vibrant Color",
            "High Nutritional Value",
            "Optimal Harvest Maturity",
            "Halal & FSSAI Certified",
            "Multiple Varieties Available"
        ],
        specs: {
            "Product Type": "Fresh Grapes",
            "Quality Grade": "Premium Export Grade",
            "Packaging": "As Per Customer Requirement",
            "Storage": "Cool & Refrigerated",
            "Origin": "India"
        },
        shortDescription: "Premium-quality fresh grapes sourced from carefully selected vineyards across India. Renowned for their sweet taste, vibrant color, and exceptional nutritional value."
    },
    {
        id: 6,
        name: "Fresh Black Grapes",
        category: "Fresh Fruits",
        tag: "Featured",
        image: "img/black grapes .png",
        thumbnail1: "img/black grapes .png",
        thumbnail2: "img/black grapes .png",
        rating: 4.7,
        description: "Premium-quality fresh black grapes sourced from carefully selected vineyards across India. Known for their rich flavour, natural sweetness, deep color, and high nutritional value, our black grapes are harvested at peak ripeness to ensure superior freshness, taste, and shelf life. Ideal for fresh consumption, juice production, food processing, retail distribution, and export markets.",
        features: [
            "Rich Flavour & Natural Sweetness",
            "Deep Color & High Nutrition",
            "Peak Ripeness Harvest",
            "Halal & FSSAI Certified",
            "Premium Quality"
        ],
        specs: {
            "Product Type": "Fresh Black Grapes",
            "Quality Grade": "Premium Export Grade",
            "Packaging": "As Per Customer Requirement",
            "Storage": "Cool & Refrigerated",
            "Origin": "India"
        },
        shortDescription: "Premium-quality fresh black grapes sourced from carefully selected vineyards across India. Known for their rich flavour, natural sweetness, deep color, and high nutritional value."
    },
    {
        id: 7,
        name: "Fresh Mint Sauce",
        category: "Sauces",
        tag: "Featured",
        image: "img/pht.png",
        thumbnail1: "img/pht.png",
        thumbnail2: "img/pht.png",
        rating: 4.9,
        description: "Our Fresh Mint Sauce is made using handpicked mint leaves blended with aromatic spices and natural ingredients to create a refreshing and flavourful sauce. It is the perfect accompaniment for kebabs, sandwiches, rolls, momos, chaats, snacks, grilled dishes, and Indian meals. The vibrant taste and cooling freshness of mint make every dish more exciting and delicious. Ideal for daily meals, parties, and restaurant serving.",
        features: [
            "Made with Fresh Mint Leaves",
            "Refreshing & Spicy Flavour",
            "Perfect Dip for Snacks",
            "Smooth & Rich Texture",
            "Hygienically Prepared",
            "Halal & FSSAI Certified",
            "No Artificial Preservatives"
        ],
        specs: {
            "Category": "Sauces",
            "Flavor": "Minty & Spicy",
            "Shelf Life": "12 Months",
            "Storage": "Refrigerate after opening",
            "Packaging": "Premium Sealed Bottle",
            "Usage": "Ready to serve"
        },
        shortDescription: "Our Fresh Mint Sauce is made using handpicked mint leaves blended with aromatic spices and natural ingredients to create a refreshing and flavourful sauce."
    }
];

// Function to get product by ID
function getProductById(id) {
    return productsData.find(product => product.id === id);
}

// Function to get all products
function getAllProducts() {
    return productsData;
}

// Function to get products by category
function getProductsByCategory(category) {
    return productsData.filter(product => product.category === category);
}

// Function to get featured products
function getFeaturedProducts() {
    return productsData.filter(product => product.tag === "Featured");
}

// Function to get related products (excluding current product)
function getRelatedProducts(currentId, limit = 3) {
    // Filter out current product
    const otherProducts = productsData.filter(product => product.id !== currentId);
    
    // Shuffle array for random selection
    const shuffled = otherProducts.sort(() => 0.5 - Math.random());
    
    // Return first 'limit' products
    return shuffled.slice(0, limit);
}
