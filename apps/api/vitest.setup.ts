import 'dotenv/config';
import { vi } from 'vitest';
// Mock globals if needed
global.fetch = vi.fn() as any;
