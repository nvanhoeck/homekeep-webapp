import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DBConfig, NgxIndexedDBModule, ObjectStoreSchema} from 'ngx-indexed-db';
import {RoomItemModel, RoomModel} from '../../../shared/models';


function buildModel(type: Type<any>): ObjectStoreSchema[] {
  return Object.keys(type)
    .map(key => {
      return {
        name: key,
        keypath: key,
        options: {unique: false}
      } as ObjectStoreSchema;
    });
}

const dbConfig: DBConfig = {
  name: 'homekeep',
  version: 2,
  objectStoresMeta: [{
    store: 'rooms',
    storeConfig: {keyPath: 'id', autoIncrement: true},
    storeSchema: buildModel(RoomModel),
  },
    {
      store: 'items',
      storeConfig: {keyPath: 'id', autoIncrement: true},
      storeSchema: buildModel(RoomItemModel),
    }]
};


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ]
})
export class NgxIndexedDbModule {
}

