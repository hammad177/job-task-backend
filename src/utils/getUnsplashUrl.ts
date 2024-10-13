import { UNSPLASH } from "../constants";

export const getUnsplashUrl = () => {
  return `${UNSPLASH.PHOTO_API}?client_id=${UNSPLASH.CLIENT_ID}&topics=${UNSPLASH.PHOTO_TOPIC_ID}&count=1`;
};
