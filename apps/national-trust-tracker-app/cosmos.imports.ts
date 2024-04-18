// This file is automatically generated by Cosmos. Add it to .gitignore and
// only edit if you know what you're doing.

import { RendererConfig, UserModuleWrappers } from 'react-cosmos-core';

import './library/global.css';

import * as fixture0 from './library/components/Tag/Tag.fixture';
import * as fixture1 from './library/components/Menu/Menu.fixture';
import * as fixture2 from './library/components/Icon/Icon.fixture';
import * as fixture3 from './library/components/Card/Card.fixture';
import * as fixture4 from './library/components/Button/Button.fixture';

import * as decorator0 from './library/components/cosmos.decorator';

export const rendererConfig: RendererConfig = {
  "playgroundUrl": "http://localhost:5001",
  "rendererUrl": "http://localhost:4001/cosmos/<fixture>"
};

const fixtures = {
  'library/components/Tag/Tag.fixture.tsx': { module: fixture0 },
  'library/components/Menu/Menu.fixture.tsx': { module: fixture1 },
  'library/components/Icon/Icon.fixture.tsx': { module: fixture2 },
  'library/components/Card/Card.fixture.tsx': { module: fixture3 },
  'library/components/Button/Button.fixture.tsx': { module: fixture4 }
};

const decorators = {
  'library/components/cosmos.decorator.tsx': { module: decorator0 }
};

export const moduleWrappers: UserModuleWrappers = {
  lazy: false,
  fixtures,
  decorators
};
