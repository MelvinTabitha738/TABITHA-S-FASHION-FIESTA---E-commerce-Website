// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const searchIcon = document.getElementById('search-icon');
const closeSearch = document.getElementById('close-search');
const searchBox = document.querySelector('.search-box');
const cartIcon = document.getElementById('cart-icon');
const closeCart = document.getElementById('close-cart');
const cartSidebar = document.querySelector('.cart-sidebar');
const backToTop = document.getElementById('back-to-top');
const tryOnBtn = document.getElementById('try-on-btn');
const tryOnModal = document.querySelector('.try-on-modal');
const closeModal = document.querySelector('.close-modal');
const photoUpload = document.getElementById('photo-upload');
const userImage = document.getElementById('user-image');
const outfitItems = document.querySelectorAll('.outfit-item');
const resultImage = document.getElementById('result-image');
const saveBtn = document.getElementById('save-look');
const addToCartBtn = document.getElementById('add-to-cart');
const filterBtns = document.querySelectorAll('.filter-btn');
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterSuccess = document.querySelector('.newsletter-success');
const testimonialDots = document.querySelectorAll('.dot');

// Sample Product Data
const products = [
    {
        id: 1,
        name: 'Floral Summer Dress',
        price: 59.99,
        oldPrice: 79.99,
        image: '/api/placeholder/300/400',
        category: 'dresses',
        badge: 'new',
        rating: 4.5,
        isNew: true,
        isSale: false
    },
    {
        id: 2,
        name: 'Classic Black Blazer',
        price: 89.99,
        oldPrice: 119.99,
        image: '/api/placeholder/300/400',
        category: 'tops',
        badge: 'sale',
        rating: 5,
        isNew: false,
        isSale: true
    },
    {
        id: 3,
        name: 'High-Waist Jeans',
        price: 49.99,
        oldPrice: null,
        image: '/api/placeholder/300/400',
        category: 'bottoms',
        badge: null,
        rating: 4,
        isNew: true,
        isSale: false
    },
    {
        id: 4,
        name: 'Statement Earrings',
        price: 24.99,
        oldPrice: 34.99,
        image: '/api/placeholder/300/400',
        category: 'accessories',
        badge: 'sale',
        rating: 4.5,
        isNew: false,
        isSale: true
    },
    {
        id: 5,
        name: 'Bohemian Maxi Dress',
        price: 69.99,
        oldPrice: null,
        image: '/api/placeholder/300/400',
        category: 'dresses',
        badge: null,
        rating: 4,
        isNew: false,
        isSale: false
    },
    {
        id: 6,
        name: 'Casual White T-Shirt',
        price: 19.99,
        oldPrice: 29.99,
        image: '/api/placeholder/300/400',
        category: 'tops',
        badge: 'sale',
        rating: 4.5,
        isNew: false,
        isSale: true
    },
    {
        id: 7,
        name: 'Leather Handbag',
        price: 79.99,
        oldPrice: null,
        image: '/api/placeholder/300/400',
        category: 'accessories',
        badge: null,
        rating: 5,
        isNew: true,
        isSale: false
    },
    {
        id: 8,
        name: 'Wide-Leg Pants',
        price: 45.99,
        oldPrice: 59.99,
        image: '/api/placeholder/300/400',
        category: 'bottoms',
        badge: 'sale',
        rating: 4,
        isNew: false,
        isSale: true
    }
];

// Sale Products
const saleProducts = products.filter(product => product.isSale);

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Search Box Toggle
    searchIcon.addEventListener('click', () => {
        searchBox.classList.add('active');
    });

    closeSearch.addEventListener('click', () => {
        searchBox.classList.remove('active');
    });

    // Cart Sidebar Toggle
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    // Back to top functionality
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Virtual Try-On Modal
    if (tryOnBtn) {
        tryOnBtn.addEventListener('click', () => {
            tryOnModal.classList.add('active');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            tryOnModal.classList.remove('active');
        });
    }

    // Photo Upload functionality
    if (photoUpload) {
        photoUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    userImage.src = e.target.result;
                    // In a real app, we would send this to a server for processing
                    // But for demo purposes, we'll just show the result image
                    resultImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Outfit selection
    if (outfitItems.length > 0) {
        outfitItems.forEach(item => {
            item.addEventListener('click', function() {
                outfitItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // In a real app, we would replace the result image based on the selected outfit
                // But for demo purposes, we'll just update the result image
                resultImage.src = this.querySelector('img').src;
            });
        });
    }

    // Save Look functionality
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            alert('Look saved to your account!');
        });
    }

    // Add to Cart functionality
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            alert('Item added to your cart!');
            updateCartCount(1);
        });
    }

    // Product filtering
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                if (filter === 'all') {
                    displayProducts(products, document.querySelector('.trending-products'));
                } else {
                    const filteredProducts = products.filter(product => product.category === filter);
                    displayProducts(filteredProducts, document.querySelector('.trending-products'));
                }
            });
        });
    }

    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            
            if (validateEmail(email)) {
                newsletterSuccess.classList.add('active');
                this.reset();
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    newsletterSuccess.classList.remove('active');
                }, 3000);
            } else {
                alert('Please enter a valid email address');
            }
        });
    }

    // Testimonial slider
    if (testimonialDots.length > 0) {
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                const slides = document.querySelectorAll('.testimonial-slide');
                
                testimonialDots.forEach(d => d.classList.remove('active'));
                slides.forEach(s => s.classList.remove('active'));
                
                this.classList.add('active');
                slides[index].classList.add('active');
            });
        });
    }

    // Initialize products
    displayProducts(products, document.querySelector('.product-grid'));
    displayProducts(saleProducts, document.querySelector('.sale-products'));

    // Initialize countdown timer
    startCountdown();
});

