import { promises as fs } from "fs";
import path from "path";

type ImageArray = string[] | undefined;

export async function getImages(folderName: string): Promise<ImageArray> {
  try {
    const imageFileNames: ImageArray = await fs.readdir(
      path.join(process.cwd(), "/public/images/", folderName)
    );

    return imageFileNames;
  } catch (err: any) {
    console.log(err);
  }
}
