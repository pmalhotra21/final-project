// Fetch JSON data and display the last order
async function fetchAndDisplayOrder() {
  const url = 'https://raw.githubusercontent.com/pmalhotra21/milkshake_data/main/orders.json'; // GitHub raw file URL
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch order data.');
    }

    const orders = await response.json();

    // Assuming the last order is the most recent in the JSON array
    const lastOrder = orders[orders.length - 1];

    // Format the order details
    const orderDetails = `
        Name: ${lastOrder.name}
        Phone: ${lastOrder.phone}
        Milkshake: ${lastOrder.milkshake}
        Extras: ${lastOrder.extras.join(', ') || 'None'}
        Size: ${lastOrder.size}
        Food: ${lastOrder.food}
        Pickup Date: ${lastOrder.pickupDate}
        Pickup Time: ${lastOrder.pickupTime}
        Special Instructions: ${lastOrder.specialInstructions || 'None'}
    `;

    // Display the order in the pre tag
    document.getElementById('edited-order').textContent = orderDetails;
  } catch (error) {
    console.error('Error loading order:', error);
    document.getElementById('edited-order').textContent = 'Failed to load order data.';
  }
}

// Load last order functionality
document.getElementById('load-order').addEventListener('click', fetchAndDisplayOrder);

// Form submission handling
document.getElementById('order-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Get form data
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const milkshake = document.getElementById('milkshake').value;
  const extras = [...document.querySelectorAll('input[name="extras"]:checked')].map(input => input.value);
  const size = document.querySelector('input[name="size"]:checked') ? document.querySelector('input[name="size"]:checked').value : 'None';
  const food = document.getElementById('food').value;
  const pickupDate = document.getElementById('pickup-date').value;
  const pickupTime = document.getElementById('pickup-time').value;
  const specialInstructions = document.getElementById('special-instructions').value;

  // Format the order details
  const orderDetails = `
      Name: ${name}
      Phone: ${phone}
      Milkshake: ${milkshake}
      Extras: ${extras.join(', ') || 'None'}
      Size: ${size}
      Food: ${food}
      Pickup Date: ${pickupDate}
      Pickup Time: ${pickupTime}
      Special Instructions: ${specialInstructions || 'None'}
  `;

  // Display the order in the pre tag
  document.getElementById('edited-order').textContent = orderDetails;
});
