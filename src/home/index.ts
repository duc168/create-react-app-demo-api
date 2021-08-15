import { Request, Response, Router } from 'express';

const home = Router().get('/', (req: Request, res: Response) => {
    res.status(200).json({
        "code": 200,
        "data": {
            "test": "Welcome to Demo API"
        }
    })
});

export default home
