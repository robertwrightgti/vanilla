import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { UiLibraryElementsModule } from './app/ui-library-elements.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(UiLibraryElementsModule)
  .catch(err => console.error(err));
