import { CAMPSITES } from "../../app/shared/CAMPSITES";

export const selectAllCampsites = () => {
  return CAMPSITES;
};

export const selectRandomCampsite = () => {
  const index = Math.floor(Math.random() * CAMPSITES.length);
  return CAMPSITES[index];
};

export const selectCampsiteById = (id) => {
  return CAMPSITES.find((campsite) => campsite.id === parseInt(id));
};

export const selectFeaturedCampsite = () => {
  return CAMPSITES.find((campsite) => campsite.featured);
};
