<template>
  <h1>Leaderboard</h1>
  <div>
    <loading :active="loading" :can-cancel="false" :is-full-page="true"></loading>
    <Bar v-if="!loading" :data="leaderboardData" :options="options" :style="{ width: '1000px', minHeight: minHeight }" />
  </div>
</template>
  
<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import Loading from 'vue3-loading-overlay';
import { SCORE_ENDPOINTS } from '../../endpoints';
import { Player } from '../../interfaces'
import { barOptions } from './bar-options'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'Home',
  components: {
    Bar,
    Loading
  },
  data() {
    return {
      leaderboardData: null as null | object,
      options: barOptions,
      minHeight: '500px',
      loading: true
    };
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const apiUrl = import.meta.env.VITE_API_URL;
      fetch(`${apiUrl}${SCORE_ENDPOINTS}`)
        .then((response) => response.json())
        .then((data) => {
          const rawData = data.data;
          this.processRawData(rawData);
        });
    },
    processRawData(rawData: Player[]) {
      if (rawData.length > 0) {
        this.leaderboardData = {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [],
            },
          ],
        }

        let counter = 0;
        rawData.forEach((player: Player, index: number) => {
          const { name, score } = player;
          if (score > 0) {
            (this.leaderboardData as any).labels.push(`(${index + 1}) ${name}`);
            (this.leaderboardData as any).datasets[0].data.push(score);
            (this.leaderboardData as any).datasets[0].backgroundColor.push(this.randomColor() === '#ffffff' ? '#000000' : this.randomColor());
            counter++;
          }
        });

        if (counter >= 15 && counter < 40) {
          this.minHeight = '700px';
        } else if (counter >= 40) {
          this.minHeight = '1000px';
        }

        this.loading = false;
      }
    },
    randomColor() {
      return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }
  }
};
</script>
