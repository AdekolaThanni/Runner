const ProductsModel = require("./models/productModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config({ path: "./.env" });

// [
//   {
//     name: "H.ST.20 KIT 2 Men's Sneakers",
//     price: 85.0,
//     summary:
//       "We reached into the archives for this one. Hitting the streets in the early 2000’s as a low-profile",
//     images: [
//       "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1200,h_1200/global/194095/09/sv01/fnd/PNA/fmt/png/H.ST.20-KIT-2-Men's-Sneakers",
//       "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_900,h_900/global/194095/09/fnd/PNA/fmt/png/H.ST.20-KIT-2-Men's-Sneakers",
//       "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_900,h_900/global/194095/09/sv04/fnd/PNA/fmt/png/H.ST.20-KIT-2-Men's-Sneakers",
//     ],
//     brand: "Puma",
//     ratingsAverage: 4,
//     ratingsCount: 8,
//     details: {
//       description:
//         "We reached into the archives for this one. Hitting the streets in the early 2000’s as a low-profile silhouette with roots back to a minimalist distance spike, H.ST.20 is stepping straight to the future. Evolved with a dynamic rubber outsole, bold sidewall visuals, and LQDCELL stable cushioning, this run-inspired kick is back for another round of history.",
//       features: [
//         "Breathable textile upper with leather overlays",
//         "Unique lace closure",
//         "LQDCELL cushioning in the midsole",
//         "Rubber outsole with aggressive rubber wrap-ups at the midsole",
//         "Clear loop at heel",
//         "PUMA Formstrip overlay at side",
//         "Woven webbing loop at tongue and heel",
//       ],
//     },
//   },
//   {
//     name: "Speedcat Shield SD Driving Shoes",
//     price: 90.0,
//     summary:
//       "Pick up the pace with the Speedcat Shield Driving Shoes. These classic shoes are infused",
//     images: [
//       "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_900,h_900/global/387272/02/sv01/fnd/PNA/fmt/png/Speedcat-Shield-SD-Driving-Shoes",
//       "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_900,h_900/global/387272/02/bv/fnd/PNA/fmt/png/Speedcat-Shield-SD-Driving-Shoes",
//       "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_900,h_900/global/387272/02/sv04/fnd/PNA/fmt/png/Speedcat-Shield-SD-Driving-Shoes",
//     ],
//     brand: "Puma",
//     ratingsAverage: 5,
//     ratingsCount: 2,
//     details: {
//       description:
//         "Pick up the pace with the Speedcat Shield Driving Shoes. These classic shoes are infused with true motorsport DNA – they're the perfect shoes for all the motorsport fans out there.",
//       features: [
//         "Low-boot construction",
//         "True motorsport DNA",
//         "Lace closure for a snug fit",
//       ],
//     },
//   },
//   {
//     name: "LV BAROQUE RANGER BOOT",
//     price: 1310.0,
//     summary:
//       "The LV Baroque ranger boot is a hybrid style which was a highlight of Louis Vuitton's Fall-Winter 2022 men's show. It contrasts an upper in smooth calf leather with a chunky rubber outsole, which is engraved with Monogram Flowers and the LV Initials to create a decorative, 3D effect. This boot's prominent tread also features Monogram-Flower motifs.",
//     images: [
//       "https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-baroque-ranger-boot-shoes--BNMQ1PPC02_PM2_Front%20view.png?wid=824&hei=824",
//       "https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-baroque-ranger-boot-shoes--BNMQ1PPC02_PM1_Interior%20view.png?wid=824&hei=824",
//       "https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-baroque-ranger-boot-shoes--BNMQ1PPC02_PM1_Interior2%20view.png?wid=824&hei=824",
//     ],
//     brand: "Louis Vuitton",
//     ratingsAverage: 4,
//     ratingsCount: 3,
//     details: {
//       description:
//         "The LV Baroque ranger boot is a hybrid style which was a highlight of Louis Vuitton's Fall-Winter 2022 men's show. It contrasts an upper in smooth calf leather with a chunky rubber outsole, which is engraved with Monogram Flowers and the LV Initials to create a decorative, 3D effect. This boot's prominent tread also features Monogram-Flower motifs.",
//       features: [
//         "Black",
//         "Calf leather",
//         "Rubber outsole",
//         "LV Initials on the tongue",
//         "Engraved Monogram Flowers and LV Initials on the outsole",
//         "Monogram Flowers on the tread",
//         "Monogram-canvas back loop",
//         "Made in Italy",
//       ],
//     },
//   },
//   {
//     name: "Fresh Foam X 1080v12",
//     price: 159.99,
//     summary:
//       "If we only made one running shoe, that shoe would be the 1080. What makes the 1080 unique isn’t just that it’s the best running shoe we make, it’s also the most versatile. The 1080 delivers top-of-the-line performance to every kind of runner, whether you’re training for world-class competition, or catching a rush hour train. The Fresh Foam X 1080v12 represents a consistent progression of the model’s signature qualities. The smooth transitions of the pinnacle underfoot cushioning experience are fine-tuned with updated midsole mapping, which applies more foam to wider areas of the midsole and increases flexibility at the narrower points. The ultra-modern outlook is also reflected in the 1080’s upper construction. The v12 offers a supportive, second-skin style fit with an engineered Hypoknit upper, for a more streamlined overall design.",
//     images: [
//       "https://nb.scene7.com/is/image/NB/m1080z12_nb_02_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&hei=1600",
//       "https://nb.scene7.com/is/image/NB/m1080z12_nb_05_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&hei=1600",
//       "https://nb.scene7.com/is/image/NB/m1080z12_nb_03_i?$dw_detail_main_lg$&bgc=f1f1f1&layer=1&bgcolor=f1f1f1&blendMode=mult&scale=10&wid=1600&hei=1600",
//     ],
//     brand: "New Balance",
//     ratingsAverage: 4,
//     ratingsCount: 5,
//     details: {
//       description:
//         "If we only made one running shoe, that shoe would be the 1080. What makes the 1080 unique isn’t just that it’s the best running shoe we make, it’s also the most versatile. The 1080 delivers top-of-the-line performance to every kind of runner, whether you’re training for world-class competition, or catching a rush hour train. The Fresh Foam X 1080v12 represents a consistent progression of the model’s signature qualities. The smooth transitions of the pinnacle underfoot cushioning experience are fine-tuned with updated midsole mapping, which applies more foam to wider areas of the midsole and increases flexibility at the narrower points. The ultra-modern outlook is also reflected in the 1080’s upper construction. The v12 offers a supportive, second-skin style fit with an engineered Hypoknit upper, for a more streamlined overall design.",
//       features: [
//         "Fresh Foam X midsole foam with approximately 3% bio-based content delivers our most cushioned Fresh Foam experience for incredible comfort. Bio-based content is made from renewable resources to help reduce our carbon footprint",
//         "A Hypoknit upper is designed to provide strategic areas of stretch and support",
//         "Bootie upper construction hugs your foot for a snug, supportive fit",
//         "Underfoot cushioning and flex zones informed by pressure mapping data",
//         "Blown rubber outsole at the forefoot provides superior rebound",
//       ],
//     },
//   },
//   {
//     name: "Nike Air Max Plus",
//     price: 400,
//     summary:
//       "Let your attitude have the edge in the Nike Air Max Plus, a Tuned Air experience that offers premium stability and comfortable cushioning. Its crisp white upper gets a splash of visual intrigue with Swoosh logos designed to look as if they were spray-painted on. Breathable construction, wavy design lines and polished plastic accents blend comfort with defiant style for kicks that are street ready.",
//     images: [
//       "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/9bf81cc2-7757-4c02-b1af-f3c060404afe/air-max-plus-shoes-NL7sg9.png",
//       "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/159e48c3-42a4-4be6-8a31-f4c4ce82ef3d/air-max-plus-shoes-NL7sg9.png",
//       "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/f2248efa-d385-4abc-a1c6-51c4b10c76f9/air-max-plus-shoes-NL7sg9.png",
//     ],
//     brand: "Nike",
//     ratingsAverage: 0,
//     ratingsCount: 0,
//     details: {
//       description:
//         "Let your attitude have the edge in the Nike Air Max Plus, a Tuned Air experience that offers premium stability and comfortable cushioning. Its crisp white upper gets a splash of visual intrigue with Swoosh logos designed to look as if they were spray-painted on. Breathable construction, wavy design lines and polished plastic accents blend comfort with defiant style for kicks that are street ready.",
//       features: [
//         "Reflective Design Details",
//         "Not intended for use as Personal Protective Equipment (PPE)",
//         "Colour Shown: White/Tour Yellow/Baltic Blue/Blue Jay",
//         "Style: DX8962-100",
//         "Country/Region of Origin: Indonesia",
//       ],
//     },
//   },
//   {
//     name: "Max Cushioning Hyper Craze Bounce",
//     price: 120.0,
//     summary:
//       "Experience the absolute ultimate in cushioning and bounce-back response wearing Skechers Max Cushioning® Hyper Craze Bounce. This athletic design features an engineered mesh and synthetic upper with a lace-up front, a Skechers Air-Cooled Goga Mat™ insole, Hyper Burst® midsole cushioning, and a Goodyear® Performance Outsole",
//     images: [
//       "https://www.skechers.com/dw/image/v2/BDCN_PRD/on/demandware.static/-/Sites-skechers-master/default/dw7d3ef525/images/large/220694_BKW.jpg?sw=480",
//       "https://www.skechers.com/dw/image/v2/BDCN_PRD/on/demandware.static/-/Sites-skechers-master/default/dwa7088f47/images/large/220694_BKW_B.jpg?sw=88",
//       "https://www.skechers.com/dw/image/v2/BDCN_PRD/on/demandware.static/-/Sites-skechers-master/default/dwafa6b71a/images/large/220694_BKW_D.jpg?sw=88",
//     ],
//     brand: "Nike",
//     ratingsAverage: 5,
//     ratingsCount: 5,
//     details: {
//       description:
//         "Experience the absolute ultimate in cushioning and bounce-back response wearing Skechers Max Cushioning® Hyper Craze Bounce. This athletic design features an engineered mesh and synthetic upper with a lace-up front, a Skechers Air-Cooled Goga Mat™ insole, Hyper Burst® midsole cushioning, and a Goodyear® Performance Outsole",
//       features: [
//         "Skechers Max Cushioning® design for exceptional comfort and support",
//         "HYPER BURST® cushioning midsole offers a highly responsive and ultra-lightweight experience. This innovative resilient foam is created using a 'Super Critical®' process with spherically-shaped cells compressed into the midsole.",
//         "Skechers Air-Cooled Goga Mat™ breathable insole with high-rebound cushioning",
//         "Goodyear® Performance Outsole delivers enhanced traction, stability and durability Ortholite® comfort foam insole layer adds long-term cushioning and high-level breathability with 5% recycled rubber content",
//         "Ortholite® comfort foam insole layer adds long-term cushioning and high-level breathability with 5% recycled rubber content",
//       ],
//     },
//   },
// ];

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log(err));

const products = fs.readFileSync("./products.json", "utf-8");
// console.log(products);
ProductsModel.create(JSON.parse(products)).then(() =>
  console.log("Added successfully")
);