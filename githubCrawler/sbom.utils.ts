import { SBOM, SBOMLanguages } from "./sbom.types";

export const getLibrairiesFromSBOM = (sboms: SBOM[] | null[]) => {
  // the first one is the current repository
  if (sboms == null || sboms?.length === 0) return [];
  return Array.from(new Set(sboms.slice(1).map((sb) => sb.name))).sort();
};

export const sortLibrairiesByLanguages = (
  librairies: string[]
): SBOMLanguages => {
  const npm: string[] = [];
  const php: string[] = [];
  librairies.forEach((lib) => {
    if (lib.startsWith("npm:")) npm.push(lib.replace("npm:", ""));
    else if (lib.startsWith("composer:"))
      php.push(lib.replace("composer:", ""));
  });
  return {
    npm,
    php,
  };
};

export const cleanLibraries = (libraries: string[]) =>
  libraries.filter(
    (lib) => !lib.startsWith("action:") && lib.indexOf("../") === -1
  );
