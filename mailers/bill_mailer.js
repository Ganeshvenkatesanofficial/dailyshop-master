const nodeMailer = require("../config/nodemailer");

exports.newOrder = (order) => {
  let htmlString = nodeMailer.renderTemplate(
    { products: order },
    "new_purchase.ejs"
  );
    // console.log(">>> html string : ", htmlString);

  nodeMailer.transporter.sendMail(
    {
      from: "dailyshopproj@gmail.com",
      to: order.userMailid,
      subject: "Dailyshop | Order Confirmed!!!",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }

      console.log("Message sent", info);
      return;
    }
  );
};
