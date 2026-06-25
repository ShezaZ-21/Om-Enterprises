# OM Enterprises Backend Integration Guide

## Overview
This guide explains how to integrate the PHP backend with your frontend HTML/JavaScript.

---

## Phase 1: Inquiry System & Dynamic Products

### 1. Product Inquiry Form

#### HTML Form Example
```html
<form id="inquiryForm" class="inquiry-form">
    <input type="hidden" name="product_id" value="1">
    <input type="hidden" name="product_name" value="Tomato Ketchup">
    
    <div class="form-group">
        <label for="customer_name">Your Name *</label>
        <input type="text" id="customer_name" name="customer_name" required>
    </div>
    
    <div class="form-group">
        <label for="customer_email">Email *</label>
        <input type="email" id="customer_email" name="customer_email" required>
    </div>
    
    <div class="form-group">
        <label for="customer_phone">Phone</label>
        <input type="text" id="customer_phone" name="customer_phone">
    </div>
    
    <div class="form-group">
        <label for="customer_company">Company</label>
        <input type="text" id="customer_company" name="customer_company">
    </div>
    
    <div class="form-group">
        <label for="quantity">Quantity Required</label>
        <input type="text" id="quantity" name="quantity">
    </div>
    
    <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="4"></textarea>
    </div>
    
    <button type="submit">Send Inquiry</button>
</form>
```

#### JavaScript Fetch Example
```javascript
// Product Inquiry Form Submission
const inquiryForm = document.getElementById('inquiryForm');

if (inquiryForm) {
    inquiryForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Prevent double submission
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn.disabled) return;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const formData = new FormData(this);

        try {
            const response = await fetch('backend/inquiry.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert(result.message);
                this.reset();
            } else {
                alert('Error: ' + result.message);
            }

        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Inquiry';
        }
    });
}
```

---

### 2. Fetch Products from Database

#### Fetch All Products
```javascript
// Fetch all products
async function fetchAllProducts() {
    try {
        const response = await fetch('backend/get-products.php');
        const result = await response.json();

        if (result.success) {
            console.log('Products:', result.data);
            console.log('Total:', result.count);
            return result.data;
        } else {
            console.error('Error:', result.message);
            return [];
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}

// Usage
fetchAllProducts().then(products => {
    // Display products on your page
    displayProducts(products);
});
```

#### Fetch Products by Category
```javascript
// Fetch products by category
async function fetchProductsByCategory(category) {
    try {
        const response = await fetch(`backend/get-products.php?category=${encodeURIComponent(category)}`);
        const result = await response.json();

        if (result.success) {
            return result.data;
        } else {
            console.error('Error:', result.message);
            return [];
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}

// Usage
fetchProductsByCategory('Sauces').then(products => {
    displayProducts(products);
});
```

#### Fetch Single Product by ID
```javascript
// Fetch single product by ID
async function fetchProductById(productId) {
    try {
        const response = await fetch(`backend/get-products.php?id=${productId}`);
        const result = await response.json();

        if (result.success) {
            return result.data[0]; // Returns single product object
        } else {
            console.error('Error:', result.message);
            return null;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

// Usage
fetchProductById(1).then(product => {
    if (product) {
        console.log('Product:', product);
    }
});
```

#### Display Products Example
```javascript
function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image_url || 'img/placeholder.jpg'}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="category">${product.category}</p>
            <p class="description">${product.description}</p>
            <p class="price">₹${product.price}</p>
            <button onclick="openInquiryForm(${product.id}, '${product.name}')">
                Send Inquiry
            </button>
        `;
        container.appendChild(productCard);
    });
}

function openInquiryForm(productId, productName) {
    // Set hidden fields in inquiry form
    document.getElementById('inquiryForm').querySelector('[name="product_id"]').value = productId;
    document.getElementById('inquiryForm').querySelector('[name="product_name"]').value = productName;
    
    // Scroll to form
    document.getElementById('inquiryForm').scrollIntoView({ behavior: 'smooth' });
}
```

---

## Phase 2: Admin Login

### Admin Login Form

#### HTML Form Example
```html
<form id="adminLoginForm" class="admin-login-form">
    <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" required>
    </div>
    
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
    </div>
    
    <button type="submit">Login</button>
</form>
```

#### JavaScript Fetch Example
```javascript
// Admin Login Form Submission
const adminLoginForm = document.getElementById('adminLoginForm');

