import { Request, Response } from "express"
import {
    ProductCreationException,
    ProductDeletionException,
    ProductNotFoundException,
    ProductStockException,
    ProductUpdateException,
    UserNotFoundException,
} from "../errors"
import { JWTInterface } from "../interfaces"
import {
    createProduct as createProductService,
    getAllProducts as getAllProductsService,
    getProductById as getProductByIdService,
    removeProduct as removeProductService,
    updateProduct as updateProductService,
} from "../services"
import { RESPONSES } from "../utils"

/**
 * Endpoint para la creación de un nuevo producto.
 */
export const createProduct = async (req: Request, res: Response) => {
    try {
        const userObject = JSON.parse(String(req.query["jwt"])) as JWTInterface

        const newProduct = await createProductService({
            ...req.body,
            userId: userObject.id,
        })

        res.status(RESPONSES.CREATED.status).json({
            message: RESPONSES.CREATED.message,
            data: newProduct,
        })
    } catch (error) {
        if (error instanceof UserNotFoundException) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (
            error instanceof ProductStockException ||
            error instanceof ProductCreationException
        ) {
            res.status(RESPONSES.BAD_REQUEST.status).json({
                message: error.message,
            })
            return
        }

        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

/**
 * Endpoint para obtener todos los productos.
 */
export const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const products = await getAllProductsService()
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: products,
        })
    } catch (error) {
        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

/**
 * Endpoint para obtener un producto específico por su ID.
 */
export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const product = await getProductByIdService(id)

        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: product,
        })
    } catch (error) {
        if (error instanceof ProductNotFoundException) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

/**
 * Endpoint para la actualización parcial de un producto.
 */
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const updated = await updateProductService(id, req.body)

        res.status(RESPONSES.UPDATED.status).json({
            message: RESPONSES.UPDATED.message,
            data: updated,
        })
    } catch (error) {
        switch (true) {
            case error instanceof ProductNotFoundException:
                res.status(RESPONSES.NOT_FOUND.status).json({
                    message: error.message,
                })
                break
            case error instanceof ProductStockException:
            case error instanceof ProductUpdateException:
                res.status(RESPONSES.BAD_REQUEST.status).json({
                    message: error.message,
                })
                break
            default:
                res.status(RESPONSES.SERVER_ERROR.status).json({
                    message: RESPONSES.SERVER_ERROR.message,
                })
                break
        }
        console.error(error)
    }
}

/**
 * Endpoint para el borrado lógico de un producto.
 */
export const removeProduct = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        await removeProductService(id)

        res.status(RESPONSES.DELETED.status).json({
            message: RESPONSES.DELETED.message,
        })
    } catch (error) {
        if (error instanceof ProductNotFoundException) {
            res.status(RESPONSES.NOT_FOUND.status).json({
                message: error.message,
            })
            return
        }

        if (error instanceof ProductDeletionException) {
            res.status(RESPONSES.BAD_REQUEST.status).json({
                message: error.message,
            })
            return
        }

        console.error(error)
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}
