import {PrismaClient} from '@prisma/client'
export const dynamic = 'force-dynamic';
const prisma = new PrismaClient();

export async function DELETE(request, {params}){
    const {videoId} = params;

    try {
        const videoToDelete = await prisma.youtubeVideo.delete({
            where: {
                id: videoId
            }
        })

        return new Response(JSON.stringify("Video Deleted"), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify("Error while deleting video"), {status: 500})
    }
}