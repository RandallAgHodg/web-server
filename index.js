import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import providerRoutes from "./routes/providerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import salesRoutes from "./routes/saleRoutes.js";
import corsConfig from "./config/cors.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

dotenv.config();

app.use(cors(corsConfig));

//Routing
app.use("/api/employees", employeeRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/sales", salesRoutes);

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
