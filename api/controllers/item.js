const Item = require("../models/Item");

exports.create = async (req, res) => {
  try {

    await new Item(req.body).save();

    res.json({
      succes: true,
      message: "success",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send("server error");
  }
};

exports.list = async (req, res) => {
  try {
    
    const items = await Item.find({}).sort([["createdAt", "desc"]]);

    res.json({
        succes: true,
        message: "success",
        data: items,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

exports.read = async (req, res) => {
  try {
    const { _id } = req.params;

    const item = await Item.findOne({ _id }).exec();

    res.json({
        succes: true,
        message: "success",
        data : item
      });

  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.body;

    await Item.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    }).exec();

    res.json({
        succes: true,
        message: "success",
      });

  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};

