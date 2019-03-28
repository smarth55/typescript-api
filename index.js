'use strict';

import { register } from 'ts-node';
register({project: './tsconfig.json'});
import './src/server';