// Display Products
function displayProducts(products, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        // Create product badge (new or sale)
        const badgeHtml = product.badge ? 
            `<span class="product-badge ${product.badge}-badge">${product.badge}</span>` : '';
        
        // Create rating stars
        const rating = product.rating;
        let ratingHtml = '<div class="product-rating">';
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(rating)) {
                ratingHtml += '<i class="fas fa-star"></i>';
            } else if (i === Math.floor(rating) && rating % 1 !== 0) {
                ratingHtml += '<i class="fas fa-star-half-alt"></i>';
            } else {
                ratingHtml += '<i class="far fa-star"></i>';
            }
        }
        ratingHtml += '</div>';
        
        // Create price display
        const priceHtml = product.oldPrice ? 
            `<div class="product-price">
                <span class="current-price">$${product.price}</span>
                <span class="old-price">$${product.oldPrice}</span>
            </div>` : 
            `<div class="product-price">
                <span class="current-price">$${product.price}</span>
            </div>`;
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${badgeHtml}
                <div class="product-actions">
                    <button class="quick-view"><i class="fas fa-eye"></i></button>
                    <button class="add-to-cart"><i class="fas fa-shopping-cart"></i></button>
                    <button class="add-to-wishlist"><i class="far fa-heart"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                ${priceHtml}
                ${ratingHtml}
            </div>
        `;
        
        // Add event listeners to product card buttons
        const quickViewBtn = productCard.querySelector('.quick-view');
        const addToCartBtn = productCard.querySelector('.add-to-cart');
        const wishlistBtn = productCard.querySelector('.add-to-wishlist');
        
        quickViewBtn.addEventListener('click', () => {
            openQuickView(product);
        });
        
        addToCartBtn.addEventListener('click', () => {
            addToCart(product);
        });
        
        wishlistBtn.addEventListener('click', () => {
            addToWishlist(product);
        });
        
        container.appendChild(productCard);
    });
}

// Quick View functionality
function openQuickView(product) {
    // In a real app, we would open a modal with product details
    console.log('Quick view for product:', product);
    alert(`Quick view: ${product.name}`);
}

// Add to Cart functionality
function addToCart(product) {
    // In a real app, we would add the product to the cart
    console.log('Added to cart:', product);
    alert(`${product.name} added to your cart!`);
    updateCartCount(1);
}

// Add to Wishlist functionality
function addToWishlist(product) {
    // In a real app, we would add the product to the wishlist
    console.log('Added to wishlist:', product);
    alert(`${product.name} added to your wishlist!`);
    updateWishlistCount(1);
}

// Update Cart Count
function updateCartCount(count) {
    const cartBadge = document.querySelector('#cart-icon + .badge');
    if (cartBadge) {
        const currentCount = parseInt(cartBadge.textContent);
        cartBadge.textContent = currentCount + count;
    }
}

// Update Wishlist Count
function updateWishlistCount(count) {
    const wishlistBadge = document.querySelector('.fa-heart + .badge');
    if (wishlistBadge) {
        const currentCount = parseInt(wishlistBadge.textContent);
        wishlistBadge.textContent = currentCount + count;
    }
}

// Validate Email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Countdown Timer
function startCountdown() {
    // Set the date we're counting down to (3 days from now)
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 3);
    
    // Update the countdown every 1 second
    const x = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        const distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.querySelector('.days').textContent = days.toString().padStart(2, '0');
        document.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
        document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
        
        // If the countdown is finished, clear interval
        if (distance < 0) {
            clearInterval(x);
            document.querySelector('.countdown').innerHTML = "EXPIRED";
        }
    }, 1000);
}