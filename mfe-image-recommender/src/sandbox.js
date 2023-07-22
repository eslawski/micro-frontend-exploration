import { mountImageRecommender } from "./exposedModules/mountImageRecommender";


const sandbox = document.getElementById("mfe-image-recommender__sandbox");
if (sandbox) {

    const imageRecommenderMountPoint = document.getElementById("image-recommender-mount-point");
    mountImageRecommender(imageRecommenderMountPoint);

}