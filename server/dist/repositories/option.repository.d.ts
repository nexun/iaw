import { DefaultCrudRepository } from '@loopback/repository';
import { Option, OptionRelations } from '../models';
import { MongoDataSource } from '../datasources';
export declare class OptionRepository extends DefaultCrudRepository<Option, typeof Option.prototype.id, OptionRelations> {
    constructor(dataSource: MongoDataSource);
}
