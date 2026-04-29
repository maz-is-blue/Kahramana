# Admin Dashboard Guide
## Kahramana Luxury Perfume Website

Complete admin panel for managing all website content, products, images, orders, and translations.

---

## 🔐 **Access the Admin Panel**

### **Login Credentials (Demo):**
- **URL:** `http://your-domain.com/admin/login`
- **Email:** `admin@kahramana.com`
- **Password:** `admin123`

### **Security Notes:**
- Admin authentication is stored in localStorage
- Protected routes redirect to login if not authenticated
- Ready for backend JWT/OAuth integration

---

## 📊 **Dashboard Overview** (`/admin/dashboard`)

The main dashboard provides:
- **Revenue Analytics** - Total revenue with percentage change
- **Order Statistics** - Active orders and trends
- **Product Count** - Total products in catalog
- **Customer Metrics** - Total registered customers
- **Recent Orders Table** - Latest 5 orders with status
- **Top Products** - Best selling fragrances
- **Quick Actions** - Direct links to common tasks

---

## 🛍️ **Products Management** (`/admin/products`)

### **Features:**
✅ **View All Products** - Grid view with images and details
✅ **Search Products** - By name, ID, or Arabic name
✅ **Filter by Category** - Oud, Amber, Musk, Floral, Spicy
✅ **Product Status** - Active, Low Stock, Out of Stock badges
✅ **Quick Actions** - View, Edit, Delete from grid
✅ **Statistics** - Total, Active, Low Stock, Out of Stock counts

### **Product Information Displayed:**
- Product image with hover zoom
- English and Arabic names
- Category and available sizes
- Price and stock quantity
- Status indicator
- Quick action buttons

### **Actions:**
- **Add New Product** - Top right button
- **Edit Product** - Click "Edit" on any product
- **Delete Product** - Trash icon (with confirmation)
- **View Live** - Eye icon opens product page in new tab

---

## ✏️ **Add/Edit Product** (`/admin/products/new` or `/admin/products/:id/edit`)

### **Product Editor Sections:**

#### **1. Basic Information**
- Product Name (English) *required*
- Product Name (Arabic) *required*
- Category (dropdown) *required*
- Base Price (USD) *required*

#### **2. Description**
- Description (English) - Rich text area
- Description (Arabic) - RTL text area

#### **3. Scent Composition**
- **Top Notes** - Comma-separated (e.g., "Saffron, Rose, Bergamot")
- **Heart Notes** - Comma-separated
- **Base Notes** - Comma-separated

#### **4. Product Details**
- Perfumer Name
- Year of Creation
- Concentration (e.g., "20-30% Parfum")

#### **5. Status & Publishing** (Sidebar)
- **Product Status:** Active, Draft, or Archived
- **Featured Product:** Checkbox for homepage display

#### **6. Available Sizes** (Sidebar)
- Checkboxes for 30ml, 50ml, 100ml
- Multiple sizes can be selected

#### **7. Inventory** (Sidebar)
- Stock Quantity (number input)
- Low stock warning triggers automatically

#### **8. Product Image** (Sidebar)
- Upload main product image
- Drag & drop or click to upload
- Supports PNG, JPG up to 10MB

### **Backend Integration:**
```javascript
const handleSubmit = async (formData) => {
  const response = await fetch('/api/products', {
    method: isEditing ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.name,
      nameAr: formData.nameAr,
      category: formData.category,
      price: formData.price,
      description: formData.description,
      descriptionAr: formData.descriptionAr,
      notes: {
        top: formData.topNotes.split(','),
        heart: formData.heartNotes.split(','),
        base: formData.baseNotes.split(',')
      },
      perfumer: formData.perfumer,
      year: formData.year,
      concentration: formData.concentration,
      sizes: formData.sizes,
      stock: formData.stock,
      status: formData.status,
      featured: formData.featured,
      mainImage: formData.mainImage
    })
  });
};
```

---

## 📝 **Content & Translations Editor** (`/admin/content`)

### **Purpose:**
Edit **ALL** website text in both English and Arabic from one place.

### **Features:**
✅ **Section Navigation** - Sidebar with all page sections
✅ **Search Content** - Find specific text keys quickly
✅ **Side-by-Side Editing** - English and Arabic columns
✅ **Content Key Display** - Shows the translation key (e.g., `home.hero.title`)
✅ **Auto-Save** - Save all changes with one button
✅ **Live Preview** - Changes reflect immediately on website

### **Available Sections:**
1. **Home Page** - Hero, Featured, Notes Wall, Story sections
2. **Shop Page** - Title, filters, categories
3. **Product Pages** - Details, composition, sizes, CTA
4. **About Page** - Hero, story, values, process
5. **Contact Page** - Form labels, location, hours
6. **Cart** - Cart drawer, buttons, messages
7. **Checkout** - Form fields, payment, summary

### **How to Use:**
1. Select a section from left sidebar
2. Search for specific content if needed
3. Edit English text in left textarea
4. Edit Arabic text in right textarea (RTL)
5. Click "Save All Changes" when done

