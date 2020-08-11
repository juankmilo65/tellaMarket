export const apiServices =
  process.env.NODE_ENV === "production"
    ? "https://services.tellamarket.com/api"
    : "http://localhost:3000/api";
export const miniaturePath =
  process.env.NODE_ENV === "production"
    ? "https://services.tellamarket.com/itemsMiniatures/"
    : "http://localhost:3000/itemsMiniatures/";
export const imagesPath =
  process.env.NODE_ENV === "production"
    ? "https://services.tellamarket.com/itemsImages/"
    : "http://localhost:3000/itemsImages/";
export const headersPath =
  process.env.NODE_ENV === "production"
    ? "https://services.tellamarket.com/headersImages/"
    : "http://localhost:3000/headersImages/";
export const socialAuth = {
  facebookApplicationId: "2107786579515025",
  googleApplicationId:
    "565852726350-2fllph1abvcfja2b3pjgecgqabs1h1tr.apps.googleusercontent.com", //
};
export const initialQuantitiyPerPage = 3;
