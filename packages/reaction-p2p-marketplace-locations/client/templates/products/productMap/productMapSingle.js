/**
 * productMap helpers
 */

Template.productMapSingle.onRendered(function() {
  GoogleMaps.load();
});

let Media;
Media = ReactionCore.Collections.Media;
Template.productMapSingle.helpers({
  products: function () {
    return getProductsByTag(this.tag);
  },
  media: function () {
    let defaultImage;
    let variants = [];
    for (let variant of this.variants) {
      if (!variant.parentId) {
        variants.push(variant);
      }
    }
    if (variants.length > 0) {
      let variantId = variants[0]._id;
      defaultImage = Media.findOne({
        "metadata.variantId": variantId,
        "metadata.priority": 0
      });
    }
    if (defaultImage) {
      return defaultImage;
    }
    return false;
  },
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(47.3770309, 8.5077843), // start pos zürich 47.3770309,8.5077843
        zoom: 13,
        reactionTag: this.tag
      };
    }
  }
});

Template.productMapSingle.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('map', function(map) {
    let handle = ReactionRouter.getParam("handle");
    let product = ReactionCore.Collections.Products.findOne({
      handle: handle
    });
    //console.log('prod %o', product);
    let prodOwner = ReactionCore.Collections.Accounts.findOne({
      userId: product.userId
    });
    //console.log('owner %o', prodOwner);

    Meteor.call("accounts/getUserAddress", product.userId, function(error, result) {
        let address = result;
        console.log('address', address);

        // TODO: resolve address of seller
        //var address = 'Bahnhofstrasse, Zürich, Switzerland';
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode(
          {
            'address': address
          },
          function(results, status) {
             if(status == google.maps.GeocoderStatus.OK) {
                new google.maps.Marker({
                   position: results[0].geometry.location,
                   map: map.instance,
                   title: "This product"
                });
                console.log("resolved location: "+results[0].geometry.location);
                map.instance.setCenter(results[0].geometry.location);
             }
          }
        );

      }
    );
  });
});
