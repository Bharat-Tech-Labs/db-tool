<template>
  <div>
    
    <v-btn @click="createTableDialog=true" color="primary">Create</v-btn>
    <div v-if="createTableDialog">
    <!-- <v-dialog v-model="createTableDialog"> -->
      <v-card>
        <v-card-title class="headline">Create Table</v-card-title>

        <v-card-text>
          <v-text-field v-model="tableName" label="Table Name" required></v-text-field>
          <v-data-table :headers="headers" :items="tableHeader">
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
                        <!-- <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.name" label="Header" readonly></v-text-field>
                          </v-col>
                        </v-row> -->
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.name" label="Header Name" required></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              :items="dataType"
                              label="DataType"
                              outlined
                              v-model="editedItem.datatype"
                              required
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
            <template v-slot:item.unique="{ item }">
              <v-checkbox v-model="item.unique"></v-checkbox>
            </template>
            <template v-slot:item.notNull="{ item }">
              <v-checkbox v-model="item.notNull"></v-checkbox>
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
            <v-btn color="primary" @click="previewQuery()">Preview</v-btn>
            <v-dialog
      v-model="previewQueryDialog"
    >
      <v-card>
        <v-card-title class="headline">Preview</v-card-title>

        <v-textarea
          v-model="createTableQuery"
          :value="createTableQuery"
        ></v-textarea>

        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn color="primary" @click="previewQueryDialogBox = false">Cancle</v-btn>
          <v-btn color="primary" @click="createTable()">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
          
        </v-card-actions>
      </v-card>
    <!-- </v-dialog> -->
    </div>

  </div>
</template>

<script>
import request from "request";
export default {
  name: "CreateTable",

  data() {
    return {
        previewQueryDialogBox:false,
        createTableQuery:"",
      tableName: "",
      createTableDialog: false,
      dataType: ["VARCHAR", "DATE", "Integer"],
      tableHeader: [],
      editDialog: false,
      editedItem: {
        name: "",
        datatype: "",
        unique:false,
        notNull:false
      },
      headers: [
        { text: "Header", value: "name" },
        {
          text: "DataType",
          value: "datatype"
        },
        {
          text: "Unique",
          value: "unique"
        },
        {
          text: "Not NULL",
          value: "notNull"
        },
        { text: "Actions", value: "actions" }
      ]
    };
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.tableHeader.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editDialog = true;
    },

    deleteItem(item) {
      const index = this.tableHeader.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.tableHeader.splice(index, 1);
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
        Object.assign(this.tableHeader[this.editedIndex], this.editedItem);
      } else {
        this.tableHeader.push(this.editedItem);
      }
      this.close();
    },
    previewQuery(){
this.createTableQuery="CREATE TABLE IF NOT EXISTS "+this.tableName+" (\n\t";
for (let i = 0; i < this.tableHeader.length; i++) {
    if(this.tableHeader[i].name!=undefined && this.tableHeader[i].datatype!=undefined){
          this.createTableQuery+=this.tableHeader[i].name+" "+this.tableHeader[i].datatype;
          if(this.tableHeader[i].unique)
          {
              this.createTableQuery+=" UNIQUE";
          }
          if(this.tableHeader[i].notNull)
          {
              this.createTableQuery+=" NOT NULL";
          }
          if(i!=this.tableHeader.length-1)
          {
              this.createTableQuery+=",\n\t";
          }
          else
          {
              this.createTableQuery+="\n);"
          }
           }
}
           console.log(this.createTableQuery);
           this.previewQueryDialogBox=true;
    },
    async createTable() {
      console.log(this.createTableQuery);
    //   const table = {
    //     name: "",
    //     headers: null
    //   };
    //   table.name = this.tableName;
    //   const createHeader = {};
      
        // createHeader[this.tableHeader[i].name] = {
        //   type: this.tableHeader[i].datatype
        // };
     
    //   table.headers = createHeader;
      
      await request.post(
        {
          url: "http://127.0.0.1:8082/createTable",
          form: JSON.stringify(this.createTableQuery)
        },
        function(error, response, body) {
          console.log("query");
          if (!error && response.statusCode == 200) {
            console.log(body);
          } else {
            console.log(error);
            console.log(response);
          }
        }
      );
    },
  },
  computed: {
      previewQueryDialog(){
          return this.previewQueryDialogBox;
      }
  }
};
</script>