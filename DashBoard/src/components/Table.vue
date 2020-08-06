<template>
  <div>
    <v-file-input accept=".csv" label="File input" v-model="fileInput"></v-file-input>
    <v-btn color="primary" @click="parse()">Parse</v-btn>
    <v-btn color="primary" @click="map()">Map</v-btn>
    <!-- <v-btn @click="createTableDialog=true" color="primary">Create</v-btn> -->
    <v-btn @click="getTables()" color="primary">Tables</v-btn>
    <v-select :items="tables" label="Tables" outlined v-model="selectedTable" @change="getColums()"></v-select>
    <v-data-table
      v-model="selectedHeader"
      :headers="headers"
      :items="fileHeader"
      v-if="mapHeader"
      item-key="name"
      show-select
    >
      <!-- <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.name">
            <td>
              <v-checkbox v-model="selectedHeader" :value="item.newName" hide-details />
            </td>
            <td>{{ item.name }}</td>
            <td>
              <v-select :items="tableColumn" v-model="item.newName" outlined></v-select>
            </td>
          </tr>
        </tbody>
      </template>-->
      <template v-slot:item.newName="{ item }">
        <v-select :items="tableColumn" v-model="item.newName" outlined></v-select>
      </template>
    </v-data-table>
    <v-btn color="primary" @click="print()">check</v-btn>
    <!--  <v-dialog v-model="createTableDialog">
      <v-card>
        <v-card-title class="headline">Create Table</v-card-title>
        <v-card-text>
          <v-text-field v-model="tableName" label="Table Name" required></v-text-field>
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
                            <v-text-field v-model="editedItem.name" label="Header" readonly></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.newName" label="New Header Name"></v-text-field>
                          </v-col>
                           <v-col cols="12" sm="6" md="4">
                            <v-select
                              :items="dataType"
                              label="DataType"
                              outlined
                              v-model="editedItem.datatype"
                            ></v-select>
                            <v-text-field v-model="editedItem.datatype" label="Data Type"></v-text-field> 
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
    </v-dialog>-->
  </div>
</template>

