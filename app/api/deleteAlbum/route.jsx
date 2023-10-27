import cloudinary from 'cloudinary';
export const dynamic = 'force-dynamic';

export async function POST(request) {
    const body = await request.json();

    const {album} = body;

    try{
        await cloudinary.v2.api.delete_folder(album)

        request.headers.set('Cache-Control', 'no-store');
    
        return new Response(JSON.stringify("album deleted"), {status:200})
    }catch(error){
        console.log(error);
        return new Response(JSON.stringify("Errore nella cancellzione del nuovo album"), {status:500})
    }
};