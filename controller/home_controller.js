const { getHomeItems } = require("./home_services");
const showHome = async (req, res) => {
  try {
    var result = await getHomeItems();
    res.status(200).json({ title: "Home fetched!!", data: result });
  } catch (err) {
    res.status(500).json({ title: "error" });
  }
};
module.exports = {
  showHome: showHome,
};
