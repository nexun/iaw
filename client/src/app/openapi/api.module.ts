import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { EventControllerService } from './api/eventController.service';
import { EventDayControllerService } from './api/eventDayController.service';
import { EventDayEventControllerService } from './api/eventDayEventController.service';
import { EventEventDayControllerService } from './api/eventEventDayController.service';
import { EventOptionControllerService } from './api/eventOptionController.service';
import { OptionControllerService } from './api/optionController.service';
import { OptionEventControllerService } from './api/optionEventController.service';
import { PingControllerService } from './api/pingController.service';
import { UserControllerService } from './api/userController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
