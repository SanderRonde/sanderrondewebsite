import { messages as messagesNL } from './locales/nl';
import { messages as messagesEN } from './locales/en';

type NL = typeof messagesNL;
type EN = typeof messagesEN;

interface OtherToNL<_O extends NL> {}
interface OtherToEN<_O extends EN> {}

type NLEN = OtherToEN<NL>;
type ENNL = OtherToEN<EN>;
