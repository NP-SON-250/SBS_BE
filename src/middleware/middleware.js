import Jwt from "jsonwebtoken";
import Users from "../models/Sbs.users.model";

//owner
export const owner = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        statsus: "401",
        message: "Please, login first",
      });
    }
    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUser = await Users.findById(decoded.id);
    if (!loggedInUser) {
      return res.status(403).json({
        status: "403",
        message: "Token has expired. Pleace, login again",
      });
    }
    if (loggedInUser.userRole != "owner") {
      return res.status(401).json({
        status: "401",
        message: "Only owner can do this operation",
      });
    } else {
      req.loggedInUser = loggedInUser;
      next();
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};
//manager
export const manager = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        statsus: "401",
        message: "Please, login first",
      });
    }
    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUser = await Users.findById(decoded.id);
    if (!loggedInUser) {
      return res.status(403).json({
        status: "403",
        message: "Token has expired. Please, login again",
      });
    } 
    if (loggedInUser.userRole != "manager") {
      return res.status(401).json({
        status: "401",
        message: "Only manager can do this operation",
      });
    } else {
      req.loggedInUser = loggedInUser;
      next();
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};

//admin
export const admin = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        statsus: "401",
        message: "Please, login first",
      });
    }
    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUser = await Users.findById(decoded.id);
    if (!loggedInUser) {
      return res.status(403).json({
        status: "403",
        message: "Token has expired. Pleace, login again",
      });
    }
    if (loggedInUser.userRole != "admin") {
      return res.status(401).json({
        status: "401",
        message: "Only admin can do this operation",
      });
    } else {
      req.loggedInUser = loggedInUser;
      next();
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};
//cashier
export const cashier = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        statsus: "401",
        message: "Please, login first",
      });
    }
    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUser = await Users.findById(decoded.id);
    if (!loggedInUser) {
      return res.status(403).json({
        status: "403",
        message: "Token has expired. Please, login again",
      });
    } 
    if (loggedInUser.userRole != "cashier") {
      return res.status(401).json({
        status: "401",
        message: "Only cashier can do this operation",
      });
    } else {
      req.loggedInUser = loggedInUser;
      next();
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};

//server
export const server = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        statsus: "401",
        message: "Please, login first",
      });
    }
    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUser = await Users.findById(decoded.id);
    if (!loggedInUser) {
      return res.status(403).json({
        status: "403",
        message: "Token has expired. Pleace, login again",
      });
    }
    if (loggedInUser.userRole != "server") {
      return res.status(401).json({
        status: "401",
        message: "Only server can do this operation",
      });
    } else {
      req.loggedInUser = loggedInUser;
      next();
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};
//chef
export const chef = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        statsus: "401",
        message: "Please, login first",
      });
    }
    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUser = await Users.findById(decoded.id);
    if (!loggedInUser) {
      return res.status(403).json({
        status: "403",
        message: "Token has expired. Please, login again",
      });
    } 
    if (loggedInUser.userRole != "chef") {
      return res.status(401).json({
        status: "401",
        message: "Only chef can do this operation",
      });
    } else {
      req.loggedInUser = loggedInUser;
      next();
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};
// Normal
 export const normal = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        statsus: "401",
        message: "Please, login first",
      });
    }
    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUser = await Users.findById(decoded.id);
    if (!loggedInUser) {
      return res.status(403).json({
        status: "403",
        message: "Token has expired. Please, login again",
      });
    } 
    else {
      req.loggedInUser = loggedInUser;
      next();
    }
  } catch (error) {
    return res.status(500).json({
      status: "500",
      error: error.message,
    });
  }
};
