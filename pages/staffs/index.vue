<template>
  <div>
    <v-card :loading="loading" flat>
      <v-card-title>ພະນັກງານ</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              v-model="form.rules"
              outlined
              dense
              :items="rules"
              label="ປະເພດຂອງສິດ"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.username"
              outlined
              dense
              label="ຊື່ຜູ້ໃຊ້"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="form.password"
              outlined
              dense
              label="ລະຫັດຜ່ານ"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn color="primary" :loading="loading" @click="create()"
              ><v-icon>mdi-account-plus</v-icon> ສ້າງ</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">ຊື່ຜູ້ໃຊ້</th>
              <th class="text-left">ລະຫັດຜ່ານ</th>
              <th class="text-left">ສິດ</th>
              <th class="text-left">ຈັດການ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, i) in staffs" :key="i">
              <th class="text-left">{{ data.username }}</th>
              <th class="text-left">
                ****** <v-btn x-small fab icon><v-icon>mdi-pencil</v-icon></v-btn>
              </th>
              <th class="text-left">{{ data.rule }}</th>
              <th class="text-left">
                <v-switch
                  :disabled="i === 0"
                  label="ປິດໃຊ້ງານ"
                  :input-value="data.active === 1 ? true : false"
                  @click="update(data.id, data.active, i)"
                ></v-switch>
              </th>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-card class="mt-10" flat>
      <v-card-title>ປະເພດສິດການນຳໃຊ້ລະບົບ</v-card-title>
      <v-card-text>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">ປະເພດສິດ</th>
              <th class="text-left">ຄວາມສາມາດ</th>
              <th class="text-left">ແຕ່ລະໜ້າ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="text-left">Super Admin</th>
              <th class="text-left">
                <div class="d-flex">
                  <v-checkbox
                    :disabled="true"
                    :input-value="true"
                    label="ທຸກຢ່າງ"
                  ></v-checkbox>
                  <v-checkbox
                    :disabled="true"
                    :input-value="true"
                    label="ເພີ່ມ"
                  ></v-checkbox>
                  <v-checkbox
                    :disabled="true"
                    :input-value="true"
                    label="ເບີ່ງ"
                  ></v-checkbox>
                  <v-checkbox
                    :disabled="true"
                    :input-value="true"
                    label="ແກ້ໄຂ"
                  ></v-checkbox>
                  <v-checkbox
                    :disabled="true"
                    :input-value="true"
                    label="ລົບ"
                  ></v-checkbox>
                </div>
              </th>
              <th class="text-left">[ທຸກໜ້າ]</th>
            </tr>
            <tr>
              <th class="text-left">Admin</th>
              <th class="text-left">
                <div class="d-flex">
                  <v-checkbox
                    :disabled="true"
                    :input-value="false"
                    label="ທຸກຢ່າງ"
                  ></v-checkbox>
                  <v-checkbox
                    :disabled="true"
                    :input-value="true"
                    label="ເພີ່ມ"
                  ></v-checkbox>
                  <v-checkbox
                    :disabled="true"
                    :input-value="true"
                    label="ເບີ່ງ"
                  ></v-checkbox>
                  <v-checkbox
                    :disabled="true"
                    :input-value="true"
                    label="ແກ້ໄຂ"
                  ></v-checkbox>
                  <v-checkbox
                    :disabled="true"
                    :input-value="true"
                    label="ລົບ"
                  ></v-checkbox>
                </div>
              </th>
              <th class="text-left">
                [ໜ້າທຳອິດ, ການສັ່ງຊື້, ປະເພດສິນຄ້າ, ສິນຄ້າ, ສາງສິນຄ້າ, ຂ່າວສານ,
                ລູກຄ້າ, Verify Ticket, ຂາຍໜ້າຮ້ານ]
              </th>
            </tr>
            <tr>
              <th class="text-left">Staff</th>
              <th class="text-left">
                <div class="d-flex">
                  <v-checkbox
                    :disabled="true"
                    :input-value="false"
                    label="ທຸກຢ່າງ"
                  ></v-checkbox>
                  <v-checkbox
                    :disabled="true"
                    :input-value="true"
                    label="ເພີ່ມ"
                  ></v-checkbox>
                  <v-checkbox
                    :disabled="true"
                    :input-value="true"
                    label="ເບີ່ງ"
                  ></v-checkbox>
                  <v-checkbox
                    :disabled="true"
                    :input-value="true"
                    label="ແກ້ໄຂ"
                  ></v-checkbox>
                  <v-checkbox
                    :disabled="true"
                    :input-value="false"
                    label="ລົບ"
                  ></v-checkbox>
                </div>
              </th>
              <th class="text-left">
                [ການສັ່ງຊື້, ປະເພດສິນຄ້າ, ສິນຄ້າ, ສາງສິນຄ້າ, ຂ່າວສານ, Verify
                Ticket, ຂາຍໜ້າຮ້ານ]
              </th>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      rules: [
        { value: "super-admin", text: "Super Admin" },
        { value: "admin", text: "Admin" },
        { value: "staff", text: "Staff" },
      ],
      form: {
        username: null,
        password: null,
        rules: "staff",
      },
    };
  },
  computed: {
    loading() {
      return this.$store.state.staff.loading;
    },
    staffs() {
      return this.$store.state.staff.staffs;
    },
  },
  mounted() {
    this.$store.dispatch("staff/staffs");
  },
  methods: {
    async create() {
      await this.$store.dispatch("staff/createStaffs", this.form);
    },
    async update(id, status, index) {
      if (index === 0) return;
      const data = {};
      data.id = id;
      data.status = status === 1 ? 0 : 1;
      await this.$store.dispatch("staff/updateStatus", data);
    },
  },
};
</script>
