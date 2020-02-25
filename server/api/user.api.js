module.exports.signin = function(req, res) {
  console.log(req.body);
  if (req.body) res.json("Success");
  else res.json("Failed");
};
