import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DBConfig, NgxIndexedDBModule} from 'ngx-indexed-db';


// Ahead of time compiles requires an exported function for factories
export function migrationFactoryExec() {
  // The animal table was added with version 2 but none of the existing tables or data needed
  // to be modified so a migrator for that version is not included.
  return [];
}

const dbConfig: DBConfig = {
  name: 'homekeepDatabase',
  version: 1,
  objectStoresMeta: [{
    store: 'rooms',
    storeConfig: {keyPath: 'id', autoIncrement: true},
    storeSchema: [
      {
        name: 'name',
        keypath: 'name',
        options: {unique: false}
      },
      {
        name: 'icon',
        keypath: 'icon',
        options: {unique: false}
      }
    ]
  }, {
    store: 'items',
    storeConfig: {keyPath: 'id', autoIncrement: true},
    storeSchema: [
      {
        name: 'name',
        keypath: 'name',
        options: {unique: false}
      },
      {
        name: 'costPerItem',
        keypath: 'costPerItem',
        options: {unique: false}
      },
      {
        name: 'totalCost',
        keypath: 'totalCost',
        options: {unique: false}
      },
      {
        name: 'spendedCost',
        keypath: 'spendedCost',
        options: {unique: false}
      },
      {
        name: 'amountWanted',
        keypath: 'amountWanted',
        options: {unique: false}
      },
      {
        name: 'amountOwned',
        keypath: 'amountOwned',
        options: {unique: false}
      },
      {
        name: 'roomId',
        keypath: 'roomId',
        options: {unique: false}
      },
    ]
  }],
  migrationFactory: migrationFactoryExec
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

