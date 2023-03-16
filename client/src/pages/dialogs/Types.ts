import { CollectionData } from '../collections/Types';
import { PartitionData } from '../partitions/Types';

export interface DropCollectionProps {
  collections: CollectionData[];
  onDelete: () => void;
}

export interface DropPartitionProps {
  partitions: PartitionData[];
  collectionName: string;
  onDelete: () => void;
}

export interface PartitionCreateProps {
  onCreate: () => void;
  collectionName: string;
}

export interface CreateAliasProps {
  collectionName: string;
  cb?: () => void;
}

export interface RenameCollectionProps {
  collectionName: string;
  cb?: () => void;
}