<template>
  <v-container>
    <v-card flat>
      <v-card-title>ຂາຍສິນຄ້າ</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="barcode"
              outlined
              dense
              label="ບາໂຄດ - QR Code"
              @keyup.enter="onSearch"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="barcode"
              :items="products"
              item-value="barcode"
              outlined
              dense
              label="ຄົ້ນຫາໂດຍຊື່ສິນຄ້າ"
            >
              <template v-slot:item="{ item }">
                <v-img
                  :src="`${$config.API_DOMAIN}/image/${item.url}`"
                  max-width="20"
                >
                </v-img>
                {{ limit(item.product_name_en, 25) }}
              </template>
              <template v-slot:selection="{ item }">
                <v-img
                  :src="`${$config.API_DOMAIN}/image/${item.url}`"
                  max-width="20"
                >
                </v-img>
                {{ limit(item.product_name_en, 25) }}
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn color="primary" @click="onSearch"
              ><v-icon>mdi-magnify</v-icon>ຄົ້ນຫາ</v-btn
            >
          </v-col>
          <v-col cols="12" md="4" class="my-0 py-0">
            <v-checkbox
              v-model="manualQuantity"
              label="ປ້ອນຈຳນວນເອງ"
            ></v-checkbox>
            <v-text-field
              v-if="manualQuantity"
              v-model="buyQuantity"
              outlined
              dense
              label="ຈຳນວນ"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="my-0 py-0">
        <h3>ສິນຄ້າທີ່ເລືອກໄວ້</h3>
        <v-data-table
          dense
          :headers="headers"
          :items="productInTable"
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
          <template slot="body.append">
            <tr>
              <th colspan="3">Total</th>
              <th>{{ sumField("product_price", "buyQty") }}</th>
            </tr>
          </template>
        </v-data-table>
        <v-card-actions>
          <!-- <v-btn color="primary" small @click="dialog = true">
            <v-icon small>mdi-cash-multiple</v-icon> ຢືນຢັນການຂາຍ</v-btn
          > -->
          <v-alert>
            <button v-if="true" v-print="'#printMe'" @click="confirm">
              ຂາຍ
            </button>
          </v-alert>
        </v-card-actions>
      </v-card-text>
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
    <div v-if="true" id="printMe" class="d-none">
      <v-container>
        <v-card flat>
          <v-card-title
            ><v-spacer></v-spacer>
            <div class="text-h2">ລາຍການສັ່ງຊື້</div>
            <v-spacer></v-spacer
          ></v-card-title>
          <v-card-text>
            <div class="text-h6">
              Order Date: {{ $moment().format("YYYY-MM-DD HH:mm:ss") }}
            </div>
            <div class="text-h6">
              ວັນທີສັ່ງຊື້: {{ $moment().format("YYYY-MM-DD HH:mm:ss") }}
            </div>
          </v-card-text>
          <v-card-text>
            <v-data-table
              dense
              :headers="[...headers]"
              :items="productInTable"
              :hide-default-footer="true"
            >
              <template #[`item.totalPrice`]="{ item }">
                {{ item.buyQty * item.product_price }}
              </template>
              <template slot="body.append">
                <tr>
                  <th colspan="3">Total</th>
                  <th>{{ sumField("product_price", "buyQty") }}</th>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import print from "vue-print-nb";
export default {
  directives: {
    print,
  },
  data: () => ({
    dialog: false,
    manualQuantity: false,
    buyQuantity: 0,
    middleware: "auth",
    barcode: "",
    productInTable: [],
    headers: [
      { text: "ຊື່ສິນຄ້າ", value: "product_name_en" },
      { text: "ລາຄາ", value: "product_price" },
      { text: "ຈຳນວນ", value: "buyQty" },
      { text: "ລາຄາລວມ", value: "totalPrice" },
      { text: "ຈັດການ", value: "removeItem" },
    ],
  }),
  computed: {
    products() {
      return this.$store.state.products.products;
    },
    rates() {
      return this.$store.state.rates.rates;
    },
  },
  mounted() {
    this.$store.dispatch("products/products");
  },
  methods: {
    limit(string = "", limit = 0) {
      return string.substring(0, limit);
    },
    async onSearch() {
      if (!this.barcode) {
        return;
      }
      const filter = this.products.filter((el) => el.barcode === this.barcode);
      if (filter.length === 0) return;
      const filterProductInTable = this.productInTable.filter(
        (el) => el.barcode === this.barcode
      );

      if (filterProductInTable.length > 0) {
        const objIndex = this.productInTable.findIndex(
          (obj) => obj.barcode == this.barcode
        );

        if (this.manualQuantity) {
          this.productInTable[objIndex].buyQty =
            this.productInTable[objIndex].buyQty + parseFloat(this.buyQuantity);
        } else {
          this.productInTable[objIndex].buyQty =
            this.productInTable[objIndex].buyQty + 1;
        }
      } else {
        this.productInTable = [
          ...this.productInTable,
          { ...filter[0], buyQty: 1 },
        ];
      }
    },
    removeItem(id) {
      const objIndex = this.productInTable.findIndex((obj) => obj.id == id);
      this.productInTable.splice(objIndex, 1);
    },
    sumField(key1, key2) {
      let result = this.productInTable.reduce((sum, currentItem) => {
        return sum + currentItem[key1] * currentItem[key2];
      }, 0);
      return result || 0;
    },
    async confirm() {
      this.dialog = false;
      const products = this.productInTable.map((data) => {
        return {
          product_id: data.id,
          product_price: data.product_price,
          product_quantity: data.buyQty,
        };
      });

      const form = {};
      form.products = [...products];
      form.rate = this.rates[0].rate;
      if (products.length > 0) {
        await this.$store.dispatch("orders/adminOrder", form);
      }

      this.productInTable.length = [];
      this.$router.push("/");
    },
  },
};
</script>
