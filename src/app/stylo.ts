import { Collection } from './Collection';

export interface Stylo  {
    id: number;
    nom: string;
    editionLimite: boolean;
    collection: Collection;
    prix: number;
    couleurs: string[];
    description: string;
    imageUrl: string;
}

