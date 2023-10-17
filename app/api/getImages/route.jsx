import cloudinary from 'cloudinary';
import addBlurredDataUrls from '@/lib/getBase64';
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

    const imagesWithBlurredDataUrl = await addBlurredDataUrls(results);

    req.headers.set('Cache-Control', 'no-store');

    return new Response(JSON.stringify(imagesWithBlurredDataUrl), {status: 200})
   } catch (error) {
    console.log(error)
    return new Response(JSON.stringify("Error while fetching images"), {status: 500})
   }


}