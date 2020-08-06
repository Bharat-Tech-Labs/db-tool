module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
pluginOptions: {
  electronBuilder: {
    preload: '../API/build/app.js',
    builderOptions: {
      "publish": [{
        "provider": "github",
        "owner": "Bharat-Tech-Labs",
        "repo": "db-tool"
      }],
      "snap": {
        "publish": [{
          "provider": "github",
          "owner": "Bharat-Tech-Labs",
          "repo": "db-tool"
        }]
      }
    }
  }
}
};