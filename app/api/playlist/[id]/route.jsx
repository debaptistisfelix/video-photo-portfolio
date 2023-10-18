import { PrismaClient } from "@prisma/client";
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(request, {params}){
    const {id} = params;

    console.log("id:", id)
    try{
        const playlist = await prisma.playlist.findUnique({
            where: {
                id:id
            }
        });

        request.headers.set('Cache-Control', 'no-store');

        return new Response(JSON.stringify(playlist), {status: 200})
    } catch(error){
        console.log(error)
        return new Response(JSON.stringify("Error while fetching Playlist"), {status: 500})
    }
}

export async function PATCH(request, {params}){
    const {id} = params;
    const body = await request.json();
    console.log("body:", body)

   

    try{
        const updatedPlaylist = await prisma.playlist.update({
            where: {
                id: id
            },
            data:{
                ...body
            }
        });

        request.headers.set('Cache-Control', 'no-store');

        return new Response(JSON.stringify(updatedPlaylist), {status: 200})
    } catch(error){
        console.log(error)
        return new Response(JSON.stringify("Error while updating Playlist"), {status: 500})
    }
}

export async function DELETE(request, {params}){
    const {id} = params;

    try{
        const deletedPlaylist = await prisma.playlist.delete({
            where: {
                id: id
            }
        });

        request.headers.set('Cache-Control', 'no-store');

        return new Response(JSON.stringify("Playlist Deleted"), {status: 200})
    } catch(error){
        console.log(error)
        return new Response(JSON.stringify("Error while deleting Playlist"), {status: 500})
    }
}