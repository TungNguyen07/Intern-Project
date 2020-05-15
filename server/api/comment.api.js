import commentModel from "../model/comment.model";

module.exports.postComment = async (req, res) => {
  const comment = req.body;
  await commentModel.create(comment, (err, html) => {
    if (err) throw err;
    res.json({ cmt: html });
  });
};

module.exports.postReply = async (req, res) => {
  const repComment = req.body;

  await commentModel.updateOne(
    { _id: repComment.cmtId },
    { $push: { reply: repComment } }
  );
  res.json({ success: true });
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
