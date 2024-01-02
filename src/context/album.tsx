import { createContext } from "react";

export type IAlbum = {
    id: string;
    album : string;
    img : string;
}

type IAlbumContext = {
    album : IAlbum | null;
    setAlbum : (albumData : IAlbum | null) => void;
}

export const getAlbum = [];

export function addAlbum(id: string) {
    const album = albumsContext.find((e:any) => e.id === id);
    getAlbum.push(album);
}

export function removeAlbum(id: string) {
    const album = albumsContext.find((e:any) => e.id === id);
    getAlbum.splice(getAlbum.indexOf(album), 1);
}

export const albumsContext = [];

export const musics = [
    {id : '1', name : 'Musica 01'},
    {id : '2', name : 'Musica 02'},
    {id : '3', name : 'Musica 03'},
    {id : '4', name : 'Musica 04'},
]

const AlbumContext = createContext<IAlbumContext | null>({album : null, setAlbum : () => {}});

export default AlbumContext;