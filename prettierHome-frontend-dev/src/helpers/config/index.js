export const config = {
  project: {
    name: "Prettier Homes",
    description:
      "An real estate website is an online platform where users can buy, sell, or rent properties such as houses, apartments, land, and commercial real estate. ",
  },
  api: {
    baseUrl: 'http://localhost:8080',
},
  contact: {
    phone1: "+1 (315) 686-8284",
    email: "info@realestate.com",
    address: "329 Queensberry St, North Melbourne VIC 3051, Avustralya",
    mapURL: "https://maps.app.goo.gl/HWgzFPRW1s4EUgk8A",
    mapEmbedURL:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3023.490731046204!2d-74.00457492439138!3d40.72922623656155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDQzJzQ1LjIiTiA3NMKwMDAnMDcuMiJX!5e0!3m2!1sen!2sgr!4v1691050244325!5m2!1sen!2sgr",
    address2: "1301 2nd Ave, Seattle, WA 98101",
    phone2: "(315) 905-2321",
  },
  pageRoles: {
    myProfile: ["ADMIN","MANAGER","CUSTOMER"],
    myAdverts: ["ADMIN","MANAGER","CUSTOMER"],
    myFavorites: ["ADMIN","MANAGER","CUSTOMER"],
    dashboard: ["ADMIN","MANAGER"]
},
  selectRoles:{
    roles:["ADMIN","MANAGER","CUSTOMER"]
},
 advertsCategory:{
  category:["House","Apartment","Office","Villa","Land","Shop"]
},
advertsType:{
  type:["Rent","Sale"]
},
advertsStatus:{
  status:["PENDING","ACTIVATED","REJECTED"]
},
tourRequestStatus:{
  status:["PENDING","APPROVED","DECLINED","CANCELED"]
},
};
