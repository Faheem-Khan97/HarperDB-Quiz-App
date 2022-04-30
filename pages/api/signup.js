// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import 'dotenv/config'
import { createUser } from '../../harperdb/harperdb';

export default async function handler(req, res) {
    if(req.method === "GET"){
        res.status(200).json({msg:"GET method is not supported on this route"});
    }
    if(req.method === "POST"){
        console.log(req.body);
        const {username, password } = req.body;
        try {
            const {response, result} = await createUser({username:username.toLowerCase(), password });
            return res.status(response.status).json(result);
        } catch (error) {
            return res.status(500).json({error:error});
        }
    }
    
}
  