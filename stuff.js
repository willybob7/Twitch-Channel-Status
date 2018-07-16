$(document).ready(function() {
  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp"];
  var url = "https://wind-bow.glitch.me/twitch-api/";
  var logoUrl = []; //also used to get the display name
  var infoUrl = [];

  function logoUrlCreation() {
    channels.forEach(function(channel, i) {
      url += "channels/" + channels[i] + "?callback=?";
      logoUrl.push(url);
      url = "https://wind-bow.glitch.me/twitch-api/";
    });
  }

  function infoUrlCreation() {
    channels.forEach(function(channel, i) {
      url += "streams/" + channels[i] + "?callback=?";
      infoUrl.push(url);
      url = "https://wind-bow.glitch.me/twitch-api/";
    });
  }

  function getLogo() {
    logoUrl.forEach(function(channelUrl, j) {
      var a = "." + j.toString();
      var b = a + "1";
      $.getJSON(channelUrl, function(data) {
        $(a).html(
          "<img  src=" + data.logo + " alt = 'logo'>"
        );
        $(b).html("<a href=" + data.url + " target='_blank'>" + data.display_name + "</a>"
        );
      });
    });
  }

  function getInfo() {
    infoUrl.forEach(function(streamUrl, k) {
      var c = "." + k.toString() + "2";
      $.getJSON(streamUrl, function(data) {
        if (data.stream == null) {
          $(c).html("OFFLINE");
        } else {
          $(c).html(data.stream.channel.status);
        }
      });
    });
  }

  logoUrlCreation();
  infoUrlCreation();
  getLogo();
  getInfo();
});
