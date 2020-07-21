<template>
  <div>
    <v-btn color="primary" @click="connectionDialog = true">Connect</v-btn>
    <v-dialog v-model="connectionDialog">
      <v-card>
        <v-card-title class="headline">Connection</v-card-title>

        <v-card-text>
          <v-text-field v-model="dbname" label="DB Name" required></v-text-field>
          <v-text-field v-model="userName" label="User Name" required></v-text-field>
          <v-text-field
            v-model="userPassword"
            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passwordShow ? 'text' : 'password'"
            label="Password"
            @click:append="passwordShow = !passwordShow"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            @click="connectionDialog = false
            
            ,passwordShow=false"
          >Cancle</v-btn>

          <v-btn color="primary" @click="connectDB()">Connect</v-btn>
          <v-btn color="primary" @click="test()">Test</v-btn>
          <v-dialog v-model="connectionError">
            <v-card>
              <v-card-text>Connection is not step</v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="connectionError=false">Ok</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-dialog>
<Table/>
<CreateTable/>
    <!-- <v-file-input accept=".csv" label="File input" v-model="fileInput"></v-file-input> -->
    <!-- <v-btn color="primary" @click="parse()">Parse</v-btn>
    <v-btn @click="createTableDialog=true" color="primary">Create</v-btn>
    <v-dialog v-model="createTableDialog">
      <v-card>
        <v-card-title class="headline">Table</v-card-title>

        <v-card-text>
          <v-data-table :headers="headers" :items="fileHeader">
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>My CRUD</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
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
                            <v-text-field v-model="editedItem.calories" label="Data Type"></v-text-field>
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
              <v-btn @click="editItem(item)" color="primary">c</v-btn> -->
              <!-- <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon> -->
              <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
            <!-- </template> -->
          <!-- </v-data-table> -->
        <!-- </v-card-text> -->
<!--  -->
        <!-- <v-card-actions> -->
          <!-- <v-spacer></v-spacer>

          <v-btn color="primary" @click="createTableDialog = false">Cancle</v-btn>

          <v-btn color="primary" @click="createTable()">Create</v-btn>
        </v-card-actions>
      </v-card> -->
    <!-- </v-dialog> -->
  </div>
</template>

<script>
import request from "request";
import papa from "papaparse";
import Table from "./Table.vue";
import CreateTable from "./CreateTable.vue";
export default {
  name: "FileSelect",
components: {
    Table,
    CreateTable,
  },

  data() {
    return {
            dbname: "psqldb",
      userName: "admin",
      userPassword: "qwedsa",
      passwordShow: false,
      connectionDialog: false,
      connectionError: false,
      // fileInput: null,
      // fileHeader: [],
      // fileDataType: [],
      // newHeader: [],
      // editDialog:false,
      // headers: [
      //   { text: "Header", value: "name" },
      //   {
      //     text: "DataType",
      //     value: "datatype"
      //   },
      //   { text: "Actions", value: "actions" }
      // ]
    };
  },
  // computed: {
  //   connectionDialogBox(){
  //     return this.connectionDialog;
  //   }
  // },
  methods: {
    // editItem(item) {
    //   this.editedIndex = this.desserts.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.editDialog = true;
    // },

    // deleteItem(item) {
    //   const index = this.desserts.indexOf(item);
    //   confirm("Are you sure you want to delete this item?") &&
    //     this.desserts.splice(index, 1);
    // },
    // close () {
    //   this.editDialog = false
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem)
    //     this.editedIndex = -1
    //   })
    // },

    // save () {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
    //   } else {
    //     this.desserts.push(this.editedItem)
    //   }
    //   this.close()
    // },
    // change() {
    //   console.log(this.newHeader);
    // },
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
    // dataType(h){
    //   console.log(h.data);
    //   let key;
    //   for(key in h.data)
    //   {
    //     // eslint-disable-next-line no-prototype-builtins
    //     if(h.data.hasOwnProperty(key)) {
    //       this.fileHeader.push(key);
    //       this.fileDataType.push(typeof(h.data[key]));

    //     }

    // }
    //   console.log("header",this.fileHeader);
    //   // console.log("type",this.fileDataType);
    // },
    // getHeaderDataType(callBack){
    //   papa.parse(this.fileInput, {
    //     header:true,
    //     dynamicTyping:true,
    //     step: function(result,parser) {
    //       const h=result;
    //       callBack(h);
    //       parser.abort();
    //     }
    //   });
    // },
    parse() {
      this.parseChunk(this.insertRow);
    },
    parseChunk(callBack) {
      this.getHeader(this.header);
      // this.getHeaderDataType(this.dataType);
      // papa.parse(this.fileInput, {
      //   header: true,
      //   dynamicTyping: true,
      //   chunkSize: 1024 * 1024 * 10,
      //   chunk: function(result) {
      //     let h = result.data;
      //     console.log(h);
      //     h = JSON.stringify(h);
      //     console.log(h);
      //     console.log(JSON.parse(h));
      //     // callBack(h);
      //     // console.log(result);
      //   },
      //   complete: function(results, file) {
      //     // console.log("compelete");
      //   }
      // });
    },
    async insertRow(h) {
      // console.log(JSON.stringify(h).length);

      await request.post(
        {
          url: "http://127.0.0.1:8082/query",
          form: h
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
    async connectDB() {
      await request.post(
        {
          url: "http://127.0.0.1:8082/connect",
          form: JSON.stringify({
            dbname: this.dbname,
            userName: this.userName,
            userPassword: this.userPassword
          })
        },
        function(error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body);
            if (body === "success") {
              this.connectionDialog = false;
            } else {
              this.connectionError = true;
            }
          } else {
            console.log(error);
            console.log(response);
          }
        }
      );
    }
  }
};
</script>