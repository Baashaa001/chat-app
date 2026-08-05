import expess from "express"
import { getMessages, getUserForSideBar, markMessageAsSeen, sendMessage } from "../controller/messageController.js"
import protectRoute from "../middleware/auth.js"

const messageRouter = expess.Router()

messageRouter.get('/users', protectRoute, getUserForSideBar)
messageRouter.get("/:id", protectRoute, getMessages)
messageRouter.put("/mark/:id", protectRoute, markMessageAsSeen)
messageRouter.post("/send/:id", protectRoute, sendMessage )

export default messageRouter