require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const receiverEmail = process.env.CONTACT_TO_EMAIL || process.env.EMAIL_USER;

app.get("/api/health", function (req, res) {
  res.json({ ok: true });
});

router.post("/contact", async function (req, res) {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim();
  const message = String(req.body.message || "").trim();

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({
      error: "EMAIL_USER and EMAIL_PASS must be set in .env.",
    });
  }

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Name, email and message are required." });
  }

  if (!receiverEmail) {
    return res
      .status(500)
      .json({ error: "Server email recipient is not configured." });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: receiverEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Portfolio Contact Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    res.json({ ok: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact mail error:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

app.use("/api", router);

app.listen(port, function () {
  console.log(`Contact API running on http://localhost:${port}`);
});
