<template>
  <div>
    <v-card flat>
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in tabItems" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in tabItems" :key="item">
          <!-- Order Report -->
          <v-card v-if="tab === 0 || tab === 4" flat>
            <v-card-title>ລາຍງານການສັ່ງຊື້ສິນຄ້າ</v-card-title>
            <v-card-subtitle>ການສັ່ງຊື້ສິນຄ້າທັງໝົດ</v-card-subtitle>
            <v-card-text>
              <v-divider></v-divider>
            </v-card-text>
            <v-card-text>
              <v-row>
                <v-col cols="auto">
                  <v-btn fab x-small color="primary" @click="downloadProduct">
                    <v-icon>mdi-download-outline</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select
                    v-model="filter_status"
                    :items="filters"
                    label="ສະຖານະ"
                    dense
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <date-picker :date.sync="startDate" label="ວັນທີເລີ່ມຕົ້ນ" />
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <date-picker :date.sync="endDate" label="ວັນທີສິ້ນສຸດ" />
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-btn
                    color="primary"
                    dense
                    hide-details="auto"
                    @click="search"
                  >
                    <v-icon>mdi-magnify</v-icon>
                    ຄົ້ນຫາ
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="items">
              <v-data-table
                dense
                :headers="headers"
                :items="items.report"
                item-key="name"
                class="elevation-0"
              >
                <template #[`item.created_at`]="{ item }">
                  <span>{{
                    $moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")
                  }}</span>
                </template>
                <template #[`item.total_price`]="{ item }">
                  {{
                    $currencyJs(item.total_price, {
                      separator: ",",
                    }).format()
                  }}
                  <v-chip x-small>USD</v-chip>
                </template>
                <template #[`item.rate`]="{ item }">
                  {{
                    $currencyJs(item.rate, {
                      separator: ",",
                      symbol: "",
                    }).format()
                  }}
                </template>
                <template #[`item.total_price_kip`]="{ item }">
                  {{
                    $currencyJs(item.total_price_kip, {
                      separator: ",",
                      symbol: "",
                    }).format()
                  }}
                  <v-chip x-small>LAK</v-chip>
                </template>
                <template slot="body.append">
                  <tr>
                    <td colspan="4">Total</td>
                    <td>
                      {{
                        $currencyJs(items.total[0].total_price, {
                          separator: ",",
                          symbol: "",
                        }).format()
                      }}
                      <v-chip x-small>USD</v-chip>
                    </td>
                    <td>
                      {{
                        $currencyJs(items.total[0].total_price_kip, {
                          separator: ",",
                          symbol: "",
                        }).format()
                      }}
                      <v-chip x-small>LAK</v-chip>
                    </td>
                    <td></td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
          <!-- Ticket report -->
          <v-card v-if="tab === 2" flat>
            <v-card-title>ລາຍງານການສັ່ງຊື້ປີ້</v-card-title>
            <v-card-subtitle
              >ການສັ່ງຊື້ປີ້ທັງໝົດຜ່ານ Mobile Application</v-card-subtitle
            >
            <v-card-text>
              <v-divider></v-divider>
            </v-card-text>
            <v-card-text>
              <v-row>
                <v-col cols="auto">
                  <v-btn fab x-small color="primary" @click="downloadProduct">
                    <v-icon>mdi-download-outline</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <date-picker :date.sync="startDate" label="ວັນທີເລີ່ມຕົ້ນ" />
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <date-picker :date.sync="endDate" label="ວັນທີສິ້ນສຸດ" />
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-btn
                    color="primary"
                    dense
                    hide-details="auto"
                    @click="search"
                  >
                    <v-icon>mdi-magnify</v-icon>
                    ຄົ້ນຫາ
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="items">
              <v-data-table
                dense
                :headers="headersTicket"
                :items="items.report"
                item-key="name"
                class="elevation-0"
              >
                <template #[`item.created_at`]="{ item }">
                  <span>{{
                    $moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")
                  }}</span>
                </template>
                <template #[`item.rate`]="{ item }">
                  {{
                    $currencyJs(item.rate, {
                      separator: ",",
                      symbol: "",
                    }).format()
                  }}
                </template>
                <template #[`item.total_price`]="{ item }">
                  {{ item.total_price }} <v-chip x-small>USD</v-chip>
                </template>
                <template #[`item.total_price_kip`]="{ item }">
                  {{
                    $currencyJs(item.total_price_kip, {
                      separator: ",",
                      symbol: "",
                    }).format()
                  }}
                  <v-chip x-small>LAK</v-chip>
                </template>
                <template slot="body.append">
                  <tr>
                    <td colspan="4">Total</td>
                    <td>
                      {{
                        $currencyJs(items.total[0].total_price, {
                          separator: ",",
                        }).format()
                      }}
                      <v-chip x-small>USD</v-chip>
                    </td>
                    <td>
                      {{
                        $currencyJs(items.total[0].total_price_kip, {
                          separator: ",",
                        }).format()
                      }}
                      <v-chip x-small>LAK</v-chip>
                    </td>
                    <td></td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
          <!-- The second one -->
          <v-card v-if="tab === 1" flat>
            <v-card-title>ການສັ່ງຊື້ສິນຄ້າຜ່ານຫໍພິພິຕະພັນ</v-card-title>
            <v-card-title>ລາຍງານການສັ່ງຊື້ສິນຄ້າ</v-card-title>
            <v-card-text>
              <v-divider></v-divider>
            </v-card-text>
            <v-card-text>
              <v-row>
                <v-col cols="auto">
                  <v-btn fab x-small color="primary" @click="downloadProduct">
                    <v-icon>mdi-download-outline</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select
                    v-model="filter_status"
                    :items="filters"
                    label="ສະຖານະ"
                    dense
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <date-picker :date.sync="startDate" label="ວັນທີເລີ່ມຕົ້ນ" />
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <date-picker :date.sync="endDate" label="ວັນທີສິ້ນສຸດ" />
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-btn
                    color="primary"
                    dense
                    hide-details="auto"
                    @click="search"
                  >
                    <v-icon>mdi-magnify</v-icon>
                    ຄົ້ນຫາ
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="items">
              <v-data-table
                dense
                :headers="headers"
                :items="items.report"
                item-key="name"
                class="elevation-0"
              >
                <template #[`item.created_at`]="{ item }">
                  <span>{{
                    $moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")
                  }}</span>
                </template>
                <template #[`item.total_price`]="{ item }">
                  {{
                    $currencyJs(item.total_price, {
                      separator: ",",
                    }).format()
                  }}
                  <v-chip x-small>USD</v-chip>
                </template>
                <template #[`item.rate`]="{ item }">
                  {{
                    $currencyJs(item.rate, {
                      separator: ",",
                      symbol: "",
                    }).format()
                  }}
                </template>
                <template #[`item.total_price_kip`]="{ item }">
                  {{
                    $currencyJs(item.total_price_kip, {
                      separator: ",",
                      symbol: "",
                    }).format()
                  }}
                  <v-chip x-small>LAK</v-chip>
                </template>
                <template slot="body.append">
                  <tr>
                    <td colspan="4">Total</td>
                    <td>
                      {{
                        $currencyJs(items.total[0].total_price, {
                          separator: ",",
                          symbol: "",
                        }).format()
                      }}
                      <v-chip x-small>USD</v-chip>
                    </td>
                    <td>
                      {{
                        $currencyJs(items.total[0].total_price_kip, {
                          separator: ",",
                          symbol: "",
                        }).format()
                      }}
                      <v-chip x-small>LAK</v-chip>
                    </td>
                    <td></td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
          <!-- The forth one -->
          <v-card v-if="tab === 3" flat>
            <v-card-title>ຮັບເຄື່ອງ</v-card-title>
            <v-card-text>
              <v-divider></v-divider>
            </v-card-text>
            <v-card-text>
              <v-row>
                <v-col cols="auto">
                  <v-btn fab x-small color="primary" @click="downloadProduct">
                    <v-icon>mdi-download-outline</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <date-picker :date.sync="startDate" label="ວັນທີເລີ່ມຕົ້ນ" />
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <date-picker :date.sync="endDate" label="ວັນທີສິ້ນສຸດ" />
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-btn
                    color="primary"
                    dense
                    hide-details="auto"
                    @click="search"
                  >
                    <v-icon>mdi-magnify</v-icon>
                    ຄົ້ນຫາ
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text v-if="items">
              {{ items }}
            </v-card-text>
          </v-card>
          <!-- The best sell -->
          <v-card v-if="tab === 5" flat>
            <v-card-title>
              ສິນຄ້າຂາຍດີ
              <v-btn
                fab
                x-small
                color="primary"
                class="ml-3"
                @click="downloadProduct"
              >
                <v-icon>mdi-download-outline</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <!-- The mostly done -->
          <v-card v-if="tab === 6" flat>
            <v-card-title>
              ສິນຄ້າໃກ້ໝົດ
              <v-btn
                fab
                x-small
                color="primary"
                class="ml-3"
                @click="downloadProduct"
              >
                <v-icon>mdi-download-outline</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <!-- The left product -->
          <v-card v-if="tab === 7" flat>
            <v-card-title>
              ສິນຄ້າຍັງເຫລືອ
              <v-btn
                fab
                x-small
                color="primary"
                class="ml-3"
                @click="downloadProduct"
              >
                <v-icon>mdi-download-outline</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
          <!-- The ticket left -->
          <v-card v-if="tab === 8" flat>
            <v-card-title
              >ປີ້ທີ່ຍັງເຫລືອໃນມື້ນີ້
              <v-btn
                fab
                x-small
                color="primary"
                class="ml-3"
                @click="downloadProduct"
              >
                <v-icon>mdi-download-outline</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Reports",
  data: () => ({
    tab: 0,
    tabItems: [
      "ສັ່ງຊື້ສິນຄ້າ",
      "ສັ່ງຊື້ສິນຄ້າຜ່ານຫໍພິພິຕະພັນ",
      "ສັ່ງຊື້ປີ້",
      "",
      "ຍອດຂາຍ",
      "ຂາຍດີ",
      "ສິນຄ້າໃກ້ໝົດ",
      "ສິນຄ້າຍັງເຫລືອ",
      "ປີ້ທີ່ຍັງເຫລືອ",
    ],
    filter_status: "COMPLETE",
    startDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    endDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    headers: [
      {
        text: "ຊື່ສິນຄ້າ",
        value: "product_name_en",
      },
      {
        text: "ລາຄາສິນຄ້າ",
        value: "order_detail_price",
      },
      {
        text: "ຈຳນວນສິນຄ້າທີ່ຊື້",
        value: "order_detail_quantity",
      },
      {
        text: "ອັດຕາແລກປ່ຽນ",
        value: "rate",
      },
      {
        text: "ເງີນລວມ USD",
        value: "total_price",
      },
      {
        text: "ເງີນລວມ KIP",
        value: "total_price_kip",
      },
      {
        text: "ວັນທີເດືອນປີສັ່ງຊື້",
        value: "created_at",
      },
    ],
    headersTicket: [
      {
        text: "ລະຫັດປີ້",
        value: "ticket_key",
      },
      {
        text: "ປະເພດຂອງປີ້",
        value: "ticket_name",
      },
      {
        text: "ຈຳນວນປີ້",
        value: "ticket_quantity",
      },
      {
        text: "ອັດຕາແລກປ່ຽນ",
        value: "rate",
      },
      {
        text: "ເງີນລວມ USD",
        value: "total_price",
      },
      {
        text: "ເງີນລວມ KIP",
        value: "total_price_kip",
      },
      {
        text: "ວັນທີເດືອນປີສັ່ງຊື້",
        value: "created_at",
      },
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
  }),
  watch: {
    filter_status() {
      this.search();
    },
    tab(value) {
      this.search();
    },
  },
  computed: {
    items() {
      return this.$store.state.reports.reports;
    },
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      if (this.tab === 2) {
        const data = {
          start_date: this.$moment(this.startDate).format(
            "YYYY-MM-DD 00:00:00"
          ),
          end_date: this.$moment(this.endDate).format("YYYY-MM-DD 23:59:59"),
          status: this.filter_status,
        };
        this.$store.dispatch("reports/reportTickets", data);
      } else if (this.tab === 0 || this.tab === 4) {
        const data = {
          start_date: this.$moment(this.startDate).format(
            "YYYY-MM-DD 00:00:00"
          ),
          end_date: this.$moment(this.endDate).format("YYYY-MM-DD 23:59:59"),
          status: this.filter_status,
        };
        this.$store.dispatch("reports/reports", data);
      } else if (this.tab === 1) {
        const data = {
          start_date: this.$moment(this.startDate).format(
            "YYYY-MM-DD 00:00:00"
          ),
          end_date: this.$moment(this.endDate).format("YYYY-MM-DD 23:59:59"),
          status: this.filter_status,
        };
        this.$store.dispatch("reports/reportSelfOrders", data);
      } else if (this.tab === 5) {
        const data = {
          start_date: this.$moment(this.startDate).format(
            "YYYY-MM-DD 00:00:00"
          ),
          end_date: this.$moment(this.endDate).format("YYYY-MM-DD 23:59:59"),
          status: this.filter_status,
        };
        this.$store.dispatch("reports/bestSeller", data);
      } else if (this.tab === 6) {
        // mostly run out
        const data = {
          start_date: this.$moment(this.startDate).format(
            "YYYY-MM-DD 00:00:00"
          ),
          end_date: this.$moment(this.endDate).format("YYYY-MM-DD 23:59:59"),
          status: this.filter_status,
        };
        this.$store.dispatch("reports/mostlyDone", data);
      } else if (this.tab === 7) {
        // all products
        const data = {
          start_date: this.$moment(this.startDate).format(
            "YYYY-MM-DD 00:00:00"
          ),
          end_date: this.$moment(this.endDate).format("YYYY-MM-DD 23:59:59"),
          status: this.filter_status,
        };
        this.$store.dispatch("reports/existingProduct", data);
      } else if (this.tab === 8) {
        // left tickets
        const data = {
          start_date: this.$moment(this.startDate).format(
            "YYYY-MM-DD 00:00:00"
          ),
          end_date: this.$moment(this.endDate).format("YYYY-MM-DD 23:59:59"),
          status: this.filter_status,
        };
        this.$store.dispatch("reports/remainigTicket", data);
      }
    },
    downloadProduct() {
      let name = this.tabItems[this.tab];
      this.generateExcel(name, this.items.report);
    },
  },
};
</script>
