import { UniqueId } from '../entities/Unique'

export default function getUniqueId(): UniqueId {
  return String(Math.random()).substr(2, 7);
}
