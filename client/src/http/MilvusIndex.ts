import {
  IndexCreateParam,
  IndexManageParam,
  IndexView,
} from '../pages/schema/Types';
import { ManageRequestMethods } from '../types/Common';
import { IndexDescription, IndexState } from '../types/Milvus';
import { findKeyValue } from '../utils/Common';
import { getKeyValueListFromJsonString } from '../utils/Format';
import BaseModel from './BaseModel';

export class IndexHttp extends BaseModel implements IndexView {
  params!: { key: string; value: string }[];
  field_name!: string;
  index_name!: string;
  indexed_rows!: string | number;
  state: IndexState = IndexState.Default;

  constructor(props: {}) {
    super(props);
    Object.assign(this, props);
  }

  static BASE_URL = `/schema/index`;

  static async getIndexInfo(collectionName: string): Promise<IndexHttp[]> {
    const path = this.BASE_URL;

    const res = await super.findAll({
      path,
      params: { collection_name: collectionName },
    });
    return res.index_descriptions.map(
      (index: IndexDescription) => new this(index)
    );
  }

  static async createIndex(param: IndexCreateParam) {
    const path = this.BASE_URL;
    const type: ManageRequestMethods = ManageRequestMethods.CREATE;

    return super.create({
      path,
      data: { ...param, type },
    });
  }

  static async deleteIndex(param: IndexManageParam) {
    const path = this.BASE_URL;
    const type: ManageRequestMethods = ManageRequestMethods.DELETE;

    return super.batchDelete({ path, data: { ...param, type } });
  }

  get _indexType() {
    return this.params.find(p => p.key === 'index_type')?.value || '';
  }
  get _indexName() {
    return this.index_name;
  }

  get _indexParameterPairs() {
    const metricType = this.params.filter(v => v.key === 'metric_type');
    // parms is json string, so we need parse it to key value array
    const params = findKeyValue(this.params, 'params');
    if (params) {
      return [...metricType, ...getKeyValueListFromJsonString(params)];
    }
    return metricType;
  }

  get _fieldName() {
    return this.field_name;
  }

  get _metricType() {
    return this.params.find(p => p.key === 'metric_type')?.value || '';
  }
}
