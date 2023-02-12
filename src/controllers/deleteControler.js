import { read, write } from "../lib/models.js";

function deleteControler(itemsCollectionsName,itemNameId) {
  return ((req, res) => {
    try {
      let itemsCollections = read(itemsCollectionsName);
      let { id } = req.params;
      let indexItem = itemsCollections.findIndex((item) => {
        return item[itemNameId] == id;
      });
      if (indexItem < 0) {
        throw new Error("this id not exist");
      }
      let item = itemsCollections.splice(indexItem, 1);
      write(itemsCollectionsName, itemsCollections);
      res.status(200).json({ status: 200, message: "deleted", item });
    } catch (err) {
      res.status(400).json({ status: 400, message: err.message });
    }
  });
}
export default deleteControler;