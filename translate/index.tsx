import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import { doc, Firestore, getDoc } from "firebase/firestore";
import { getLocale } from "./en_th";

export const initI18Next = () => {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: getLocale("en"),
      },
      th: {
        translation: getLocale("th"),
      },
    },
    lng: "th",
    fallbackLng: "th",
  });
};

interface langTypes {
  name: string;
  value: Record<string, string | Record<string, string>>;
}

export const loadFromFB = async (db: Firestore): Promise<langTypes[]> => {
  const en =
    (await getDoc(doc(db, "i18next", "en"))).data() ||
    ({} as langTypes["value"]);
  const th =
    (await getDoc(doc(db, "i18next", "th"))).data() ||
    ({} as langTypes["value"]);
  return [
    { name: "en", value: Object.assign({}, en, getLocale("en")) },
    { name: "th", value: Object.assign({}, th, getLocale("th")) },
  ];
};
