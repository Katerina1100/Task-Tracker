import "@testing-library/jest-dom";

// Додавање на TextEncoder за Jest
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
