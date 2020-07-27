module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      builderOptions: {
        // "asar": "false",
        // "extraResources": [
        //   "/home/ubuntu/db-query-tool/src/components/server.js"
        // ],
      }
      
    }
  }
}