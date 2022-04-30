// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import 'dotenv/config'
import { getQuestions } from '../../harperdb/harperdb';

export default async function handler(req, res) {
    if(req.method === "GET"){
        const {page} = req.query;
        try {
            const {response, result} = await getQuestions(Number(page), 5);
            return res.status(response.status).json(result);
        } catch (error) {
            return res.status(500).json({error:error});
        }
    }
    if(req.method === "POST"){
        return res.status(500).json({error:"POST method not supported"});
    }
    
}
  