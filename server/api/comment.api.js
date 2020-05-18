import commentModel from "../model/comment.model";
import nodemailer from "nodemailer";

module.exports.postComment = async (req, res) => {
  const comment = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nstung_17th@agu.edu.vn",
      pass: "DTH166368",
    },
  });

  const mailOptions = {
    from: "nstung_17th@agu.edu.vn",
    to: comment.email,
    subject: "Comment a post in Long Xuyen City Cultural and Sports Center",
    html: `<p>You have commented a post in the Long Xuyen City Cultural and Sports Center!</p>
    <p>This is the link to the post you commented on: Click <a href='${comment.url}'>here</a></p>`,
  };

  await commentModel.create(comment, (err, data) => {
    if (err) throw err;
    else {
      transporter.sendMail(mailOptions);
      res.json({ success: true, cmt: data });
    }
  });
};

module.exports.postReply = async (req, res) => {
  const repComment = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nstung_17th@agu.edu.vn",
      pass: "DTH166368",
    },
  });

  const mailOptions = {
    from: "nstung_17th@agu.edu.vn",
    to: repComment.email,
    subject: "Reply a comment in Long Xuyen City Cultural and Sports Center",
    html: `<p>You have replied a comment in the Long Xuyen City Cultural and Sports Center!</p>
    <p>This is the link to the post you replied: Click <a href='${repComment.url}'>here</a></p>`,
  };

  commentModel.updateOne(
    { _id: repComment.cmtId },
    { $push: { reply: repComment } },
    (err, data) => {
      if (err) res.json({ error: true });
      else {
        transporter.sendMail(mailOptions);
        res.json({ success: true, reply: repComment });
      }
    }
  );

  const emailOwnerCmt = await commentModel.findOne(
    { _id: repComment.cmtId },
    { email: 1, _id: 0 }
  );

  const replyNotify = {
    from: "nstung_17th@agu.edu.vn",
    to: emailOwnerCmt,
    subject: "Reply a comment in Long Xuyen City Cultural and Sports Center",
    html: `<p>${repComment.owner} have replied your comment in the Long Xuyen City Cultural and Sports Center!</p>
    <p>This is the link to the post: Click <a href='${repComment.url}'>here</a></p>`,
  };

  transporter.sendMail(replyNotify);
};

module.exports.getComment = async (req, res) => {
  const post_id = req.params.id;
  const page = req.params.page;
  const comment = await commentModel
    .find({ post_id: post_id })
    .sort({ created_at: -1 })
    .skip((page - 1) * 5)
    .limit(5);
  let count = await commentModel.countDocuments({ post_id: post_id });
  count = Math.ceil(count / 5);
  res.json({ comment: comment, count: count });
};
