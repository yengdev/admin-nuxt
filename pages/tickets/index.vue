<template>
  <div>
    <v-card width="500" class="mx-auto" flat>
      <v-card-title>ປີ້ເຂົ້າຊົມ</v-card-title>
      <v-card-text>
        <v-row v-if="tickets.length > 0">
          <v-col v-for="item in tickets" :key="item.ticket_id" cols="12" md="6">
            <v-card elevation="1">
              <div class="d-flex">
                <v-spacer></v-spacer>
                <v-btn icon small @click="select(item)">
                  <v-icon small> mdi-pencil </v-icon>
                </v-btn>
              </div>
              <v-card-text>
                <div>
                  <span>ຊື່ປີ້</span>
                  <strong>{{ item.ticket_name }}</strong>
                </div>
                <div>
                  <span>ລາຄາ</span>
                  <strong>{{ item.ticket_price }} (USD)</strong>
                </div>
                <div>
                  <span>ລາຍລະອຽດ</span>
                  <strong class="text-caption">{{
                    item.ticket_description_en
                  }}</strong>
                </div>
                <div>
                  <span>ຈຳກັດຈຳນວນຄົນ</span>
                  <strong>{{ item.limit_perday }}</strong>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="show" max-width="350">
      <v-card flat max-width="400">
        <v-card-title>ຮູບພາບ</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="form.ticket_name"
            dense
            label="ຊື່"
            outlined
          ></v-text-field>
          <v-textarea
            v-model="form.ticket_description_en"
            dense
            label="ລາຍລະອຽດ"
            outlined
          ></v-textarea>
          <v-text-field
            v-model="form.ticket_price"
            dense
            label="ລາຄາ (USD)"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="form.limit_perday"
            dense
            label="ຈຳນວນຄົນ"
            outlined
          ></v-text-field>
          <v-btn class="mt-5" color="primary" block @click="update"
            >ບັນທຶກ</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      form: {},
    };
  },
  computed: {
    tickets() {
      return this.$store.state.tickets.tickets;
    },
  },
  mounted() {
    this.$store.dispatch("tickets/tickets");
  },
  methods: {
    select(item) {
      this.form = { ...item };
      this.show = true;
    },
    async update() {
      await this.$store.dispatch("tickets/updateTickets", this.form);
      await this.$store.dispatch("tickets/tickets");
      this.show = false;
    },
  },
};
</script>
