import {LabelColor} from './labelColor';

export interface ILabel {
  name: string;
  color: LabelColor;
  id: number;
}

export class Label implements ILabel {
  color: LabelColor;
  id: number;
  name: string;

  constructor(obj: ILabel) {
    Object.assign(this, obj);
  }

}
