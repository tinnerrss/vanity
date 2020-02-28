var db = require('./models');
var fs = require('fs');

//populate categories

let catNames = [
  { name: "blush",
    imgUrl: "https://www.lorealparisusa.com/~/media/images/lop/home/beauty-library/articles/blush-by-face-shape/loreal-paris-bmag-article-how-to-apply-blush-based-on-your-face-shape-m.jpg?thn=0"},
  { name:"lipstick", 
    imgUrl: "https://images.ctfassets.net/wlke2cbybljx/6N54eppQii56XLQzBjlJo6/2ad9942c427bb5505b702e765a5e3547/Coachella-Coral-Light-Lip-Model.jpg?w=500&h=500&fit=fill&fm=jpg&bg=rgb%3Affffff"},
  { name:"foundation", 
    imgUrl: "https://cdn.rodial.co.uk/media/catalog/product/cache/9/thumbnail/1000x/9df78eab33525d08d6e5fb8d27136e95/n/_/n_f_arm_foundation_8.jpg"},
  { name:"eyeliner", 
    imgUrl: "https://www.womensedge.org/wp-content/uploads/2017/06/Best-Waterproof-Eyeliners.jpg"},
  { name:"eyeshadow", 
    imgUrl: "https://lh3.googleusercontent.com/proxy/3xudGi54zvZMVzHcX0Mdyk16a-xByRbieGkvzmXtpiWgaUZXleEFCwm5I-4AZDnecZX-IYBJyzwmKuS-DA3mfY8bjmQom2ggNcDd9NyVNVLEsx2_iR84ebPsmEAZ9QQ8CINMkKaffuZkxW7rdcf5gfy8nBkW9Pxq6o40bvPIniiiJM4"},
  { name:"nail_polish", 
    imgUrl: "https://lh3.googleusercontent.com/proxy/R0kAYox_CcEKP9AcQfifTlBbrRlF1uDL3Zay9AkKZIWoU3lC3Xxv4ITuIZFG_7wnS7EuYifW8itrjoYj0y84L_QQny1OdC9Om28662bsLL0aD9FfOltMf-jk1A"},
  { name:"eyebrow", 
    imgUrl: "https://www.lorealparisusa.com/~/media/images/lop/home/beauty-library/articles/complete-guide-to-eyebrow-makeup/loreal-paris-bmag-article-the-complete-guide-to-eyebrow-makeup-m.jpg?thn=0"},
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