if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Prevent double submission
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn.disabled) return;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';

        const formData = new FormData(this);

        try {
            const response = await fetch('backend/admin-login.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert(result.message);
                // Redirect to admin panel
                window.location.href = result.redirect || 'admin.html';
            } else {
                alert('Login failed: ' + result.message);
            }

        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Login';
        }
    });
}
```

---

## Database Setup

### Create Admin User

#### Step 1: Run the SQL Script
Open phpMyAdmin or MySQL command line and run the SQL from `create-admin-user.sql`:

```sql
INSERT INTO admin_users (username, password, full_name, email)
VALUES (
    'admin',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'Administrator',
    'admin@omenterprises.com'
);
```

#### Step 2: Default Credentials
- **Username:** `admin`
- **Password:** `admin123`

⚠️ **Important:** Change the default password after first login!

#### Step 3: Change Password (PHP Script)
Create a temporary file `change-password.php`:

```php
<?php
$new_password = "your_new_secure_password";
$hashed = password_hash($new_password, PASSWORD_DEFAULT);
echo "New hash: " . $hashed;
?>
```

Run this file, then update the database:
```sql
UPDATE admin_users 
SET password = '$2y$10$...' 
WHERE username = 'admin';
```

---

## SQL Insert Examples for Products

### Insert Single Product
```sql
INSERT INTO products (name, category, description, price, image_url, stock_quantity, is_active)
VALUES (
    'Tomato Ketchup Premium',
    'Sauces',
    'Premium quality tomato ketchup made from fresh tomatoes. Perfect for burgers, fries, and snacks.',
    150.00,
    'img/products/tomato-ketchup.jpg',
    100,
    1
);
```

### Insert Multiple Products
```sql
INSERT INTO products (name, category, description, price, image_url, stock_quantity, is_active) VALUES
('Green Chutney', 'Sauces', 'Fresh mint and coriander chutney', 80.00, 'img/products/green-chutney.jpg', 50, 1),
('Tamarind Sauce', 'Sauces', 'Authentic tamarind sauce with tangy flavor', 90.00, 'img/products/tamarind-sauce.jpg', 75, 1),
('Red Chili Sauce', 'Sauces', 'Spicy red chili sauce for bold flavor', 85.00, 'img/products/chili-sauce.jpg', 60, 1),
('Mango Pickle', 'Pickles', 'Traditional mango pickle with authentic spices', 120.00, 'img/products/mango-pickle.jpg', 40, 1),
('Mixed Vegetable Pickle', 'Pickles', 'Mixed vegetable pickle with crunchy texture', 110.00, 'img/products/mixed-pickle.jpg', 45, 1);
```

---

## API Endpoints Summary

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/backend/contact-form.php` | POST | Submit contact form | full_name, email, phone, company, message |
| `/backend/inquiry.php` | POST | Submit product inquiry | product_id, product_name, customer_name, customer_email, customer_phone, customer_company, quantity, message |
| `/backend/get-products.php` | GET | Fetch products | category (optional), id (optional) |
| `/backend/admin-login.php` | POST | Admin login | username, password |

---

## Security Best Practices

1. **Never expose database credentials** in frontend code
2. **Always use prepared statements** to prevent SQL injection
3. **Validate input on both frontend and backend**
4. **Use HTTPS in production**
5. **Keep PHP updated** to latest version
6. **Regularly update passwords**
7. **Implement rate limiting** for form submissions
8. **Log errors** but don't expose them to users

---

## Troubleshooting

### Common Issues

**Issue:** "Database connection failed"
- **Solution:** Check `config.php` credentials and ensure MySQL is running

**Issue:** "Invalid request method"
- **Solution:** Ensure you're using POST for forms and GET for fetching data

**Issue:** CORS errors
- **Solution:** Uncomment CORS headers in PHP files if frontend is on different domain

**Issue:** Form submits twice
- **Solution:** Ensure only one event listener is attached (check both HTML and JS files)

---

## Product management and Phase 3 setup

The admin panel now supports adding, editing, listing, and deleting products.
Product images are uploaded with the product form and stored in
`/uploads/products/`; accepted formats are JPG, PNG, WEBP, and GIF (5 MB max).

Before adding products, run `backend/database-schema.sql` in the
`om_enterprises` database if the `products` table does not already exist.

Product administration is protected by the PHP admin session created at login;
opening `admin.html` or changing local storage alone does not authorize API
changes.

### Inquiry email notifications

After an inquiry is stored, `backend/inquiry.php` sends a best-effort email to
`INQUIRY_NOTIFICATION_EMAIL`. Configure `INQUIRY_NOTIFICATION_EMAIL` and
`MAIL_FROM_EMAIL` as environment variables in production (or change their
defaults in `backend/config.php`), and configure PHP's mail transport. A mail
delivery failure never discards a customer inquiry.
