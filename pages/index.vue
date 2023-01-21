<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card flat>
        <v-card-title class="headline text-center"
          >ສະບາຍດີ, ລະບົບຈັດການຫໍພິພິຕະພັນວຽງຈັນ
        </v-card-title>
        <v-card-text>
          <div>
            <client-only placeholder="Loading...">
              <line-chart
                :chart-data="barChartData"
                :height="100"
                :width="300"
                chart-id="lineChart"
              />
            </client-only>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",
  middleware: "auth",
  data() {
    return {
      barChartData: {
        labels: [
          "2019-06",
          "2019-07",
          "2019-08",
          "2019-09",
          "2019-10",
          "2019-11",
          "2019-12",
          "2020-01",
          "2020-02",
          "2020-03",
        ],
        datasets: [
          {
            label: "ເສັ້ນສະແດງລາຍຮັບ",
            data: [2, 1, 16, 3, 4, 5, 0, 0, 4, 12, 2],
            backgroundColor: "rgba(20, 255, 0, 0.3)",
            borderColor: "rgba(0, 0, 0, 1)",
            borderWidth: 2,
          },
        ],
        barChartOptions: {
          responsive: true,
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Google analytics data",
            fontSize: 24,
            fontColor: "#6b7280",
          },
          tooltips: {
            backgroundColor: "#17BF62",
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: true,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: 7,
                  min: 0,
                  stepSize: 1,
                },
                gridLines: {
                  display: true,
                },
              },
            ],
          },
        },
      },
    };
  },
};
</script>
