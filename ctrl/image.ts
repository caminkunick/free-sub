import { User } from "firebase/auth";
import {
  FirebaseStorage,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";

export type FSImageItem = { name: string; url: string };
export class FSImage {
  url: string;
  pos: Record<"left" | "top", string> | null;

  constructor(data?: Partial<FSImage>) {
    this.url = data?.url ?? "";
    this.pos = data?.pos ?? null;
  }

  set<T extends keyof FSImage>(field: T, value: FSImage[T]): FSImage {
    return new FSImage({ ...this, [field]: value });
  }

  static compress(file: File) {
    return new Promise<FSImageItem | null>((resolve) => {
      var reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        if (!reader.result) {
          return resolve(null);
        }

        const blob = new Blob([reader.result]);
        window.URL = window.URL || window.webkitURL;
        const blobURL = window.URL.createObjectURL(blob);
        const image = new Image();
        image.src = blobURL;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = image;

          if (width > height) {
            if (width > 2048) {
              height = Math.round((height *= 2048 / width));
              width = 2048;
            }
          } else {
            if (height > 2048) {
              width = Math.round((width *= 2048 / height));
              height = 2048;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");

          if (!ctx) {
            return resolve(null);
          }

          ctx.drawImage(image, 0, 0, width, height);

          let resized = canvas.toDataURL("image/jpeg", 1);
          const times = Math.round(resized.length / (0.5 * 1024 * 1024));
          const quality = Math.round((1 / times) * 100) / 100;
          resized = canvas.toDataURL("image/jpeg", quality);
          resolve({ name: file.name, url: resized });
        };
      };
    });
  }

  static async upload(
    storage: FirebaseStorage,
    user: User,
    name: string,
    base64Str: string
  ): Promise<FSImageItem> {
    const existsUrl = await getDownloadURL(
      ref(storage, `${user.uid}/${name}`)
    ).catch(() => null);

    if (existsUrl) {
      return { name, url: existsUrl };
    } else {
      const fileRef = ref(storage, `${user.uid}/${name}`);
      await uploadString(fileRef, base64Str.split(",")[1], "base64", {
        contentType: "image/jpeg",
      });
      const url = await getDownloadURL(fileRef);
      return { name, url };
    }
  }
}
