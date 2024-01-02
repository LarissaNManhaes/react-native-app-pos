import api from ".";

export const getAlbums = (token : string) => {
   return api.get("/albums", {headers: { "Authorization" : `Bearer ${token}`}});
}

export const getStories = (token : string) => {
   return api.get("/stories", {headers: { "Authorization" : `Bearer ${token}`}});
}