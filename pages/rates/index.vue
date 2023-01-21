<template>
  <v-card max-width="400" class="mx-auto my-12 pa-10" elevation="0">
    <h3>ຈັດການອັດຕາແລກປ່ຽນ</h3>
    <v-form class="mt-5">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="rate"
            :rules="[(v) => !!v || 'ຈຳເປັນ']"
            outlined
            dense
            label="ອັດຕາການແລກປ່ຽນ"
            hint="ອັດຕາການແລກປ່ຽນ USD/KIP"
            type="number"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" @click="add">ບັນທຶກ</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-card v-if="rates.length > 0" class="mt-10" elevation="1">
      <v-card-title>ອັດຕາການແລກປ່ຽນ</v-card-title>
      <v-card-subtitle
        >ອັດເດດ
        {{
          $moment(rates[0].created_at).format("YYYY-MM-DD HH:mm:ss")
        }}</v-card-subtitle
      >
      <v-card-text>USD/LAK: {{ rates[0].rate }}</v-card-text>
    </v-card>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      rate: null,
    };
  },
  computed: {
    rates() {
      return this.$store.state.rates.rates;
    },
  },
  mounted() {
    this.$store.dispatch("rates/rates");
  },
  methods: {
    add() {
      this.$store.dispatch("rates/createRates", {
        rate: parseFloat(this.rate),
      });
    },
  },
};
</script>
