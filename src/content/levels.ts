/**
 * The shipped curriculum. `content:check` validates everything reachable
 * from here; the lesson player consumes the same entry point.
 */

import type { Level } from './types'
import { LEVEL1 } from './level1'

export const LEVELS: readonly Level[] = [LEVEL1]
