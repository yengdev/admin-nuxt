<template>
  <div>
    <h1>ສິນຄ້າ</h1>
    <v-card :loading="loading" elevation="0">
      <v-card-title>
        <v-btn color="primary" small :to="`/products/create`">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="products">
        <template #[`item.url`]="{ item }">
          <v-img
            :src="`${$config.API_DOMAIN}/image/${item.url}`"
            max-width="100"
            @click="getImage(item.id)"
          >
          </v-img>
        </template>
        <template #[`item.product_price`]="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                small
                class="ma-2"
                color="pink"
                label
                text-color="white"
                v-bind="attrs"
                v-on="on"
                ><v-icon left> mdi-label </v-icon>
                {{ item.product_price }}</v-chip
              >
            </template>
            <span
              >{{ rates.info.rate * parseFloat(item.product_price) }} ກີບ</span
            >
          </v-tooltip>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn icon small :to="`/products/edit/${item.id}`">
            <v-icon small color="primary"> mdi-pencil </v-icon>
          </v-btn>
          <v-btn icon small>
            <v-icon small color="error" @click="deleteItem(item.id)">
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
        <template #[`item.show_only`]="{ item }">
          <v-chip v-if="item.show_only === 1" color="primary" x-small> ແມ່ນ </v-chip>
          <v-chip v-else color="error" x-small> ບໍ່ແມ່ນ </v-chip>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="show" max-width="350">
      <v-card flat max-width="400">
        <v-card-title>ຮູບພາບ</v-card-title>
        <v-carousel hide-delimiters>
          <v-carousel-item v-for="(image, i) in productsImage" :key="i">
            <v-img :src="`${$config.API_DOMAIN}/image/${image.url}`" contain>
            </v-img>
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Products",
  data() {
    return {
      headers: [
        { text: "ຮູບພາບ", value: "url" },
        { text: "ຊື່ພາສາອັງກິດ", value: "product_name_en" },
        { text: "ຊື່ພາສາລາວ", value: "product_name_lao" },
        { text: "ປະເພດສິນຄ້າພາສາອັງກິດ", value: "name_en" },
        { text: "ປະເພດສິນຄ້າພາສາລາວ", value: "name_lao" },
        { text: "ລາຄາ", value: "product_price" },
        { text: "ຈຳນວນສິນຄ້າ", value: "quantity" },
        { text: "ສຳລັບສະແດງ", value: "show_only" },
        { text: "ຈັດການ", value: "actions" },
      ],
      show: false,
    };
  },
  computed: {
    loading() {
      return this.$store.state.products.loading;
    },
    products() {
      return this.$store.state.products.products;
    },
    rates() {
      return this.$store.state.globals.rates;
    },
    productsImage() {
      return this.$store.state.products.productsImage;
    },
  },
  mounted() {
    this.$store.dispatch("products/products");
  },
  methods: {
    async deleteItem(id) {
      if (window.confirm("ທ່ານຕ້ອງການຈະລົບລາຍການນີ້ບໍ?")) {
        await this.$store.dispatch("products/delete", id);
        this.$store.dispatch("products/products");
      }
    },
    async getImage(id) {
      this.show = true;
      await this.$store.dispatch("products/productImages", id);
    },
  },
};
</script>