### **Content Structure:**
Each entry shows:
- **Content Key** (pink badge) - e.g., `home.hero.title`
- **English Input** - Left side
- **Arabic Input** - Right side (RTL layout)

### **Backend Integration:**
```javascript
await fetch('/api/content', {
  method: 'PUT',
  body: JSON.stringify({
    section: 'home',
    translations: {
      'home.hero.title': { en: '...', ar: '...' },
      'home.hero.subtitle': { en: '...', ar: '...' }
    }
  })
});
```

---

## 📷 **Media Library** (`/admin/media`)

### **Features:**
✅ **Upload Images** - Drag & drop or click to upload
✅ **Image Grid** - Visual preview of all media
✅ **Search Files** - Find images by filename
✅ **Copy URL** - One-click URL copy for use in products
✅ **Download** - Download original image
✅ **Delete Files** - Remove unused images
✅ **File Info** - Name, size, upload date

### **Image Management:**
- **Upload Area** - Top of page, drag & drop interface
- **Grid View** - All images in responsive grid
- **Hover Actions:**
  - **Copy URL** - Click to copy image URL to clipboard
  - **Download** - Download the file
  - **Delete** - Remove from library (with confirmation)

### **Best Practices:**
- Upload high-resolution images (1200x1600px recommended)
- Use descriptive filenames (e.g., `oud-royal-main.jpg`)
- Maintain 3:4 aspect ratio for product images
- Optimize images before upload to reduce size
- Keep file sizes under 500KB for fast loading

### **Using Images in Products:**
1. Upload image to Media Library
2. Click "Copy URL" on the image
3. Paste URL in Product Editor's image field

---

## 📦 **Orders Management** (`/admin/orders`)

### **Features:**
✅ **View All Orders** - Sortable table view
✅ **Search Orders** - By ID, customer name, or email
✅ **Filter by Status** - Pending, Processing, Shipped, Completed, Cancelled
✅ **Order Statistics** - Count by status
✅ **Order Details** - Expandable detail panel
✅ **Update Status** - Change order status
✅ **Download Invoice** - Generate order invoice

### **Order Information:**
- **Order ID** - Unique order number (e.g., KAH-2026-001)
- **Customer** - Name and email
- **Date & Time** - Order placement timestamp
- **Total Amount** - Order value
- **Status Badge** - Visual status indicator
- **Actions** - View details, download invoice

### **Order Status Colors:**
- 🟡 **Pending** - Yellow (awaiting processing)
- 🔵 **Processing** - Blue (being prepared)
- 🟣 **Shipped** - Purple (in transit)
- 🟢 **Completed** - Green (delivered)
- 🔴 **Cancelled** - Red (cancelled/refunded)

### **Order Detail Panel:**
Click "View" icon to expand order details:

#### **Customer Information:**
- Full name
- Email address
- Phone number

#### **Shipping Address:**
- Street address
- City
- Country
- Tracking number (if shipped)

#### **Order Items:**
- Product name (English & Arabic)
- Size and quantity
- Individual item price
- Line total

#### **Order Summary:**
- Subtotal
- Shipping cost
- Tax amount
- **Total** (highlighted)

#### **Update Order Status:**
- Dropdown to change status
- "Update Status" button
- Optionally send email notification to customer

### **Backend Integration:**
```javascript
// Get all orders
await fetch('/api/orders');

// Update order status
await fetch(`/api/orders/${orderId}`, {
  method: 'PUT',
  body: JSON.stringify({ status: 'shipped', tracking: 'DHL-123' })
});

// Generate invoice
await fetch(`/api/orders/${orderId}/invoice`);
```

---

## ⚙️ **Settings** (`/admin/settings`)

Currently shows placeholder. Future features:
- Site-wide settings
- SEO configuration
- Email templates
- Payment gateway settings
- Shipping zones and rates
- Tax configuration
- Admin user management

---

## 🎨 **Design & UX**

