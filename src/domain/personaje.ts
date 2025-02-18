export type Personaje = {
  roles: string[],
  actor?: Actor,
}

export type Actor = {
  id: number | null,
  nombreCompleto: string,
  anioNacimiento: number,
}