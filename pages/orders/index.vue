<template>
  <div>
    <h1>ລາຍການການສັ່ງຊື້</h1>
    <v-card :loading="loading" elevation="0">
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-select
              v-model="filter_status"
              :items="filters"
              label="ສະຖານະ"
              outlined
              dense
            >
            </v-select>
          </v-col>
          <v-col cols="auto">
            <v-btn :to="`/sells`" color="primary">
              <v-icon>mdi-shopping</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-data-table :headers="headers" :items="orders">
        <template #[`item.url`]="{ item }">
          <v-img
            :src="`${$config.API_DOMAIN}/image/${item.url}`"
            max-width="30"
            @click="showDetail(item.order_id)"
          >
          </v-img>
        </template>
        <template #[`item.created_at`]="{ item }">
          <span>{{ $moment(item.created_at).format("YYYY-MM-DD") }}</span>
        </template>
        <template #[`item.actions`]="{ item }">
          <div v-if="item.status === 'ORDER'">
            <v-btn small color="primary" @click="pending(item.order_id)">
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
              ຢືນຢັນ</v-btn
            >
            <v-btn small color="error" @click="cancelItem(item.order_id)">
              <v-icon>mdi-close-circle-outline</v-icon>
              ຍົກເລີກ</v-btn
            >
          </div>
          <div v-if="item.status === 'PENDING'">
            <v-btn small color="primary" @click="shipping(item.order_id)">
              <v-icon>mdi-truck-delivery</v-icon>
              ຈັດສົ່ງ</v-btn
            >
          </div>
          <div v-if="item.status === 'SHIPPING'">
            <v-btn small color="primary" @click="complete(item.order_id)">
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
              ສຳເລັດ</v-btn
            >
            <v-btn small color="error" @click="cancelItem(item.order_id)">
              <v-icon>mdi-close-circle-outline</v-icon>
              ບໍ່ສຳເລັດ</v-btn
            >
          </div>
          <div v-if="item.status === 'CANCEL'">
            <v-chip x-small color="error">ບໍ່ສຳເລັດ</v-chip>
          </div>
          <div v-if="item.status === 'COMPLETE'">
            <v-chip small color="success">ສຳເລັດ</v-chip>
          </div>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="show" persistent max-width="400">
      <v-card>
        <v-card-title class="text-h5" style="font-family: 'Phetsarath OT'">
          ລາຍລະອຽດສິນຄ້າ
        </v-card-title>
        <v-card-text>
          <div v-for="item in detail" :key="item.order_detail_id">
            <div class="d-flex">
              <strong>ຊື່ສິນຄ້າ</strong>
              <span class="ml-5">{{ item.product_name_lao }}</span>
            </div>
            <div class="d-flex">
              <strong>ຈຳນວນ</strong>
              <span class="ml-5">{{ item.product_quantity }}</span>
            </div>
            <div class="d-flex">
              <strong>ລາຄາ</strong>
              <span class="ml-5">{{ item.product_price }}</span>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="show = false"> ປິດ </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Products",
  data() {
    return {
      filter_status: "",
      show: false,
      headers: [
        { text: "ຮູບພາບ", value: "url" },
        { text: "ຊື່ສິນຄ້າ", value: "product_name_en" },
        { text: "ຈຳນວນທີ່ສັ່ງຊື້", value: "order_quantity" },
        { text: "ຈຳນວນສິນຄ້າ", value: "product_quantity" },
        { text: "ລາຄາ", value: "product_price" },
        { text: "ສັ່ງເມື່ອວັນທີ", value: "created_at" },
        { text: "ຈັດການ", value: "actions" },
      ],
      filters: [
        {
          value: "ALL",
          text: "ທັງໝົດ",
        },
        {
          value: "ORDER",
          text: "ສັ່ງຊື້",
        },
        {
          value: "PENDING",
          text: "ກຳລັງລໍຖ້າຈັດສົ່ງ",
        },
        {
          value: "SHIPPING",
          text: "ກຳລັງຈັດສົ່ງ",
        },
        {
          value: "CANCEL",
          text: "ຍົກເລີກ",
        },
        {
          value: "COMPLETE",
          text: "ສຳເລັດແລ້ວ",
        },
      ],
    };
  },
  watch: {
    filter_status(value) {
      this.getItem(value);
    },
  },
  computed: {
    loading() {
      return this.$store.state.orders.loading;
    },
    orders() {
      return this.$store.state.orders.orders;
    },
    rates() {
      return this.$store.state.globals.rates;
    },
    detail() {
      return this.$store.state.orders.detail;
    },
  },
  mounted() {
    this.filter_status = "ORDER";
  },
  methods: {
    async cancelItem(id) {
      await this.$store.dispatch("orders/updateOrder", {
        id,
        status: "CANCEL",
      });
      this.fetch();
    },
    async complete(id) {
      await this.$store.dispatch("orders/updateOrder", {
        id,
        status: "COMPLETE",
      });
      this.fetch();
    },
    async shipping(id) {
      await this.$store.dispatch("orders/updateOrder", {
        id,
        status: "SHIPPING",
      });
      this.fetch();
    },
    async pending(id) {
      await this.$store.dispatch("orders/updateOrder", {
        id,
        status: "PENDING",
      });
      this.fetch();
    },
    getItem(status) {
      this.$store.dispatch("orders/orders", status);
    },
    fetch() {
      this.$store.dispatch("orders/orders", this.filter_status);
    },
    showDetail(id) {
      this.$store.dispatch("orders/ordersDetails", id);
      this.show = true;
    },
  },
};
</script>
