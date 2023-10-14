import { getPlaiceholder } from "plaiceholder";

async function getBase64(imgUrl){
    try {
        const res = await fetch(imgUrl)

        if(!res.ok){
            throw new Error(`Failedto fetch image: ${res.status} - ${res.statusText}`)
        }

        const buffer = await res.arrayBuffer();

        const { base64 } = await getPlaiceholder(Buffer.from(buffer));

        return base64;

    } catch (error) {
        console.log(error)
    }
}

export default async function addBlurredDataUrls(images){
    // make all requests at once instead of awaiting each one
    const base64Promises = images.map(img =>{
        return getBase64(img)
    })

    // resolve all requests in order
    const base64Results = await Promise.all(base64Promises);

   /*  const imagesWithBlur = images.map((img, index) =>{
        images.blurredDataUrl = base64Results[index];
        return img;
    }); */

    const imagesWithBlur = images.map((img, index) =>{
        const blurredDataUrl = base64Results[index];
        const imgObject = {
            src: img, 
            blurredDataUrl: blurredDataUrl
        }

        return imgObject;
    });




    return imagesWithBlur;
};

