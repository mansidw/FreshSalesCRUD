const {
  createResponse,
  responseCodes,
} = require("../services/response.service");
require("dotenv").config();
var connection = require("../config/db.config");
var axios = require("axios");

const CreateContact = async (req, res) => {
  try {
    const { first_name, last_name, data_store, email, mobile_number } =
      req.body;

    if (!first_name) {
      return createResponse(
        res,
        responseCodes.INVALID,
        false,
        "First Name required!"
      );
    }
    if (!last_name) {
      return createResponse(
        res,
        responseCodes.INVALID,
        false,
        "Last Name required!"
      );
    }
    if (!email) {
      return createResponse(
        res,
        responseCodes.INVALID,
        false,
        "Email required!"
      );
    }
    if (!mobile_number) {
      return createResponse(
        res,
        responseCodes.INVALID,
        false,
        "Mobile Number required!"
      );
    }

    let contact = [first_name, last_name, email, mobile_number];

    if (data_store === "CRM") {
      const response = await axios.post(
        "https://idkn.myfreshworks.com/crm/sales/api/contacts",
        {
          contact: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            mobile_number: mobile_number,
          },
        },
        {
          headers: {
            Authorization: `Token token=${process.env.FRESH_SALES_ACCESS_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return createResponse(
        res,
        responseCodes.SUCCESS,
        true,
        "Created Contact",
        response["data"]
      );
    } else {
      connection.query(
        `INSERT INTO contacts (first_name, last_name, email,mobile_number) VALUES (?,?,?,?)`,
        contact,
        function (err, result) {
          if (err) {
            return createResponse(res, responseCodes.INVALID, false, err);
          } else {
            return createResponse(
              res,
              responseCodes.SUCCESS,
              true,
              "Created Contact",
              { result }
            );
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
    return createResponse(res, responseCodes.SERVER_ERROR, false, err.message);
  }
};

const UpdateContact = async (req, res) => {
  try {
    const { cid, new_email, new_mobile_number, data_store } = req.body;

    if (!cid) {
      return createResponse(
        res,
        responseCodes.INVALID,
        false,
        "Contact ID is required"
      );
    }

    if (data_store === "CRM") {
      const response = await axios.put(
        `https://idkn.myfreshworks.com/crm/sales/api/contacts/${cid}`,
        {
          contact: {
            mobile_number: new_mobile_number,
            email: new_email,
          },
        },
        {
          headers: {
            Authorization: `Token token=${process.env.FRESH_SALES_ACCESS_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return createResponse(
        res,
        responseCodes.SUCCESS,
        true,
        "Updated Contact",
        response["data"]
      );
    } else {
      connection.query(
        `UPDATE contacts SET email = ?,mobile_number=? WHERE cid = ?`,
        [new_email, new_mobile_number, cid],
        function (err, result) {
          if (err) {
            return createResponse(res, responseCodes.INVALID, false, err);
          } else {
            return createResponse(
              res,
              responseCodes.SUCCESS,
              true,
              "Updated Contact",
              { result }
            );
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
    return createResponse(res, responseCodes.SERVER_ERROR, false, err.message);
  }
};

const GetContact = async (req, res) => {
  try {
    const { cid, data_store } = req.body;

    if (!cid) {
      return createResponse(
        res,
        responseCodes.INVALID,
        false,
        "Contact ID is required!"
      );
    }

    if (data_store === "CRM") {
      const response = await axios.get(
        `https://idkn.myfreshworks.com/crm/sales/api/contacts/${cid}`,
        {
          headers: {
            Authorization: `Token token=${process.env.FRESH_SALES_ACCESS_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return createResponse(
        res,
        responseCodes.SUCCESS,
        true,
        "Returned Contact",
        response["data"]["contact"]
      );
    } else {
      connection.query(
        "SELECT * FROM contacts WHERE cid = ?",
        [cid],
        function (err, result, fields) {
          if (err) {
            return createResponse(res, responseCodes.INVALID, false, err);
          }
          return createResponse(
            res,
            responseCodes.SUCCESS,
            true,
            "Returned Contact",
            {
              result,
            }
          );
        }
      );
    }
  } catch (err) {
    console.log(err);
    return createResponse(res, responseCodes.SERVER_ERROR, false, err.message);
  }
};

const DeleteContact = async (req, res) => {
  try {
    const { cid, data_store } = req.body;

    if (!cid) {
      return createResponse(
        res,
        responseCodes.INVALID,
        false,
        "Contact ID is required!"
      );
    }

    if (data_store === "CRM") {
      const response = await axios.delete(
        `https://idkn.myfreshworks.com/crm/sales/api/contacts/${cid}`,
        {
          headers: {
            Authorization: `Token token=${process.env.FRESH_SALES_ACCESS_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return createResponse(
        res,
        responseCodes.SUCCESS,
        true,
        "Deleted Contact",
        response["data"]
      );
    } else {
      connection.query(
        "DELETE FROM contacts WHERE cid = ?",
        [cid],
        function (err, result, fields) {
          if (err) {
            return createResponse(res, responseCodes.INVALID, false, err);
          }
          return createResponse(
            res,
            responseCodes.SUCCESS,
            true,
            "Deleted Contact",
            {
              result,
            }
          );
        }
      );
    }
  } catch (err) {
    console.log(err);
    return createResponse(res, responseCodes.SERVER_ERROR, false, err.message);
  }
};

module.exports = {
  CreateContact,
  UpdateContact,
  GetContact,
  DeleteContact,
};
