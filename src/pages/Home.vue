<template>
  <div>
    <h1>Home Page</h1>
    <p>{{ leaderboardData.length }}</p>
  </div>
</template>
  
<script lang="ts">
import { SCORE_ENDPOINTS } from '../endpoints';
import { Player } from '../interfaces'


export default {
  name: 'Home',
  data() {
    return {
      leaderboardData: [] as Player[],
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
          if (rawData.length > 0) {
            rawData.reduce((acc: Player[], cur: Player) => {
              const { score } = cur;
              if (score > 0) {
                acc.push({
                  id: cur.id,
                  name: cur.name,
                  score: cur.score,
                });
              }
              return acc;
            }, this.leaderboardData);
          }
        });
    },
  }
};
</script>

