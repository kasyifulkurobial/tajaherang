// src/utils/formatCurrency.js

function formatCurrency(value) {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + " juta"; // Menampilkan dalam juta
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + " ribu"; // Menampilkan dalam ribu
  }
  return value.toLocaleString("id-ID", { style: "currency", currency: "IDR" }); // Format IDR
}

export default formatCurrency;
