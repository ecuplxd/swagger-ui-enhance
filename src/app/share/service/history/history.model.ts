import { ApiUrl } from 'src/app/api/api.model';

export interface RequestHistory {
  url: string;
  name: string;
  urlParams: ApiUrl[];
  editorValue: string;
}
