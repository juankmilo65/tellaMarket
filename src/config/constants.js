export const apiServices =
  process.env.NODE_ENV === "production"
    ? "https://services.tellamarket.com/api"
    : "http://localhost:3000/api";
export const socialAuth = {
  facebookApplicationId: "2107786579515025",
  googleApplicationId:
    "565852726350-2fllph1abvcfja2b3pjgecgqabs1h1tr.apps.googleusercontent.com" //
};
