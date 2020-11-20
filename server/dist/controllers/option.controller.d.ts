import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Option } from '../models';
import { OptionRepository } from '../repositories';
export declare class OptionController {
    optionRepository: OptionRepository;
    constructor(optionRepository: OptionRepository);
    create(option: Omit<Option, 'id'>): Promise<Option>;
    count(where?: Where<Option>): Promise<Count>;
    find(filter?: Filter<Option>): Promise<Option[]>;
    updateAll(option: Option, where?: Where<Option>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Option>): Promise<Option>;
    updateById(id: string, option: Option): Promise<void>;
    replaceById(id: string, option: Option): Promise<void>;
    deleteById(id: string): Promise<void>;
}
