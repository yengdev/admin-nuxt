<template>
  <v-container>
    <h1 class="dark--text lighten-5">ສ້າງປະເພດສິນຄ້າໃໝ່</h1>
    <v-card class="pb-10">
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="form.lao_name"
              label="ປະເພດສິນຄ້າພາສາລາວ"
              hide-details="auto"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="form.eng_name"
              label="ປະເພດສິນຄ້າພາສາອັງກິດ"
              hide-details="auto"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-btn color="primary" small @click="create">ບັນທຶກ</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        lao_name: null,
        eng_name: null,
      },
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories.categories;
    },
  },
  watch: {
    categories(value) {
      if (value.length > 0) {
        const product = value[0];
        this.form.lao_name = product.name_lao;
        this.form.eng_name = product.name_en;
        this.form.id = this.$route.params.index
      }
    },
  },
  mounted() {
    this.$store.dispatch("categories/category", this.$route.params.index);
  },
  methods: {
    create() {
        this.$store.dispatch("categories/update", this.form);
    },
  },
};
</script>
