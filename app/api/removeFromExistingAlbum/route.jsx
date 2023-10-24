import cloudinary from 'cloudinary';
export const dynamic = 'force-dynamic';

export async function POST(request) {
    const body = await request.json();

    const {imagesToRemoveFromAlbum} = body;

    console.log("images to remove from album: ", imagesToRemoveFromAlbum)

    try{

        let updatedImages = [];
        if(imagesToRemoveFromAlbum.length >1){
            for(let image of imagesToRemoveFromAlbum){
                const publicIdSplitted = image.split("/");
                const publicdId = publicIdSplitted[1];
                await cloudinary.v2.uploader.rename(image, `${publicdId}`, function(error, result){
                    console.log("Result:",result)
                    console.log("Error:",error)
                    updatedImages.push(result)
                })

            }
            
        }else if(imagesToRemoveFromAlbum.length === 1){
            const publicIdSplitted = imagesToRemoveFromAlbum[0].split("/");
            const publicdId = publicIdSplitted[1];
            await cloudinary.v2.uploader.rename(imagesToRemoveFromAlbum[0], `${publicdId}`, function(error, result){
                console.log("Result:",result)
                console.log("Error:",error)
                updatedImages.push(result)
            
            })
        }

        console.log("udated images: ", updatedImages)

        return new Response(JSON.stringify(updatedImages), {status:200})
    
    }

    
    catch(error){
        console.log(error)
        return new Response(JSON.stringify("Errore nella rimozione delle immagini dall'Album"), {status:500})
    }
}