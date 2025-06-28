export interface Devoir  {
  _id?: string;
  titre: string;
  etudiant: { name: string, email: string };
  codeUe : string;
  note?: number;
  commentaire?: string;
}
