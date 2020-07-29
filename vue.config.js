module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      builderOptions: {
        "publish": [{
        "provider": "github",
        "owner": "Bharat-Tech-Labs",
        "repo": "db-tool"
    }]
        // "asar": "false",
        // "extraResources": [
        //   "/home/ubuntu/db-query-tool/src/components/server.js"
        // ],
      }
      
    }
  }
}