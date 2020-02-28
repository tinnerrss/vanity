var db = require('./models');
var fs = require('fs');

//populate categories

let catNames = [
  { name: "blush",
    imgUrl: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.realsimple.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Frs_medium_image%2Fpublic%2Fimage%2Fimages%2F0111%2Fmodel-brushing-makeup_300.jpg%3Fitok%3DV5H73saM&q=85"},
  { name:"lipstick", 
    imgUrl: "https://images.ctfassets.net/wlke2cbybljx/6N54eppQii56XLQzBjlJo6/2ad9942c427bb5505b702e765a5e3547/Coachella-Coral-Light-Lip-Model.jpg?w=500&h=500&fit=fill&fm=jpg&bg=rgb%3Affffff"},
  { name:"foundation", 
    imgUrl: "https://cdn.rodial.co.uk/media/catalog/product/cache/9/thumbnail/1000x/9df78eab33525d08d6e5fb8d27136e95/n/_/n_f_arm_foundation_8.jpg"},
  { name:"eyeliner", 
    imgUrl: "https://images.ulta.com/is/image/Ulta/2537750_prod_altimg_2?op_sharpen=1&resMode=bilin&qlt=85&wid=800&hei=800&fmt=jpg"},
  { name:"eyeshadow", 
    imgUrl: "https://www.shemazing.net/wp-content/uploads/2014/01/eye-shadow-500x481.jpg"},
  { name:"nail_polish", 
    imgUrl: "https://www.essie.com/-/media/Project/Loreal/Brand-Sites/Essie/Americas/US/products_nailpolish_hd/enamels/Purples/095008000480/ESSIE-enamel-big-spender-on-hand-2.jpg?h=530&hash=2B999A77AE01B1CA2E5DEDA2155E2B2F485F780F"},
  { name:"eyebrow", 
    imgUrl: "https://www.maybelline.com/~/media/mny/us/eye-makeup/brow/modules/multi-image-carousel/for-thicker-brows/maybelline-tattoo-pomade-step-2-1x1.jpg?h=420&w=420&la=en-US&hash=A5F1B36F5A4B338795814AEA0E3A15CFB9048D5C"},
  { name:"mascara", 
    imgUrl: "https://www.dior.com/beauty/version-5.1520000000197/resize-image/ep/715/773/90/0/horizon%252Fimages_additionnelles%252Fvue_alt_mascara_GHC.jpg"
}]


catNames.forEach(function(catname) {
  db.category.create({
    name: catname.name,
    imgUrl: catname.imgUrl
  }).then(function(category) {
    console.log(`created ${category.name}`);
  });
})

//populate makeup products
  let products = fs.readFileSync("./products.json");
  let productsData = JSON.parse(products);

  productsData.forEach(function(info) {
    db.makeup.create({
      name: info.name,
      brand: info.brand,
      price: info.price,
      image_link: info.image_link,
      product_link: info.product_link,
      description: info.description,
      product_type: info.product_type
    }).then(function(makeupItem) {
      console.log(`created ${makeupItem.name}`);
    });
  })
 
//populate taglists
  let tags = ["orangic", "hypoallergenic", "gluten free", "cruetly free", "vegan", "oil free", "alcohol free"]

  tags.forEach(function(tag) {
    db.taglist.create({
      name: tag
    }).then(function(tag) {
      console.log(`created ${tag}`)
    })
  })