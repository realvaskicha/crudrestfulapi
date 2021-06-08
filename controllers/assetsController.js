const db = require("../db").promise();

exports.insert = async (req, res, next) => {

  if (!req.body.Name || !req.body.ESET_Number || !req.body.Type) {
    return res.status(400).json({
      message: "Please fill in all the required fields.",
      fields: ["Name", "ESET_Number", "Type"],
    });
  }

  try {
      
    const [rows] = await db.execute(
      "INSERT INTO `edynassets`(`Name`,`ESET_Number`, `Type`, `Brand`, `Serial_service_tag`, `Description`, `Create_Date`, `Warranty`, `Maintenance`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [req.body.Name, req.body.ESET_Number, req.body.Type, req.body.Brand, req.body.Serial_service_tag, req.body.Description, req.body.Create_Date, req.body.Warranty, req.body.Maintenance]
    );

    if (rows.affectedRows === 1) {
      return res.status(201).json({
        message: "The asset has been successfully inserted.",
        assetID: rows.esetNumber,
      });
    }

  } catch (err) {
    next(err);
  }
  
};

exports.getAllAssets = async (req, res, next) => {
  try {

    const [rows] = await db.execute("SELECT * FROM `edynassets`");

    if (rows.length === 0) {
      return res.status(200).json({
        message:
          "There are no assets in the database, please insert some assets.",
      });
    }

    res.status(200).json(rows);

  } catch (err) {
    next(err);
  }

};

exports.getAssetByID = async (req, res, next) => {

  try {

    const [row] = await db.execute(
        "SELECT * FROM `edynassets` WHERE `ESET_Number`=?",
        [req.params.id]
    );

    if (row.length === 0) {
      return res.status(404).json({
        message: "No Asset Found!",
      });
    }

    res.status(200).json(row[0]);

  } catch (err) {
    next(err);
  }

};

exports.updateAsset = async (req, res, next) => {
  try {

    const [row] = await db.execute(
        "SELECT * FROM `edynassets` WHERE `ESET_Number`=?",
        [req.params.id]
    );

    if (row.length === 0) {
      return res.status(404).json({
        message: "Invalid ESET Number",
      });
    }

    if (req.body.Name) row[0].Name = req.body.Name;
    if (req.body.ESET_Number) row[0].ESET_Number = req.body.ESET_Number;
    if (req.body.Type) row[0].Type = req.body.Type;
    if (req.body.Brand) row[0].Brand = req.body.Brand;
    if (req.body.Serial_service_tag) row[0].Serial_service_tag = req.body.Serial_service_tag;
    if (req.body.Description) row[0].Description = req.body.Description;
    if (req.body.Create_Date) row[0].Create_Date = req.body.Create_Date;
    if (req.body.Warranty) row[0].Warranty = req.body.Warranty;
    if (req.body.Maintenance) row[0].Maintenance = req.body.Maintenance;
    
    const [update] = await db.execute(
      "UPDATE `edynassets` SET `Name`=?, `ESET_Number`=?, `Type`=?, `Brand`=?, `Serial_service_tag`=?, `Description`=?, `Create_Date`=?, `Warranty`=?, `Maintenance`=? WHERE `ESET_Number`=?",
      [row[0].Name, row[0].ESET_Number, row[0].Type, row[0].Brand, row[0].Serial_service_tag, row[0].Description, row[0].Create_Date, row[0].Warranty, row[0].Maintenance, req.params.id]
    );

    if (update.affectedRows === 1) {
      return res.json({
        message: "The Asset has been successfully updated.",
      });
    }

  } catch (err) {
    next(err);
  }

};

exports.deleteAsset = async (req, res, next) => {

  try {

    const [row] = await db.execute(
        "DELETE FROM `edynassets` WHERE `ESET_Number`=?",
        [req.params.id]
    );

    if (row.affectedRows === 0) {
      return res.status(404).json({
        message: "Invalid asset ID (No Asset Found!)",
      });
    }

    res.status(200).json({
      message: "The asset has been deleted successfully.",
    });
    
  } catch (err) {
    next(err);
  }

};