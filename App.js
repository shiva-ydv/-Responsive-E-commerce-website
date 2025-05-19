// Mobile Menu Toggle
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}


// Function to handle image click events
function changeMainImage() {
    // Get all small images
    const smallImages = document.querySelectorAll('.small-img');
    
    // Get the main image
    const mainImage = document.getElementById('MainImg');
    
    // Add click event to each small image
    smallImages.forEach(smallImg => {
        smallImg.addEventListener('click', function() {
            // Get the src of the clicked small image
            const newSrc = this.getAttribute('src');
            
            // Update the main image src
            mainImage.setAttribute('src', newSrc);
            
            // Optional: Add active class to highlight selected thumbnail
            smallImages.forEach(img => img.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Call the function when the page loads
window.onload = function() {
    changeMainImage();
    
    // Optional: Set the first small image as active initially
    document.querySelector('.small-img').classList.add('active');
};

// cart page script//

document.addEventListener('DOMContentLoaded', function() {
    try {
        const cartTable = document.querySelector('#cart table');
        if (!cartTable) return;
        
        // Update prices function
        const updatePrices = () => {
            let subtotal = 0;
            let hasErrors = false;
            
            document.querySelectorAll('#cart table tbody tr').forEach(row => {
                try {
                    const priceCell = row.querySelector('td:nth-child(4)');
                    const quantityInput = row.querySelector('td:nth-child(5) input');
                    const totalCell = row.querySelector('td:nth-child(6)');
                    
                    if (!priceCell || !quantityInput || !totalCell) {
                        hasErrors = true;
                        return;
                    }
                    
                    const price = parseFloat(priceCell.textContent.replace(/[^0-9.-]/g, ''));
                    const quantity = parseInt(quantityInput.value) || 0;
                    const rowTotal = price * quantity;
                    
                    totalCell.textContent = '$' + rowTotal.toFixed(2);
                    subtotal += rowTotal;
                } catch (e) {
                    hasErrors = true;
                    console.error('Error calculating row total:', e);
                }
            });
            
            if (!hasErrors) {
                const subtotalCells = document.querySelectorAll('#subtotal table td:last-child');
                if (subtotalCells.length >= 3) {
                    subtotalCells[0].textContent = '$' + subtotal.toFixed(2);
                    subtotalCells[2].textContent = '$' + subtotal.toFixed(2);
                }
            }
        };
        
        // Add event listeners
        document.querySelectorAll('#cart table tbody tr td input[type="number"]').forEach(input => {
            input.addEventListener('change', updatePrices);
            input.addEventListener('input', updatePrices); // For real-time updates
        });
        
        // Initialize
        updatePrices();
        
    } catch (e) {
        console.error('Cart initialization error:', e);
    }
});