const bcrypt = require("bcryptjs");
const { Contacts } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  async identify(req, res) {
    try {
      const { email, phoneNumber } = req.body;
      if (!email && !phoneNumber) {
        return res.status(400).send({
          message: "Please enter your email or phone number"
        })
      }
      // find if Contact exists with phone number and email
      const isExists = await Contacts.findAll({
        where: {
          linkPreference: "primary",
          [Op.or]: [
            {
              email,
            },
            {
              phoneNumber,
            },
          ],
        },
        order: [["createdAt", "ASC"]],
        raw: true,
        nest: true,
      });

      // Contact to create
      let contactToCreate = {
        email,
        phoneNumber,
        linkedId: null,
        linkPreference: "primary",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      let phoneNumbers = [];
      let secondaryContactIds = [];
      let emails = [];

      // if we have contacts then create
      if (isExists && isExists.length) {
        phoneNumbers.push(isExists[0].phoneNumber)
        emails.push(isExists[0].email);
        contactToCreate.linkedId = isExists[0].id;
        contactToCreate.linkPreference = "secondary";
      }
      let createdContact;
      if (isExists.length === 2) {
        await Contacts.update(
          {
            linkPreference: "secondary",
            linkedId: isExists[0].id,
          },
          {
            where: {
              id: isExists[1].id,
            },
          }
        );
        phoneNumbers = isExists.map(contact => contact.phoneNumber)
        secondaryContactIds.push(isExists[1].id)
        emails = isExists.map(contact => contact.email)
      } else {
        createdContact = await Contacts.create(contactToCreate);
        if (createdContact.linkPreference == "secondary") {
          secondaryContactIds.push(createdContact.id)
        }
        emails.push(createdContact.email);
        phoneNumbers.push(createdContact.phoneNumber);
      }
      let response = {
        contact: {
          primaryContatctId: isExists[0]?.id || createdContact?.id,
          secondaryContactIds,
          phoneNumbers,
          emails,
        }
      }
      return res.send(response);
    } catch (error) {
      console.log("error", error);
      return res.send(error);
    }
  },
};
