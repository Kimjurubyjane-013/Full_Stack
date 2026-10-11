import { ItemModel } from '../config/db.js';

/**
 * @desc    Get all items with optional filters
 * @route   GET /api/items
 * @access  Public
 */
export async function getItems(req, res, next) {
  try {
    const { category, status, search } = req.query;
    const items = await ItemModel.findAll({ category, status, search });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @desc    Get a single item by ID
 * @route   GET /api/items/:id
 * @access  Public
 */
export async function getItemById(req, res, next) {
  try {
    const item = await ItemModel.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Item not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @desc    Create a new item
 * @route   POST /api/items
 * @access  Private (Bearer token)
 */
export async function createItem(req, res, next) {
  try {
    const { title, description, category, status, priority } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required to create an item',
      });
    }

    const item = await ItemModel.create({
      title,
      description,
      category,
      status,
      priority,
      createdBy: req.user ? req.user.id : 'anonymous',
    });

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: item,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @desc    Update an existing item
 * @route   PUT /api/items/:id
 * @access  Private (Bearer token)
 */
export async function updateItem(req, res, next) {
  try {
    const updated = await ItemModel.update(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Item not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * @desc    Delete an item
 * @route   DELETE /api/items/:id
 * @access  Private (Bearer token)
 */
export async function deleteItem(req, res, next) {
  try {
    const success = await ItemModel.delete(req.params.id);

    if (!success) {
      return res.status(404).json({
        success: false,
        message: `Item not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully',
      id: req.params.id,
    });
  } catch (err) {
    next(err);
  }
}
