<template>
  <v-container>
    <v-card flat>
      <v-card-title>
        ເພີ່ມສິນຄ້າ

        <v-btn small color="primary" class="ml-5" to="products/create">
          <v-icon>mdi-loupe</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle>ກະລຸນາເພີ່ມສິນຄ້າທີ່ມີໃນລະບົບ</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="barcode"
              label="ບາໂຄດສິນຄ້າ"
              hint="ກະລຸນາຍິງບາໂຄດສິນຄ້າ"
              outlined
              dense
              @keyup.enter.native="getProduct"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="manualNumber"
              label="ເພີ່ມຈຳນວນສິນຄ້າ"
              type="number"
              hint="ຖ້າສິນຄ້າມີຈຳນວນຫຼາຍ ທ່ານສາມາດເພີ່ມຈຳນວນສິນໄດ້"
              dense
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-btn color="primary" @click="getProduct">ເພີ່ມ</v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-text>
        <h3>ລາຍການສິນຄ້ານຳເຂົ້າ</h3>
        <v-data-table
          dense
          :headers="headers"
          :items="list"
          :hide-default-footer="true"
        >
          <template #[`item.totalPrice`]="{ item }">
            {{ item.buyQty * item.product_price }}
          </template>
          <template #[`item.removeItem`]="{ item }">
            <v-btn icon small color="error" @click="removeItem(item.id)">
              <v-icon small>mdi-delete-empty</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" small @click="dialog = true">
          ຢືນຢັນການນຳເຂົ້າ</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <v-card-title class="text-h5">
          ກະລຸນາກົດຢືນຢັນເພື່ອນຳເຂົ້າສິນຄ້າ
        </v-card-title>

        <v-card-text> ຫລັງຈາກຢືນຢັນແລ້ວທ່ານບໍ່ສາມາດຍ້ອນກັບໄດ້ </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            ຍົກເລີກ
          </v-btn>

          <v-btn color="green darken-1" text @click="confirm"> ຕົກລົງ </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      barcode: "",
      manualNumber: 0,
      list: [],
      headers: [
        { text: "ຊື່ສິນຄ້າ", value: "product_name_en" },
        { text: "ຈຳນວນ", value: "buyQty" },
        { text: "ຈັດການ", value: "removeItem" },
      ],
    };
  },
  watch: {
    list: {
      deep: true,
      handler(value) {
        const clone = JSON.parse(JSON.stringify(value));
        this.$store.dispatch("products/addList", clone);
      },
    },
  },
  computed: {
    product() {
      return this.$store.state.products.productsStockList;
    },
    listProducts() {
      return this.$store.state.products.list;
    },
  },
  mounted() {
    if (this.listProducts.length > 0) {
      console.log(this.listProducts);
      const clone = JSON.parse(JSON.stringify(this.listProducts));
      this.list = clone;
    }
  },
  methods: {
    async getProduct() {
      const product = await this.$store.dispatch(
        "products/productBarcode",
        this.barcode
      );
      if (product.length === 0) {
        this.$router.push("products/create");
      }

      if (this.list.length === 0) {
        const data = { ...product[0], buyQty: 1 };
        this.list = [...this.list, data];
      } else {
        const filter = this.list.filter((el) => el.barcode === this.barcode);
        if (filter.length === 0) {
          this.list = [...this.list, { ...product[0], buyQty: 1 }];
        } else {
          const objIndex = this.list.findIndex(
            (obj) => obj.barcode == this.barcode
          );
          if (this.manualNumber) {
            this.list[objIndex].buyQty =
              this.list[objIndex].buyQty + parseFloat(this.manualNumber);
          } else {
            const qty = this.list[objIndex].buyQty;
            this.list[objIndex].buyQty = parseFloat(qty) + 1;
          }
        }
        this.manualNumber = 0;
      }
    },
    removeItem(id) {
      const objIndex = this.list.findIndex((obj) => obj.id == id);
      this.list.splice(objIndex, 1);
    },
    confirm() {
      this.$store.dispatch("products/addStock", {products: this.list});
      // this.dialog = false;
      // this.list.length = [];
    },
  },
};
</script>
