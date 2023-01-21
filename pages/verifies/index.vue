<template>
  <div>
    <v-card flat>
      <v-card-title> QR Code Scanner </v-card-title>
      <v-card-text>
        <v-row justify="center">
          <v-col cols="3">
            <qrcode-stream v-if="true" @decode="onDecode"></qrcode-stream>
          </v-col>
          <v-col cols="9">
            <v-card elevation="0" class="py-0">
              <v-card-text>
                <v-text-field
                  v-model="qrCode"
                  dense
                  outlined
                  label="Ticket QR Code"
                  placeholder="ຍິງ QR Code ຂອງປິ້ເຂົ້າຊົມ"
                  @keyup.enter.native="getTicket"
                ></v-text-field>
                <div v-if="ticket.ticket">
                  <v-chip
                    v-if="
                      $moment().diff(ticket.ticket.created_at, 'days') === 0
                    "
                    color="success"
                  >
                    ສາມາດນຳໃຊ້ໄດ້
                  </v-chip>
                  <v-chip v-else color="error"> ບໍ່ສາມາດນຳໃຊ້ໄດ້ </v-chip>
                </div>
              </v-card-text>
            </v-card>
            <v-card
              elevation="0"
              :loading="false"
              :disabled="false"
              class="px-10 py-0"
            >
              <v-container v-if="ticket.ticket">
                <v-row>
                  <v-col cols="6">
                    <p>
                      ປະເພດຂອງປີ້:
                      <v-chip small>{{ ticket.ticket.ticket_name }}</v-chip>
                    </p>
                    <p>
                      ລາຄາ:
                      <v-chip small>{{
                        ticket.ticket.order_ticket_price
                      }}</v-chip>
                    </p>
                    <p>
                      ຈຳນວນ:
                      <v-chip small>{{ ticket.ticket.ticket_quantity }}</v-chip>
                    </p>
                    <p>
                      ວັນທີນຳໃຊ້:
                      <v-chip small>{{
                        $moment(ticket.ticket.using_date).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )
                      }}</v-chip>
                    </p>
                    <p>
                      ວັນທີສັ່ງຊື້:
                      <v-chip small>{{
                        $moment(ticket.ticket.created_at).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )
                      }}</v-chip>
                    </p>
                    <v-divider></v-divider>
                    <p>ລາຍຊື່ຜູ້ນຳໃຊ້</p>
                    <ol v-if="ticket.ticket_detail">
                      <li v-for="(item, i) in ticket.ticket_detail" :key="i">
                        {{ item.ticket_owner_name }}
                      </li>
                    </ol>
                  </v-col>
                  <v-col cols="6">
                    <v-chip
                      :color="`${ticket.ticket ? 'primary' : 'error'}`"
                      class="mt-5"
                      >{{ `${ticket.ticket ? "CORRECT" : "FAILED"}` }}</v-chip
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Verify",
  middleware: "auth",
  data() {
    return {
      qrCode: null,
      status: false,
    };
  },
  computed: {
    ticket() {
      return this.$store.state.global.ticket;
    },
  },
  methods: {
    onDecode(e) {
      if (e) {
        this.show = false;
        this.qrCode = e;
        this.getTicket()
      }
    },
    async getTicket() {
      let status = await this.$store.dispatch("global/ticket", this.qrCode);
      if (status) {
        this.status = true;
        this.qrCode = null;
      } else {
        this.status = false;
      }
    },
  },
};
</script>
