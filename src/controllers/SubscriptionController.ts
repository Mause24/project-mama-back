import { Request, Response } from "express"
import {
    ActiveSubscriptionExistsException,
    CannotCreateSubscriptionException,
    SubscriptionMembershipNotFoundException,
    SubscriptionNotFoundException,
    SubscriptionQueryException,
    SubscriptionUserNotFoundException,
} from "../errors"
import * as subscriptionService from "../services"
import { RESPONSES } from "../utils"

export const createSubscription = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const newSubscription = await subscriptionService.createSubscription(
            req.body
        )
        res.status(RESPONSES.CREATED.status).json({
            message: RESPONSES.CREATED.message,
            data: newSubscription,
        })
    } catch (error) {
        switch (true) {
            case error instanceof SubscriptionUserNotFoundException:
            case error instanceof SubscriptionMembershipNotFoundException:
                res.status(RESPONSES.NOT_FOUND.status).json({
                    message: error.message,
                })
                break
            case error instanceof ActiveSubscriptionExistsException:
            case error instanceof CannotCreateSubscriptionException:
            case error instanceof SubscriptionQueryException:
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
    }
}

export const getAllSubscriptions = async (
    _req: Request,
    res: Response
): Promise<void> => {
    try {
        const subscriptions = await subscriptionService.getAllSubscriptions()
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: subscriptions,
        })
    } catch (error) {
        res.status(RESPONSES.SERVER_ERROR.status).json({
            message: RESPONSES.SERVER_ERROR.message,
        })
    }
}

export const getSubscriptionById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10)
        const subscription = await subscriptionService.getSubscriptionById(id)
        res.status(RESPONSES.OK.status).json({
            message: RESPONSES.OK.message,
            data: subscription,
        })
    } catch (error) {
        switch (true) {
            case error instanceof SubscriptionNotFoundException:
                res.status(RESPONSES.NOT_FOUND.status).json({
                    message: error.message,
                })
                break
            default:
                res.status(RESPONSES.SERVER_ERROR.status).json({
                    message: RESPONSES.SERVER_ERROR.message,
                })
                break
        }
    }
}
