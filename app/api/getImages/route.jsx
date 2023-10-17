import cloudinary from 'cloudinary';
export const dynamic = 'force-dynamic';


export  async function GET(req) {
   try {
    const results = await cloudinary.v2.search
    .expression('resource_type:image')
    .sort_by('created_at','desc')
    .max_results(500)
    .execute()
    .then(result=>{
      return result.resources;
    });

    req.headers.set('Cache-Control', 'no-store');

    return new Response(JSON.stringify(results), {status: 200})
   } catch (error) {
    console.log(error)
    return new Response(JSON.stringify("Error while fetching images"), {status: 500})
   }


}