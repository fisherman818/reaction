// Write your package code here!
/*Template.newLayoutHeader.inheritsEventsFrom("layoutHeader");
Template.newLayoutHeader.inheritsHooksFrom("layoutHeader");
Template.newLayoutHeader.inheritsHelpersFrom("layoutHeader");*/
Template.newLayoutHeader.replaces("layoutHeader");


var Media;
Media = ReactionCore.Collections.Media;

Template.layoutHeader.helpers({
  Media: function() {
    return Media.find({"metadata.objName" : "logo"});
  }
});


Template.headerImageUploaded.helpers({
  Media: function(){
    return Media.find({"metadata.objName" : "logo"});
  },
  UploadedLogo: function() {
    return Media.find({"metadata.objName" : "logo"});
  }
});

Template.headerImageUploader.helpers({
  Media: function(){
    return Media.find({"metadata.objName" : "logo"});

    }
});

Template.newLayoutHeader.events({
  "click #img-upload-header": function () {
    return $("#headerImageUpload").click();
  },
  "load .img-responsive": function (event, template) {
    return Session.set("variantImgSrc", template.$(".img-responsive").attr(
      "src"));
  },

 "change #headerImageUpload": headerUploadHandler,
  "dropped #dropzone": headerUploadHandler

});


Template.headerImageUploader.events({
  "click #btn-upload-header": function () {
    return $("#headerImageUpload").click();
  },
  "change #headerImageUpload": headerUploadHandler,
  "dropped #dropzone": headerUploadHandler
});

function headerUploadHandler(event) {
  var shopId = ReactionCore.getShopId();
  var userId = Meteor.userId();

  return FS.Utility.eachFile(event, function (file) {
    var fileObj;
    fileObj = new FS.File(file);
    fileObj.metadata = {
      ownerId: userId,
      shopId: shopId,
      objName: "logo"
    };
    Media.insert(fileObj);
    console.log('Uploadfinished')
    return;
  });
}