### **Luxury Admin Aesthetic:**
- Maintains Kahramana's luxury gallery feel
- Warm paper white backgrounds (#FAF7F1)
- Gradient accent buttons (pink → purple → amber)
- Clean typography (Playfair Display headings, Inter body)
- Generous whitespace
- Smooth animations and transitions

### **Responsive Design:**
- Mobile-friendly sidebar (drawer on small screens)
- Responsive grids and tables
- Touch-optimized buttons
- Collapsible navigation on mobile

### **User Experience:**
- Clear visual hierarchy
- Consistent spacing and alignment
- Hover states on all interactive elements
- Loading states for async operations
- Confirmation dialogs for destructive actions
- Success/error feedback messages

---

## 🔌 **Backend Integration Guide**

### **API Endpoints Needed:**

#### **Authentication**
```
POST   /api/auth/login        - Admin login
POST   /api/auth/logout       - Admin logout
GET    /api/auth/me           - Get current admin user
```

#### **Products**
```
GET    /api/products          - List all products
GET    /api/products/:id      - Get product details
POST   /api/products          - Create new product
PUT    /api/products/:id      - Update product
DELETE /api/products/:id      - Delete product
```

#### **Content/Translations**
```
GET    /api/content           - Get all translations
GET    /api/content/:section  - Get section translations
PUT    /api/content           - Update translations
```

#### **Media**
```
GET    /api/media             - List all media files
POST   /api/media/upload      - Upload file
DELETE /api/media/:id         - Delete file
```

#### **Orders**
```
GET    /api/orders            - List all orders
GET    /api/orders/:id        - Get order details
PUT    /api/orders/:id        - Update order status
GET    /api/orders/:id/invoice - Generate invoice PDF
```

#### **Analytics**
```
GET    /api/analytics/dashboard - Dashboard stats
GET    /api/analytics/revenue   - Revenue data
GET    /api/analytics/products  - Product performance
```

### **Authentication Implementation:**

**Using JWT:**
```javascript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const { token, user } = await response.json();
localStorage.setItem('admin-token', token);

// Authenticated requests
fetch('/api/products', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### **File Upload Implementation:**
```javascript
const formData = new FormData();
formData.append('file', file);

await fetch('/api/media/upload', {
  method: 'POST',
  body: formData,
  headers: { 'Authorization': `Bearer ${token}` }
});
```

---

## 📱 **Navigation Structure**

```
/admin/login           → Login page
/admin/dashboard       → Main dashboard
/admin/products        → Products list
/admin/products/new    → Add new product
/admin/products/:id/edit → Edit product
/admin/content         → Content editor
/admin/media           → Media library
/admin/orders          → Orders list
/admin/settings        → Settings (coming soon)
```

---

## 🚀 **Quick Start Guide**

### **For First-Time Setup:**

1. **Access Admin Panel**
   - Navigate to `/admin/login`
   - Use demo credentials or configure backend auth

2. **Add Your First Product**
   - Go to `/admin/products`
   - Click "Add New Product"
   - Fill in all required fields (*)
   - Upload product image from Media Library
   - Set status to "Active"
   - Click "Save Product"

3. **Edit Website Content**
   - Go to `/admin/content`
   - Select "Home Page" section
   - Edit hero title and subtitle
   - Click "Save All Changes"
   - View changes on main website

4. **Upload Media Files**
   - Go to `/admin/media`
   - Drag and drop product images
   - Copy URLs for use in products

5. **Manage Orders**
   - Go to `/admin/orders`
   - View incoming orders
   - Update order status as you process them
   - Download invoices for customers

---

## 💡 **Tips & Best Practices**

### **Products:**
- Always fill in both English AND Arabic names
- Use high-quality product images (min 1200px width)
- Keep descriptions concise but descriptive
- Set realistic stock quantities
- Mark bestsellers as "Featured"

### **Content:**
- Maintain consistent tone in both languages
- Keep text short for mobile readability
- Use proper capitalization
- Preview changes on live site before finalizing

### **Orders:**
- Process orders promptly (update status)
- Add tracking numbers when shipping
- Download invoices for record-keeping
- Monitor pending orders daily

### **Media:**
- Use descriptive, SEO-friendly filenames
- Optimize images before uploading
- Delete unused files to save storage
- Keep backup of original high-res images

---

## 🔒 **Security Considerations**

- Change default admin password immediately
- Use strong, unique passwords
- Enable 2FA when implementing backend
- Limit admin access to trusted users only
- Regular backup of product and content data
- Monitor for suspicious login attempts
- Use HTTPS in production
- Implement rate limiting on API endpoints

---

## 📊 **Future Enhancements**

Planned features for future versions:
- [ ] Bulk product import/export (CSV)
- [ ] Advanced analytics and reporting
- [ ] Customer management panel
- [ ] Email marketing integration
- [ ] Discount and coupon codes
- [ ] Multi-admin user roles and permissions
- [ ] Activity log and audit trail
- [ ] Automated inventory alerts
- [ ] Product reviews moderation
- [ ] Newsletter subscriber management

---

## 🆘 **Support & Troubleshooting**

### **Common Issues:**

**Can't login?**
- Check credentials (admin@kahramana.com / admin123)
- Clear browser cache and localStorage
- Check backend API is running

**Images not uploading?**
- Check file size (max 10MB)
- Ensure correct file format (JPG, PNG, WebP)
- Verify backend endpoint is configured

**Changes not saving?**
- Check browser console for errors
- Verify backend API connection
- Ensure form validation passes

**Orders not showing?**
- Check backend database connection
- Verify orders exist in database
- Check API response in network tab

---

## 🎯 **Summary**

The Kahramana Admin Dashboard provides complete control over:
✅ **Products** - Full CRUD operations with bilingual support
✅ **Content** - Edit all website text (English & Arabic)
✅ **Media** - Image library with easy management
✅ **Orders** - Complete order processing workflow
✅ **Analytics** - Revenue and product performance insights

All components are production-ready and styled to match your luxury gallery aesthetic. Simply connect to your backend API and you're ready to launch! 🚀

---

**Need Help?** The admin panel is fully functional with mock data. Replace API calls with your backend endpoints to go live.
