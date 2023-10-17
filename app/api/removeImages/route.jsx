import cloudinary from 'cloudinary';
export const dynamic = 'force-dynamic';


export  async function POST(req) {
    const body = await req.json();
    const {imagesPublicIds} = body;

   try {
    const result = await cloudinary.v2.api
        .delete_resources([...imagesPublicIds])
        .then(result=>{
            console.log(result)
            return result
        });

    req.headers.set('Cache-Control', 'no-store');

    return new Response(JSON.stringify(result), {status: 200})
   } catch (error) {
    console.log(error)
    return new Response(JSON.stringify("Error while removing images"), {status: 500})
   }


}