<script>
import papa from "papaparse";
import request from "request";
export default {
  name: "Table",

  data() {
    return {
      insertErrorData: [],
      parsingErrorData: [],
      selectedHeader: [],
      selectedValue: [],
      tableColumn: [],
      selectedTable: "",
      tables: [],
      tableName: "",
      queryColumn: [],
      // createTableDialog: false,
      // dataType: ["VARCHAR", "DATE", "Integer"],
      fileInput: [],
      fileHeader: [],
      // fileDataType: [],
      newHeader: [],
      mapHeader: false,
      // editDialog: false,
      // editedItem: {
      //   name: "",
      //   newName: "",
      //   datatype: ""
      // },
      headers: [
        { text: "Header", value: "name" },
        { text: "New Header Name", value: "newName" },
        // {
        //   text: "DataType",
        //   value: "datatype"
        // },
        // { text: "Actions", value: "actions" }
      ],
    };
  },
  computed: {
    computedItems() {
      return this.tableColumn.map((item) => {
        return {
          text: item,
          disabled: this.tableColumn.includes(item),
        };
      });
    },
  },
  methods: {
    print() {
      console.log(this.fileInput.size);
      // console.log(this.fileHeader);
      // console.log(this.selectedValue);
    },
    // editItem(item) {
    //   this.editedIndex = this.fileHeader.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.editDialog = true;
    // },

    // deleteItem(item) {
    //   const index = this.fileHeader.indexOf(item);
    //   confirm("Are you sure you want to delete this item?") &&
    //     this.fileHeader.splice(index, 1);
    // },
    // close() {
    //   this.editDialog = false;
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   });
    // },

    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.fileHeader[this.editedIndex], this.editedItem);
    //   } else {
    //     this.fileHeader.push(this.editedItem);
    //   }
    //   this.close();
    // },
    header(h) {
      this.fileHeader = [];
      for (let i = 0; i < h.data.length; i++) {
        const object = new Object({
          name: h.data[i],
          newName: "",
          checked: true,
          // datatype: "VARCHAR"
        });
        // console.log(object);
        this.fileHeader.push(object);
      }
      // console.log("ok", this.fileHeader);
    },
    getHeader(callBack) {
      papa.parse(this.fileInput, {
        // header:true,
        // transformHeader: function(header,index) {
        //   return "ok";
        //   // console.log("header",header);
        // },
        step: function (result, parser) {
          const h = result;
          callBack(h);
          parser.abort();
        },
      });
    },
    // async createTable() {
    // papa.parse(this.fileInput, {
    //         header:true,
    //         transformHeader: function(header,index) {
    //           for(let i=0;i<this.fileHeader.length;i++)
    //           {
    //             if(this.fileHeader[i].name==header)
    //             {
    //               return this.fileHeader[i].newName;
    //             }

    //           }

    //         },
    //         step: function(result, parser) {
    //           console.log(result);
    //         }
    //       });

    // console.log(JSON.stringify(h).length);
    //   const table = {
    //     name: "",
    //     headers: null
    //   };
    //   table.name = this.tableName;
    //   const createHeader = {};
    //   for (let i = 0; i < this.fileHeader.length; i++) {
    //     // console.log(this.fileHeader[i]);
    //     createHeader[this.fileHeader[i].newName] = {
    //       type: this.fileHeader[i].datatype
    //     };
    //     // let title=this.fileHeader[i].newHeader;
    //     // const object = new Object({  title: {type:this.fileHeader[i].datatype}});
    //     // createHeader.push()
    //   }
    //   table.headers = createHeader;
    //   console.log(table);
    //   // console.log(createHeader);
    //   await request.post(
    //     {
    //       url: "http://127.0.0.1:8082/createTable",
    //       form: JSON.stringify(table)
    //     },
    //     function(error, response, body) {
    //       console.log("query");
    //       if (!error && response.statusCode == 200) {
    //         console.log(body);
    //       } else {
    //         console.log(error);
    //         console.log(response);
    //       }
    //     }
    //   );
    // },
    map() {
      this.getHeader(this.header);
      this.mapHeader = true;
    },
    errorResolving(data, insertErrorDataCollector) {
      // console.log(data);
      for (let i = 0; i < data.data.length; i++) {
        const table = {
          name: data.name,
          data: data.data[i],
        };

        request.post(
          {
            url: "http://127.0.0.1:8082/singleInsert",
            form: encodeURIComponent(JSON.stringify(table)),
          },
          function (error, response, body) {
            // console.log("query");
            if (!error && response.statusCode == 200) {
              if (body == "error") {
                insertErrorDataCollector(table.data);
              }
              // console.log(body);
            } else {
              console.log(error);
              console.log(response);
            }
          }
        );
      }
      console.log("insertErrorData:", this.insertErrorData);
    },
    insertRow(data) {
      // console.log(data);
      // console.log(this.fileHeader);
      const keys = [];
      for (let i = 0; i < this.selectedHeader.length; i++) {
        keys.push(this.selectedHeader[i].newName);
      }
      const selectedData = [];
      for (let i = 0; i < data.length; i++) {
        // if(data[i].length==this.fileHeader.length){
        const newData = {};
        let key;
        // let count = 0;
        for (key in data[i]) {
          // count++;
          if (keys.includes(key)) newData[key] = data[i][key];
        }
        // if (count == this.fileHeader.length) {
        selectedData.push(newData);
        // } else {
        //   console.log(i, data[i]);
        // }
      }
      // console.log(selectedData);
      //       let query="INSERT INTO "+this.selectedTable+" (";
      //       for(let i=0;i<this.fileHeader.length;i++)
      //       {const table = {
      // name: this.selectedTable,
      // header: header,
      // data: selectedData
      // };
      //         else{
      //           query+=") VALUES";
      //         }
      //       }
      //       for(let i=0;i<data.length;i++)
      //       {
      //         if(data[i][this.fileHeader[0].newName]!=null || data[i][this.fileHeader[0].newName]!=undefined)
      //         {
      //           query+=" (";
      //         for(let j=0;j<this.fileHeader.length;j++)
      //       {

      //         // console.log(typeof data[i][this.fileHeader[j].newName]);
      //         if(typeof(data[i][this.fileHeader[j].newName])=="number"){
      //           query+=data[i][this.fileHeader[j].newName];
      //         }
      //         else{
      // query+='"'+data[i][this.fileHeader[j].newName]+'"';
      //         }

      //         if(j!=this.fileHeader.length-1)
      //         {
      //           query+=",";
      //         }
      //         else{
      //           query+=")";
      //         }
      //       }
      //       query+=",";
      //       }

      //       }
      //       query = query.substring(0, query.length - 1);
      //         query+=";";
      // const header = [];
      // for (let i = 0; i < this.fileHeader.length; i++) {
      //   if (
      //     this.fileHeader[i].newName != null &&
      //     this.fileHeader[i].newName != undefined &&
      //     this.fileHeader[i].newName != ""
      //   )
      //     header.push(this.fileHeader[i].newName);
      // }
      // console.log(this.selectedTable);
      const table = {
        name: this.selectedTable,
        // header: header,
        data: selectedData,
      };
      // table.name = this.tableName;
      // const createHeader = {};
      // for (let i = 0; i < this.fileHeader.length; i++) {
      //   // console.log(this.fileHeader[i]);
      //   createHeader[this.fileHeader[i].newName] = {
      //     type: this.fileHeader[i].datatype
      //   };
      // let title=this.fileHeader[i].newHeader;
      // const object = new Object({  title: {type:this.fileHeader[i].datatype}});
      // createHeader.push()
      // }
      // table.headers = createHeader;
      // console.log(table);
      // console.log(createHeader);
      // console.log(query);
      // const body={table:this.selectedTable,data:data};
      return new Promise((resolve, reject) => {
        const errorResolving = this.errorResolving;
        const insertErrorDataCollector = this.insertErrorDataCollector;
        request.post(
          {
            url: "http://127.0.0.1:8082/bulkInsert",
            form: encodeURIComponent(JSON.stringify(table)),
          },
          function (error, response, body) {
            // console.log("query");
            if (!error && response.statusCode == 200) {
              if (body == "error") {
                errorResolving(table, insertErrorDataCollector);
                console.log(table);
              }
              console.log(body);
            } else {
              console.log(error);
              console.log(response);
            }
            resolve(body);
          }
        );
      });
    },

    parse() {
      //       console.log(this.fileInput);
      //       const fileObject = this.fileInput;
      // //       const fileObject  = {
      // //    'lastModified'     : this.fileInput.lastModified,
      // //    'lastModifiedDate' : this.fileInput.lastModifiedDate,
      // //    'name'             : this.fileInput.name,
      // //    'size'             : this.fileInput.size,
      // //    'type'             : this.fileInput.type,
      // //    'path':this.fileInput.path
      // // };
      //       const body={
      //         file:fileObject,
      //         header: this.fileHeader,
      //         tableName: this.selectedTable
      //       };
      //       console.log(body);
      //       await request.post(
      //         {
      //           url: "http://127.0.0.1:8082/insert",
      //           form: body
      //         },
      //         function(error, response, body) {
      //           console.log("query");
      //           if (!error && response.statusCode == 200) {
      //             console.log("success");
      //           } else {
      //             console.log(error);
      //             console.log(response);
      //           }
      //         }
      //       );
      //       console.log(this.fileHeader);
      this.errorData = [];
      this.parseChunk(this.insertRow, this.errorDataCollector, this.fileHeader);
    },
    errorDataCollector(data) {
      this.parsingErrorData.push(data);
    },
    insertErrorDataCollector(data) {
      this.insertErrorData.push(data);
    },
    parseChunk(callBack, errorDataCollector, header) {
      // let counter=0;
      // let c=0;
      let data = [];
      papa.parse(this.fileInput, {
        header: true,
        transformHeader: function (h, index) {
          for (let i = 0; i < header.length; i++) {
            if (header[i].name == h && header[i].newName != "") {
              return header[i].newName;
            }
          }
          return h;
        },
        dynamicTyping: true,
        step: async function (result, parser) {
          // console.log(result.errors);
          if (result.errors.length) {
            errorDataCollector(result.data);
          } else {
            if (data.length < 10000) {
              if (result.data.__parsed_extra) {
                console.log(result.data.__parsed_extra);
              } else {
                data.push(result.data);
              }
              // c++;
              // // console.log(data);
              // counter++;
            }
            if (data.length == 10000) {
              // console.log(data);
              parser.pause();

              // console.log(data.length);
              const re = await callBack(data);
              data = [];
              if (re) {
                // console.log("re",counter,re);
                parser.resume();

                // counter=0;
              }
            }
          }

          // console.log(result);
        },
        complete: function (results, file) {
          // console.log("compelete");
          if (data.length) {
            // console.log(data.length);
            callBack(data);
          }
        },
      });
      console.log("parsingErrorData", this.parsingErrorData);
      // papa.parse(this.fileInput, {
      //   header: true,
      //   transformHeader: function(h, index) {
      //     for (let i = 0; i < header.length; i++) {
      //       if (header[i].name == h) {
      //         return header[i].newName;
      //       }
      //     }
      //   },
      //   dynamicTyping: true,
      //   chunkSize: 1024 * 1024,
      //   chunk: function(result) {
      //     console.log(result);
      //     const h = result.data;
      //     // console.log(h);
      //     // h = JSON.stringify(h);
      //     // console.log(h);
      //     // console.log(JSON.parse(h));
      //     callBack(h);
      //     // console.log(result);
      //   },
      //   complete: function(results, file) {
      //     // console.log("compelete");
      //   }
      // });
    },
    getTableName(body) {
      this.tables = [];
      for (let i = 0; i < body.length; i++) {
        // console.log(body[i][0].toString());
        this.tables.push(body[i][0].toString());
      }

      console.log(this.tables);
    },
    getTables() {
      this.getTname(this.getTableName);
    },
    async getTname(callBack) {
      // console.log(papa);

      await request.post(
        {
          url: "http://127.0.0.1:8082/table",
        },
        function (error, response, body) {
          // console.log("query");
          if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            callBack(body);
          } else {
            console.log(error);
            console.log(response);
          }
        }
      );
    },
    getColumnName(body) {
      // console.log(body);
      for (let i = 0; i < body.length; i++) {
        // const object = new Object({
        //   name: body[i].column_name,
        //   selected: false
        // });
        // this.selectedValue[body[i].column_name]=false;
        this.tableColumn.push(body[i].column_name);
      }
      console.log(this.tableColumn);
    },
    getColums() {
      this.tableColumn = [];
      // console.log(this.selectedTable);
      this.getColName(this.getColumnName);
    },
    async getColName(callBack) {
      await request.post(
        {
          url: "http://127.0.0.1:8082/tableColumn",
          form: JSON.stringify(this.selectedTable),
        },
        function (error, response, body) {
          console.log("query");
          if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            callBack(body);
          } else {
            console.log(error);
            console.log(response);
          }
        }
      );
    },
  },
};
</script>