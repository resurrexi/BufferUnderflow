export type UniqueId = string;

export default interface Unique {
  getId(): UniqueId;
}
