import { ComponentLoader } from "adminjs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const componentLoader = new ComponentLoader();
const Components = {
    UploadNews: componentLoader.add("UploadNews", path.resolve(__dirname, "./UploadNews.jsx")),
    Calender: componentLoader.add("Calender", path.resolve(__dirname, "./Calendar.jsx")),
    UploadCategories: componentLoader.add("UploadCategories", path.resolve(__dirname, "./UploadCategories.jsx")),
};
// console.log(Components.Upload);
export { componentLoader, Components };
