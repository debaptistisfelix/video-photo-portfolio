import cloudinary from 'cloudinary';
export const dynamic = 'force-dynamic';

export async function POST(request) {
    const body = await request.json();

    const {newAlbum, imagesToAddToAlbum} = body;

    console.log("body from request to create album: ", body)
    try{
        let updatedImages = [];

        await cloudinary.v2.api.create_folder(newAlbum)

        if(imagesToAddToAlbum.length > 1){
            for(let image of imagesToAddToAlbum){
                await cloudinary.v2.uploader.rename(image, `${newAlbum}/${image}`, function(error, result){
                    console.log("Result:",result)
                    console.log("Error:",error)
                    updatedImages.push(result);
                })
            }
        } else if(imagesToAddToAlbum.length ===  1){
            await cloudinary.v2.uploader.rename(imagesToAddToAlbum[0], `${newAlbum}/${imagesToAddToAlbum[0]}`, function(error, result){
                console.log("Result:",result)
                console.log("Error:",error)
                updatedImages.push(result);
            })
        }

        request.headers.set('Cache-Control', 'no-store');
        console.log("updatedImages",updatedImages)

        return new Response(JSON.stringify(updatedImages), {status:200})
    }catch(error){
        console.log(error);
        return new Response(JSON.stringify("Errore nella creazione del nuovo album"), {status:500})
    }
};