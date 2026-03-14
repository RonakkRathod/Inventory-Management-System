const Warehouse = require('../models/Warehouse')

async function createWarehouse(req, res) {
  const { name, code, location } = req.body

  if (!name || !code) {
    return res.status(400).json({ message: 'name and code are required.' })
  }

  const warehouse = await Warehouse.create({ name, code, location })
  return res.status(201).json(warehouse)
}

async function listWarehouses(req, res) {
  const warehouses = await Warehouse.find({ isActive: true }).sort({ name: 1 })
  return res.status(200).json(warehouses)
}

async function updateWarehouse(req, res) {
  const warehouse = await Warehouse.findByIdAndUpdate(req.params.warehouseId, req.body, {
    new: true,
    runValidators: true,
  })

  if (!warehouse) {
    return res.status(404).json({ message: 'Warehouse not found.' })
  }

  return res.status(200).json(warehouse)
}

module.exports = {
  createWarehouse,
  listWarehouses,
  updateWarehouse,
}
