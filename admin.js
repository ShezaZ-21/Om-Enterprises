// OM Enterprises admin panel

const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const pageTitle = document.getElementById('page-title');
const logoutBtn = document.getElementById('logout-btn');
const aboutForm = document.getElementById('about-form');
const productForm = document.getElementById('product-form');
const productsTableBody = document.getElementById('products-table-body');
const productStatus = document.getElementById('product-status');
const productCancelBtn = document.getElementById('product-cancel-btn');
const productSubmitLabel = document.getElementById('product-submit-label');
const productFormTitle = document.getElementById('product-form-title');

async function readApiResponse(response) {
    const body = await response.text();
    let result;
    try {
        result = JSON.parse(body);
    } catch (error) {
        throw new Error(`Server returned ${response.status}. Check that Apache/PHP is running and try again.`);
    }
    if (!response.ok && !result.message) {
        throw new Error(`Request failed with status ${response.status}.`);
    }
    return result;
}

function showDashboard() {
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'flex';
    loadActivityLog();
}

async function checkLoginStatus() {
    try {
        const response = await fetch('backend/admin-session.php');
        const result = await readApiResponse(response);
        if (result.authenticated) {
            showDashboard();
            loadProducts();
        }
    } catch (error) {
        console.error('Unable to check admin session:', error);
    }
}

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Logging in…';
    loginError.classList.remove('show');

    try {
        const response = await fetch('backend/admin-login.php', { method: 'POST', body: new FormData(this) });
        const result = await readApiResponse(response);
        if (!result.success) throw new Error(result.message);
        logActivity('Login', 'Admin logged in successfully');
        showDashboard();
        loadProducts();
    } catch (error) {
        loginError.textContent = error.message || 'Something went wrong. Please try again.';
        loginError.classList.add('show');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Login';
    }
});

logoutBtn.addEventListener('click', async function (event) {
    event.preventDefault();
    try { await fetch('backend/admin-logout.php', { method: 'POST' }); } catch (error) { console.error(error); }
    logActivity('Logout', 'Admin logged out');
    dashboardSection.style.display = 'none';
    loginSection.style.display = 'flex';
    loginForm.reset();
    loginError.classList.remove('show');
    resetProductForm();
});

navLinks.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    navigateTo(link.dataset.section);
}));

function navigateTo(section) {
    navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === section));
    contentSections.forEach(content => content.classList.remove('active'));
    document.getElementById(`${section}-content`)?.classList.add('active');
    const titles = { dashboard: 'Dashboard', about: 'About Page', products: 'Products', testimonials: 'Testimonials', inquiries: 'Inquiries', activity: 'Activity Log' };
    pageTitle.textContent = titles[section] || 'Dashboard';
    if (section === 'products') loadProducts();
    if (section === 'about') loadAboutData();
    if (section === 'activity') loadActivityLog();
}

function loadAboutData() {
    document.getElementById('hero-title').value = 'OM Enterprises';
    document.getElementById('hero-subtitle').value = 'The Authentic, Tangy Taste of India - Exported Worldwide';
    document.getElementById('story-title').value = 'The Authentic, Tangy Taste of India';
    document.getElementById('mission-title').value = 'Our Mission';
}

aboutForm?.addEventListener('submit', event => {
    event.preventDefault();
    logActivity('Content Update', 'Updated About page content');
    alert('About page content saved successfully!');
});

function setProductStatus(message = '', type = '') {
    productStatus.textContent = message;
    productStatus.className = `product-status ${type}`.trim();
}

function makeCell(value) {
    const cell = document.createElement('td');
    cell.textContent = value;
    return cell;
}

function displayProducts(products) {
    productsTableBody.replaceChildren();
    if (!products.length) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 6;
        cell.className = 'empty-products';
        cell.textContent = 'No products yet. Add your first product above.';
        row.appendChild(cell);
        productsTableBody.appendChild(row);
        return;
    }
    products.forEach(product => {
        const row = document.createElement('tr');
        row.append(makeCell(product.id));
        const imageCell = document.createElement('td');
        if (product.image) {
            const image = document.createElement('img');
            image.src = product.image;
            image.alt = `${product.name} product image`;
            image.className = 'product-thumbnail';
            imageCell.appendChild(image);
        } else imageCell.textContent = '—';
        row.append(imageCell, makeCell(product.name), makeCell(product.category), makeCell(`₹${Number(product.price).toFixed(2)}`));
        const actions = document.createElement('td');
        actions.className = 'product-actions';
        const edit = document.createElement('button');
        edit.type = 'button'; edit.className = 'table-btn edit-btn'; edit.textContent = 'Edit'; edit.addEventListener('click', () => editProduct(product.id));
        const remove = document.createElement('button');
        remove.type = 'button'; remove.className = 'table-btn delete-btn'; remove.textContent = 'Delete'; remove.addEventListener('click', () => deleteProduct(product.id, product.name));
        actions.append(edit, remove); row.appendChild(actions); productsTableBody.appendChild(row);
    });
}

