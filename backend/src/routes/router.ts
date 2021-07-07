import { Router } from "express";
import { login, logout } from "../controllers/auth";
import { getClusterStatusInfo, getCpuUsageData, getMemoryUsageData } from "../controllers/healthCheck";
import { deleteUser, getAllUsers, getUser, registerUser, updateUser } from "../controllers/user";
import { verifyJWT } from "../jwtConfig";

const router = Router();

router.get("/GetCpuUsageData", verifyJWT ,getCpuUsageData );
router.get("/GetMemoryUsageData", verifyJWT, getMemoryUsageData );
router.get("/GetClusterStatusInfo", verifyJWT, getClusterStatusInfo );
router.get("/GetUser/:id", verifyJWT, getUser );
router.get("/GetUsers", verifyJWT, getAllUsers );
router.post("/RegisterUser", verifyJWT, registerUser );
router.post("/UpdateUser", verifyJWT, updateUser );
router.post("/DeleteUser", verifyJWT, deleteUser );
router.post("/login", login );
router.post("/logout", logout );

export default router;
