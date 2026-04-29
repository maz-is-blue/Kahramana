# E-Commerce Flow Integration Guide
## Kahramana Luxury Perfume Website

This guide explains the complete e-commerce purchasing flow implemented for your Kahramana website, ready for backend integration.

---

## 🛍️ **Complete Flow Overview**

### **User Journey:**
1. Browse products on Home or Shop pages
2. Click product → View product detail page
3. Select size, quantity → Add to Cart
4. View cart in slide-out drawer
5. Proceed to Checkout
6. Fill shipping & payment details
7. Place order → Order Confirmation page

---

## 📦 **Components Created**

### **1. CartContext** (`/src/app/context/CartContext.tsx`)
**Global state management for the shopping cart**

**Features:**
- Add/remove items from cart
- Update quantities
- Calculate totals (items count & price)
- Persist cart in localStorage (survives page refresh)
- Cart drawer open/close control

**Key Functions:**
```typescript
const { 
  items,              // Array of cart items
  addToCart,          // Add item to cart
  removeFromCart,     // Remove item by ID
  updateQuantity,     // Update item quantity
  clearCart,          // Empty the cart
  totalItems,         // Total number of items
  totalPrice,         // Total cart value
  isCartOpen,         // Drawer visibility
  openCart,           // Open cart drawer
  closeCart           // Close cart drawer
} = useCart();
```

**Backend Integration Points:**
- When user adds to cart, send to backend: `POST /api/cart/add`
- Sync cart with backend on login
- Load cart from backend for logged-in users

---

### **2. CartDrawer** (`/src/app/components/CartDrawer.tsx`)
**Slide-out shopping cart preview**

**Features:**
- Beautiful slide-out drawer (RTL support for Arabic)
- Show all cart items with images
- Quantity controls (+/-)
- Remove items
- Display subtotal
- "Proceed to Checkout" button
- "Continue Shopping" option

**Styling:**
- Luxury gallery aesthetic
- Gradient accent buttons
- Smooth animations (Motion/Framer Motion)
- Full bilingual support

---

### **3. CheckoutPage** (`/src/app/components/CheckoutPage.tsx`)
**Complete checkout form with order summary**

**Form Sections:**
1. **Contact Information**
   - Email
   - Phone number

2. **Shipping Address**
   - First name, Last name
   - Address, City, State, ZIP
   - Country selector (GCC countries + international)

3. **Payment Method**
   - Card number
   - Name on card
   - Expiry date
   - CVV

4. **Gift Options**
   - Gift wrap checkbox
   - Gift message textarea

5. **Order Summary** (Right sidebar)
   - All cart items with images
   - Subtotal, Shipping ($15), Tax (10%)
   - Final total

**Backend Integration:**
```javascript
// When form is submitted:
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // YOUR BACKEND CALL HERE:
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer: formData,      // Contact + shipping info
      items: items,            // Cart items
      total: finalTotal,       // Total amount
      giftWrap: formData.giftWrap,
      giftMessage: formData.giftMessage
    })
  });
  
  const order = await response.json();
  // order.id, order.status, etc.
};
```

**Payment Integration:**
You'll need to integrate a payment gateway like:
- **Stripe** (most popular)
- **PayPal**
- **Square**
- **Authorize.net**

Example Stripe integration:
```javascript
import { loadStripe } from '@stripe/stripe-js';

// In your handleSubmit:
const stripe = await loadStripe('YOUR_PUBLISHABLE_KEY');
const response = await fetch('/api/create-payment-intent', {
  method: 'POST',
  body: JSON.stringify({ amount: finalTotal * 100 }) // cents
});
const { clientSecret } = await response.json();

const result = await stripe.confirmCardPayment(clientSecret, {
  payment_method: {
    card: cardElement,
    billing_details: { name: formData.cardName }
  }
});
```

---

### **4. OrderConfirmation** (`/src/app/components/OrderConfirmation.tsx`)
**Success page after order placement**

**Features:**
- Beautiful success animation
- Order number display
- Timeline of next steps:
  - Email sent ✓
  - Processing order
  - Shipping & delivery date
- Complete order summary
- Shipping address display
- Download receipt button
- Continue shopping CTA

**Data Flow:**
```javascript
// Receives data via React Router state:
navigate('/order-confirmation', { 
  state: { 
    orderId: 'KAH-ABC123',
    orderData: customerInfo,
    items: cartItems,
    total: finalTotal 
  } 
});
```