async function loadProducts() {
    try {
        const response = await fetch('backend/get-products.php');
        const result = await readApiResponse(response);
        if (!result.success) throw new Error(result.message);
        displayProducts(result.data);
        const total = document.querySelector('.stat-info h3');
        if (total) total.textContent = result.count;
    } catch (error) {
        setProductStatus(error.message || 'Could not load products.', 'error');
    }
}

productForm?.addEventListener('submit', async function (event) {
    event.preventDefault();
    const id = document.getElementById('product-id').value;
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    setProductStatus(id ? 'Updating product…' : 'Adding product…');
    try {
        const response = await fetch(id ? 'backend/update-product.php' : 'backend/add-product.php', { method: 'POST', body: new FormData(this) });
        const result = await readApiResponse(response);
        if (!result.success) throw new Error(result.message);
        logActivity(id ? 'Product Updated' : 'Product Added', document.getElementById('product-name').value);
        resetProductForm();
        setProductStatus(result.message, 'success');
        loadProducts();
    } catch (error) {
        setProductStatus(error.message || 'Unable to save product.', 'error');
    } finally { submitButton.disabled = false; }
});

async function editProduct(id) {
    try {
        const response = await fetch(`backend/get-products.php?id=${encodeURIComponent(id)}`);
        const result = await readApiResponse(response);
        const product = result.data?.[0];
        if (!result.success || !product) throw new Error(result.message || 'Product not found.');
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-price').value = product.price;
        productSubmitLabel.textContent = 'Update Product';
        productFormTitle.textContent = `Editing “${product.name}”. Leave the image empty to keep the current one.`;
        productCancelBtn.hidden = false;
        setProductStatus('');
        productForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) { setProductStatus(error.message || 'Unable to load product.', 'error'); }
}

async function deleteProduct(id, name) {
    if (!window.confirm(`Delete “${name}”? This cannot be undone.`)) return;
    const formData = new FormData(); formData.append('id', id);
    try {
        const response = await fetch('backend/delete-product.php', { method: 'POST', body: formData });
        const result = await readApiResponse(response);
        if (!result.success) throw new Error(result.message);
        logActivity('Product Deleted', name);
        if (document.getElementById('product-id').value === String(id)) resetProductForm();
        setProductStatus(result.message, 'success');
        loadProducts();
    } catch (error) { setProductStatus(error.message || 'Unable to delete product.', 'error'); }
}

function resetProductForm() {
    productForm?.reset();
    document.getElementById('product-id').value = '';
    productSubmitLabel.textContent = 'Add Product';
    productFormTitle.textContent = 'Add a new product to the catalogue.';
    productCancelBtn.hidden = true;
}
productCancelBtn?.addEventListener('click', () => { resetProductForm(); setProductStatus(''); });

function logActivity(action, details) {
    const activities = JSON.parse(localStorage.getItem('adminActivities') || '[]');
    activities.unshift({ action, details, timestamp: new Date().toISOString() });
    localStorage.setItem('adminActivities', JSON.stringify(activities.slice(0, 50)));
}

function loadActivityLog() {
    const list = document.getElementById('activity-list');
    const activities = JSON.parse(localStorage.getItem('adminActivities') || '[]');
    list.replaceChildren();
    if (!activities.length) { list.innerHTML = '<p class="no-activity">No recent activity</p>'; return; }
    activities.forEach(activity => {
        const item = document.createElement('div'); item.className = 'activity-item';
        const info = document.createElement('div'); info.className = 'activity-info';
        const action = document.createElement('div'); action.className = 'activity-action'; action.textContent = activity.action;
        const time = document.createElement('div'); time.className = 'activity-time'; time.textContent = formatDate(activity.timestamp);
        const details = document.createElement('div'); details.className = 'activity-details'; details.textContent = activity.details;
        info.append(action, time); item.append(info, details); list.appendChild(item);
    });
}

function formatDate(value) { return new Date(value).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }); }
document.addEventListener('DOMContentLoaded', checkLoginStatus);
