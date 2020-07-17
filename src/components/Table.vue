<template>
  <div>
    <v-file-input accept=".csv" label="File input" v-model="fileInput"></v-file-input>
    <v-btn color="primary" @click="parse()">Parse</v-btn>
    <v-btn @click="createTableDialog=true" color="primary">Create</v-btn>
    <v-dialog v-model="createTableDialog">
      <v-card>
        <v-card-title class="headline">Table</v-card-title>

        <v-card-text>
          <v-data-table :headers="headers" :items="fileHeader">
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-spacer></v-spacer>
                <v-dialog v-model="editDialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
                  </template>
                  <v-card>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.name" label="Header"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                              <v-select
          :items="dataType"
          label="Outlined style"
          outlined
          v-model="editedItem.datatype"
        ></v-select>
                            <!-- <v-text-field v-model="editedItem.datatype" label="Data Type"></v-text-field> -->
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" @click="createTableDialog = false">Cancle</v-btn>

          <v-btn color="primary" @click="createTable()">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import papa from "papaparse";
export default {
  name: "Table",

  data() {
    return {
      createTableDialog: false,
dataType:['VARCHAR','DATE'],
      fileInput: null,
      fileHeader: [],
      fileDataType: [],
      newHeader: [],
      editDialog: false,
      editedItem: {
      name:'',
      datatype:''
    },
      headers: [
        { text: "Header", value: "name" },
        {
          text: "DataType",
          value: "datatype"
        },
        { text: "Actions", value: "actions" }
      ]
    };
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.fileHeader.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editDialog = true;
    },

    deleteItem(item) {
      const index = this.fileHeader.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.fileHeader.splice(index, 1);
    },
    close() {
      this.editDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.fileHeader[this.editedIndex], this.editedItem);
      } else {
        this.fileHeader.push(this.editedItem);
      }
      this.close();
    },
    change() {
      console.log(this.newHeader);
    },
    header(h) {
      for (let i = 0; i < h.data.length; i++) {
        const object = new Object({ name: h.data[i] });
        // console.log(object);
        this.fileHeader.push(object);
      }
      console.log("ok", this.fileHeader);
    },
    getHeader(callBack) {
      papa.parse(this.fileInput, {
        // header:true,
        // transformHeader: function(header,index) {
        //   console.log("header",header);
        // },
        step: function(result, parser) {
          const h = result;
          callBack(h);
          parser.abort();
        }
      });
    },

    parse() {
      this.parseChunk(this.insertRow);
    },
    parseChunk(callBack) {
      this.getHeader(this.header);
    }
  }
};
</script>