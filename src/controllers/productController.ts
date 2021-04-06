import { Request, Response } from 'express'
import { IProduct, Product } from '../models/product'

export class ProductController {
  public async getProducts(req: Request, res: Response): Promise<void> {
    const products = await Product.find()
    res.json({ products })
  }

  public async getProduct(req: Request, res: Response): Promise<void> {
    const product = await Product.findOne({ productId: req.params.id })
    if (product === null) {
      res.sendStatus(404)
    } else {
      res.json(product)
    }
  }

  public async createProduct(req: Request, res: Response): Promise<void> {
    const newProduct: IProduct = new Product(req.body)
    const product = await Product.findOne({ productId: req.body.productId })
    if (product === null) {
      const result = await newProduct.save()
      if (result === null) {
        res.sendStatus(500)
      } else {
        res.status(201).json({ status: 201, data: result })
      }
    } else {
      res.sendStatus(422)
    }
  }

  public async updateProduct(req: Request, res: Response): Promise<void> {
    const product = await Product.findOneAndUpdate({ productId: req.params.id }, req.body)
    if (product === null) {
      res.sendStatus(404)
    } else {
      const updatedProduct = { productId: req.params.id, ...req.body }
      res.json({ status: res.status, data: updatedProduct })
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<void> {
    const product = await Product.findOneAndDelete({ productId: req.params.id })
    if (product === null) {
      res.sendStatus(404)
    } else {
      res.json({ response: 'Product deleted Successfully' })
    }
  }
}
