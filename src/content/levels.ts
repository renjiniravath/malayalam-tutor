/**
 * The shipped curriculum. `content:check` validates everything reachable
 * from here; the lesson player consumes the same entry point.
 */

import type { Level } from './types'
import { LEVEL1 } from './level1'
import { LEVEL2 } from './level2'
import { LEVEL3 } from './level3'

export const LEVELS: readonly Level[] = [LEVEL1, LEVEL2, LEVEL3]