---

## 🔄 **Updated Components**

### **5. GalleryHeader** (Updated)
- Now shows real cart count badge
- Cart icon opens CartDrawer
- Badge animates when items added

### **6. LuxuryProductDetail** (Updated)
- "Add to Cart" button functionality
- Adds selected product with size & quantity
- Opens cart drawer automatically
- Visual feedback on add

### **7. App.tsx** (Updated)
- Wrapped with `CartProvider`
- Added routes:
  - `/checkout` → CheckoutPage
  - `/order-confirmation` → OrderConfirmation
- Renders `<CartDrawer />` globally

---

## 🌐 **Translations Added**

All UI text is fully translated (English & Arabic):
- Cart labels
- Checkout form fields
- Confirmation messages
- Button text
- Error messages

Example:
```typescript
'cart.title': 'Shopping Cart'       // EN
'cart.title': 'سلة التسوق'          // AR
```

---

## 💾 **Data Persistence**

### **Current (Frontend Only):**
- Cart stored in `localStorage`
- Survives page refresh
- Cleared when order completed

### **For Backend Integration:**

**User Account & Auth:**
```javascript
// When user logs in:
const response = await fetch('/api/cart', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const cart = await response.json();
// Merge with local cart
```

**Save Cart to Backend:**
```javascript
// On every cart change:
await fetch('/api/cart/sync', {
  method: 'POST',
  body: JSON.stringify({ items })
});
```

---

## 🎨 **Styling & UX**

**Design System:**
- Warm paper white background (#FAF7F1)
- Soft black text (#101010)
- Gradient accents (pink → purple → amber)
- Museum/gallery aesthetic
- Generous whitespace
- Elegant transitions

**Typography:**
- **Playfair Display** - English headings
- **Inter** - English body text
- **Almarai** - Arabic (all content)

**Animations:**
- Smooth drawer slides
- Button hover effects
- Add to cart success feedback
- Page transitions

---

## 🔧 **Backend API Endpoints Needed**

### **1. Cart Management**
```
POST   /api/cart/add          - Add item to cart
DELETE /api/cart/remove/:id   - Remove item
PUT    /api/cart/update/:id   - Update quantity
GET    /api/cart              - Get user's cart
POST   /api/cart/sync         - Sync cart with backend
```

### **2. Orders**
```
POST   /api/orders            - Create new order
GET    /api/orders/:id        - Get order details
GET    /api/orders            - List user's orders
PUT    /api/orders/:id/status - Update order status
```

### **3. Products**
```
GET    /api/products          - List all products
GET    /api/products/:id      - Get product details
```

### **4. Payment**
```
POST   /api/payment/intent    - Create payment intent
POST   /api/payment/confirm   - Confirm payment
```

---

## 📱 **Testing the Flow**

1. **Add to Cart:**
   - Go to any product page
   - Select size (30ml, 50ml, 100ml)
   - Set quantity
   - Click "Add to Collection"
   - Cart drawer opens automatically

2. **View Cart:**
   - Click cart icon in header
   - See all items
   - Update quantities (+/-)
   - Remove items

3. **Checkout:**
   - Click "Proceed to Checkout"
   - Fill all form fields
   - Optional: Enable gift wrap
   - Click "Place Order"

4. **Confirmation:**
   - See order number
   - View order summary
   - Download receipt (prints page)
   - Continue shopping

---

## 🚀 **Next Steps for Backend Integration**

### **Priority 1: Order Processing**
1. Create database tables:
   - `orders`
   - `order_items`
   - `customers`
   - `products`

2. Implement `/api/orders` endpoint
3. Email notifications (order confirmation)

### **Priority 2: Payment Gateway**
1. Choose provider (Stripe recommended)
2. Get API keys
3. Implement payment flow
4. Handle webhooks

### **Priority 3: User Accounts**
1. Authentication system (JWT/OAuth)
2. User profile management
3. Order history
4. Saved addresses

### **Priority 4: Inventory**
1. Stock tracking
2. Low stock alerts
3. Out of stock handling

### **Priority 5: Admin Panel**
1. View all orders
2. Update order status
3. Manage products
4. View analytics

---

## 📞 **Support**

All components are fully functional and styled. The form submits successfully and creates mock orders. You just need to:

1. Replace mock data with API calls
2. Add payment processing
3. Connect to your database
4. Send confirmation emails

The UI is production-ready and matches your luxury gallery aesthetic! 🎨✨
