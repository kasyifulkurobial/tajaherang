<template>
  <Bar :data="chartData" :options="options" />
</template>

<script>
import { Bar } from 'vue-chartjs';
import formatCurrency from "@/utils/formatCurrency";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ["Pemasukan", "Pengeluaran"],
        datasets: [
          {
            label: "Total",
            backgroundColor: ["#3E49A9", "#AF52E8"],
            data: [14000000, 7500000], // Kiri pemasukan kanan pengeluaran
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Sembunyikan label legenda
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return formatCurrency(context.raw);
              },
            },
          },
        },
        scales: {
          y: {
            ticks: {
              callback: function (value) {
                return formatCurrency(value);
              },
            },
          },
        },
      },
    };
  },
};

</script>
