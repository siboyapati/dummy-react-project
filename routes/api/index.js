const usersRoutes = require("./users");
const messagesRoutes = require("./messages");
const genRoutes = require("./gen");
var router = require("express").Router();

router.use("/users", usersRoutes);
router.use("/messages", messagesRoutes);
router.use("/gen", genRoutes);

module.exports = router;
