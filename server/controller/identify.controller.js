const bcrypt = require("bcryptjs");
const { Contacts } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  async identify(req, res) {
    try {
      const { email, phoneNumber } = req.body;
      const isExists = await Contacts.findOne({
        where: {
          [Op.in]: [
            {
              email,
            },
            {
              phoneNumber,
            },
          ],
        },
      });

      if (!isExists) {
        await Contacts.create({
          email,
          phoneNumber,
          linkedId: null,
          linkPreference: 'primary',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        });
      } else {
        
      }
    } catch (error) {
      console.log("error", error);
      return res.send(error);
    }
  },
};
