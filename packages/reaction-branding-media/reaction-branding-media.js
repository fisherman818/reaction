// Write your package code here!

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
  let shopId = ReactionCore.getShopId();
  let userId = Meteor.userId();
  let count = Media.find({
    "metadata.variantId": variantId
  }).count();

  return FS.Utility.eachFile(event, function (file) {
    let fileObj;
    fileObj = new FS.File(file);
    fileObj.metadata = {
      ownerId: userId,
      shopId: shopId,
      priority: count
    };
    Media.insert(fileObj);
    return count++;
  });
}

Template.newLayoutHeader.inheritsEventsFrom("layoutHeader");
Template.newLayoutHeader.inheritsHooksFrom("layoutHeader");
Template.newLayoutHeader.inheritsHelpersFrom("layoutHeader");
Template.newLayoutHeader.replaces("layoutHeader");


Template.headerImageUploader.inheritsEventsFrom("imageUploader");
Template.headerImageUploader.inheritsHooksFrom("imageUploader");
Template.headerImageUploader.inheritsHelpersFrom("imageUploader");
