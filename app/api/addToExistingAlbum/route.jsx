import cloudinary from 'cloudinary';
export const dynamic = 'force-dynamic';

export async function POST(request) {
    const body = await request.json();

    const {albumName, images} = body;


    try{
        const updatedImages =[];


        if(images.length > 1){
            for(let image of images){
                await cloudinary.v2.uploader.rename(image, `${albumName}/${image}`, function(result){
                    updatedImages.push(result);
                })
            }
        } else if(images.length ===  1){
            await cloudinary.v2.uploader.rename(images[0], `${albumName}/${images[0]}`, function(result){
                updatedImages.push(result);
                console.log("result",result)
            })
        }

        request.headers.set('Cache-Control', 'no-store');

        console.log(updatedImages);

        return new Response(JSON.stringify(updatedImages), {status:200})
    }catch(error){
        console.log(error);
        return new Response(JSON.stringify("Errore nella creazione del nuovo album"), {status:500})
    }
};