import Unique from './Unique'
import Summary from './Summary'

export default interface Attachment extends Unique, Summary {
  upload(): Promise<boolean>;
}
