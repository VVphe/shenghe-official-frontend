export interface category {
  id: string;
  name: string;
  isLeaf: boolean;
  count: number;
  parent: string;
  children?: category[];
  expanded?: boolean;
}
