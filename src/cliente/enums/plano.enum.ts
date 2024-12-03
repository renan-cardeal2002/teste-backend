export enum PlanoEnum {
  prePago = 1,
  posPago = 2,
}

export function MapPlanoEnum(value: string | number): string | number | null {
  const enumMap = {
    [PlanoEnum.prePago]: 'prePago',
    [PlanoEnum.posPago]: 'posPago',
    prePago: PlanoEnum.prePago,
    posPago: PlanoEnum.posPago,
  };

  return enumMap[value] ?? null;
}
