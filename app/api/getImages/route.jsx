import cloudinary from 'cloudinary';
export const dynamic = 'force-dynamic';


export  async function GET(req) {
   try {
    const results = await cloudinary.v2.search
    .expression('resource_type:image AND -tags:playlist')
    .sort_by('created_at','desc')
    .with_field('tags')
    .max_results(500)
    .execute()
    .then(result=>{
      return result.resources;
    });

    if(!Array.isArray(results)){
      return new Response(JSON.stringify("Error while fetching images"), {status: 500})
    }

    req.headers.set('Cache-Control', 'no-store');

    return new Response(JSON.stringify(results), {status: 200})
   } catch (error) {
    console.log(error)
    return new Response(JSON.stringify("Error while fetching images"), {status: 500})
   }


}