const requireJwtAuth = require("../../middleware/requireJwtAuth");
const { Message, validateMessage } = require("../../models/Message");
const { getDb } = require("../../datatbase");
var router = require("express").Router();

router.get("/", async (req, res) => {
  try {

    //await mgoClient.db("etf_db").collection('ARKG').find({}).limit(1).toArray()
    const db1 = getDb().db("etf_activity");
    let ARKG = await db1.collection("ARKG").find().sort({ timestamp: -1 }).limit(5).toArray();
    let ARKW = await db1.collection("ARKW").find().sort({ timestamp: -1 }).limit(5).toArray();
    let ARKQ = await db1.collection("ARKQ").find().sort({ timestamp: -1 }).limit(5).toArray();
    let ARKF = await db1.collection("ARKF").find().sort({ timestamp: -1 }).limit(5).toArray();
    let ARKK = await db1.collection("ARKK").find().sort({ timestamp: -1 }).limit(5).toArray();

    let CLOU = await db1.collection("CLOU").find().sort({ timestamp: -1 }).limit(5).toArray();
    let GNOM = await db1.collection("GNOM").find().sort({ timestamp: -1 }).limit(5).toArray();
    let IBBJ = await db1.collection("IBBJ").find().sort({ timestamp: -1 }).limit(5).toArray();
    let IPOETF = await db1.collection("IPOETF").find().sort({ timestamp: -1 }).limit(5).toArray();
    let SPAK = await db1.collection("SPAK").find().sort({ timestamp: -1 }).limit(5).toArray();
    let SPCX = await db1.collection("SPCX").find().sort({ timestamp: -1 }).limit(5).toArray();
    let WCLD = await db1.collection("WCLD").find().sort({ timestamp: -1 }).limit(5).toArray();



    await ARKG
    await ARKW
    await ARKQ
    await ARKF
    await ARKK

    await CLOU
    await GNOM
    await IBBJ
    await IPOETF
    await SPAK
    await SPCX
    await WCLD
    // const ARKK = db.collection("ARKK").find().sort({ timestamp: -1 }).toArray();
    // const ARKW = db.collection("ARKW").find().sort({ timestamp: -1 }).toArray();
    // await ARKG;
    // await ARKK;
    // await ARKK;
    res.json({
      ARKG,
      // ARKK,
      // ARKW,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
});
//   });
// router.get('/', async (req, res) => {
//   try {
//     const messages = await Message.find().sort({ createdAt: 'desc' }).populate('user');
//     res.json({
//       messages: messages.map((m) => {
//         return m.toJSON();
//       }),
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Something went wrong.' });
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate("user");
    if (!message) return res.status(404).json({ message: "No message found." });
    res.json({ message: message.toJSON() });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.post("/", requireJwtAuth, async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let message = await Message.create({
      text: req.body.text,
      user: req.user.id,
    });
    message = await message.populate("user").execPopulate();

    res.status(200).json({ message: message.toJSON() });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.delete("/:id", requireJwtAuth, async (req, res) => {
  try {
    const tempMessage = await Message.findById(req.params.id).populate("user");
    if (!(tempMessage.user.id === req.user.id || req.user.role === "ADMIN"))
      return res
        .status(400)
        .json({ message: "Not the message owner or admin." });

    const message = await Message.findByIdAndRemove(req.params.id).populate(
      "user"
    );
    if (!message) return res.status(404).json({ message: "No message found." });
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

router.put("/:id", requireJwtAuth, async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const tempMessage = await Message.findById(req.params.id).populate("user");
    if (!(tempMessage.user.id === req.user.id || req.user.role === "ADMIN"))
      return res
        .status(400)
        .json({ message: "Not the message owner or admin." });

    let message = await Message.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text, user: tempMessage.user.id },
      { new: true }
    );
    if (!message) return res.status(404).json({ message: "No message found." });
    message = await message.populate("user").execPopulate();

    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;
