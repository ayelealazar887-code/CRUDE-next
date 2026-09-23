import { Router } from "express";
import { createOrder, deleteOrder, getOrderById, getOrders, updateOrderStatus } from "../controllers/order.controller.js";

const orderRouter = Router()

orderRouter.get('/',getOrders);
orderRouter.get('/:id', getOrderById);
orderRouter.post('/', createOrder)
orderRouter.patch("/status", updateOrderStatus);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;