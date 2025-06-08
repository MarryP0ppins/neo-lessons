import {
  type ClassNameFormatter,
  cn,
  type NoStrictEntityMods,
} from "@bem-react/classname";

export const classname = (
  classes: Record<string, string>,
  blockName: string,
  elemName?: string
): ClassNameFormatter => {
  const cx = cn(blockName, elemName);

  return <T extends NoStrictEntityMods | null | undefined>(...args: T[]) => {
    return cx(...args)
      .split(" ")
      .map((className) => classes[className] || className)
      .filter(Boolean)
      .join(" ");
  };
};
