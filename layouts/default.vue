<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <div v-for="(item, i) in items" :key="i">
          <v-list-group v-if="!item.to" :value="false">
            <template v-slot:prependIcon>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
            <template v-slot:activator>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </template>
            <v-list-group
              v-for="(subItem, subI) in item.children"
              :key="subI"
              no-action
              sub-group
            >
              <template v-slot:prependIcon>
                <span></span>
              </template>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-btn
                    style="background-color: white"
                    :to="subItem.to"
                    elevation="0"
                  >
                    <v-icon>{{ subItem.icon }}</v-icon>
                    <v-list-item-title class="ml-2">{{
                      subItem.title
                    }}</v-list-item-title>
                  </v-btn>
                </v-list-item-content>
              </template>
            </v-list-group>
          </v-list-group>

          <v-list-item v-else :to="item.to" router exact>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>

        <v-list-item router exact @click="logout()">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ອອກຈາກລະບົບ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <h3>ລະບົບຈັດການຫໍພິພິຕະພັນວຽງຈັນ</h3>
      <v-spacer></v-spacer>
      <v-chip color="primary" v-if="rates.length > 0"
        >ອັດຕາແລກປ່ຽນ USD/LAK (
        {{
          $currencyJs(rates[0].rate, {
            separator: ",",
          }).format()
        }}
        )
      </v-chip>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      items: [],
    };
  },
  computed: {
    rates() {
      return this.$store.state.rates.rates;
    },
    loading() {
      return this.$store.state.globals.loading;
    },
    itemss() {
      return [
        {
          icon: "mdi-apps",
          title: "ໜ້າທຳອິດ",
          to: "/",
        },
        {
          icon: "mdi-barcode-scan",
          title: "ຂາຍໜ້າຮ້ານ",
          to: "/sells",
        },
        {
          icon: "mdi-image-filter-vintage",
          title: "ຈັດການຂໍ້ມູນ",
          children: [
            {
              icon: "mdi-account-multiple-plus",
              title: "ພະນັກງານ",
              to: "/staffs",
            },
            {
              icon: "mdi-human-male-female",
              title: "ລູກຄ້າ",
              to: "/customers",
            },
            {
              icon: "mdi-account-multiple-plus",
              title: "ຜູ້ສະໜອງສິນຄ້າ",
              to: "/supplier",
            },
            {
              icon: "mdi-account-multiple-plus",
              title: "ອັດຕາແລກປ່ຽນ",
              to: "/rates",
            },
            {
              icon: "mdi-chart-bubble",
              title: "ປະເພດສິນຄ້າ",
              to: "/categories",
            },
            {
              icon: "mdi-dropbox",
              title: "ສິນຄ້າ",
              to: "/products",
            },
            {
              icon: "mdi-newspaper",
              title: "ງານກິດຈະກຳ",
              to: "/news",
            },
            {
              icon: "mdi-newspaper",
              title: "ງານສິນລະປະ",
              to: "/services",
            },
          ],
        },
        {
          icon: "mdi-cart",
          title: "ການສັ່ງຊື້",
          to: "/orders",
        },

        {
          icon: "mdi-package-variant",
          title: "ນຳເຂົ້າສິນຄ້າ",
          to: "/stocks",
        },

        {
          icon: "mdi-book-open-page-variant",
          title: "ການລາຍງານ",
          to: "/reports",
        },
        {
          icon: "mdi-qrcode",
          title: "Verify Ticket",
          to: "/verifies",
        },
      ];
    },
  },
  watch: {
    role(value) {
      console.log(value);
    },
  },
  mounted() {
    // getting rate exchange
    // this.$store.dispatch("globals/rates", {
    //   from: "USD",
    //   to: "LAK",
    //   amount: 1,
    // });
    if (
      this.$cookies.get("role") === "super-admin" ||
      this.$cookies.get("role") === "admin"
    ) {
      this.items = [
        {
          icon: "mdi-apps",
          title: "ໜ້າທຳອິດ",
          to: "/",
        },
        {
          icon: "mdi-barcode-scan",
          title: "ຂາຍໜ້າຮ້ານ",
          to: "/sells",
        },
        {
          icon: "mdi-cog-refresh-outline",
          title: "ຈັດການຂໍ້ມູນ",
          children: [
            {
              icon: "mdi-account-multiple-plus",
              title: "ພະນັກງານ",
              to: "/staffs",
            },
            {
              icon: "mdi-human-male-female",
              title: "ລູກຄ້າ",
              to: "/customers",
            },
            {
              icon: "mdi-account-multiple-plus",
              title: "ຜູ້ສະໜອງສິນຄ້າ",
              to: "/supplier",
            },
            {
              icon: "mdi-account-multiple-plus",
              title: "ອັດຕາແລກປ່ຽນ",
              to: "/rates",
            },
            {
              icon: "mdi-chart-bubble",
              title: "ປະເພດສິນຄ້າ",
              to: "/categories",
            },
            {
              icon: "mdi-dropbox",
              title: "ສິນຄ້າ",
              to: "/products",
            },
            {
              icon: "mdi-newspaper",
              title: "ງານກິດຈະກຳ",
              to: "/news",
            },
            {
              icon: "mdi-palette",
              title: "ງານສິນລະປະ",
              to: "/services",
            },
            {
              icon: "mdi-ticket-account",
              title: "ປີ້ເຂົ້າຊົມ",
              to: "/tickets",
            },
          ],
        },
        {
          icon: "mdi-cart",
          title: "ການສັ່ງຊື້",
          to: "/orders",
        },

        {
          icon: "mdi-package-variant",
          title: "ນຳເຂົ້າສິນຄ້າ",
          to: "/stocks",
        },

        {
          icon: "mdi-book-open-page-variant",
          title: "ການລາຍງານ",
          to: "/reports",
        },
        {
          icon: "mdi-qrcode",
          title: "Verify Ticket",
          to: "/verifies",
        },
      ];
    } else if (this.$cookies.get("role") === "staff") {
      this.items = [
        {
          icon: "mdi-apps",
          title: "ໜ້າທຳອິດ",
          to: "/",
        },
        {
          icon: "mdi-barcode-scan",
          title: "ຂາຍໜ້າຮ້ານ",
          to: "/sells",
        },
        {
          icon: "mdi-image-filter-vintage",
          title: "ຈັດການຂໍ້ມູນ",
          children: [
            {
              icon: "mdi-account-multiple-plus",
              title: "ຜູ້ສະໜອງສິນຄ້າ",
              to: "/supplier",
            },
            {
              icon: "mdi-chart-bubble",
              title: "ປະເພດສິນຄ້າ",
              to: "/categories",
            },
            {
              icon: "mdi-dropbox",
              title: "ສິນຄ້າ",
              to: "/products",
            },
            {
              icon: "mdi-newspaper",
              title: "ງານກິດຈະກຳ",
              to: "/news",
            },
            {
              icon: "mdi-newspaper",
              title: "ງານສິນລະປະ",
              to: "/services",
            },
          ],
        },
        {
          icon: "mdi-cart",
          title: "ການສັ່ງຊື້",
          to: "/orders",
        },

        {
          icon: "mdi-package-variant",
          title: "ນຳເຂົ້າສິນຄ້າ",
          to: "/stocks",
        },
        {
          icon: "mdi-qrcode",
          title: "Verify Ticket",
          to: "/verifies",
        },
      ];
    }
    this.$store.dispatch("rates/rates");

    // socket listen
    this.socket = this.$nuxtSocket({
      channel: "/",
    });
    /* Listen for events: */
    this.socket.on("order", (msg, cb) => {
      /* Handle event */
      this.$toast.success("ມີການສັ່ງຊື້ສິນຄ້າໃນລະບົບ");
      this.$store.dispatch("orders/orders", "ORDER");
    });
  },
  methods: {
    logout() {
      this.$cookies.remove("token");
      this.$router.push({ path: "/login" });
    },
  },
};
</script>
