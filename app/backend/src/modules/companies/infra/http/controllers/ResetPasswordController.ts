// index, show, create, update, delete
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/companies/services/ResetPasswordService';

export default class ResetPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { password, token } = request.body;

        const resetPasswordService = container.resolve(ResetPasswordService);

        await resetPasswordService.execute({ token, password });

        return response.status(204).json();
    }
}
