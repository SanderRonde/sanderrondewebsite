import { SanderRonde } from '../../components/index/sander-ronde/sander-ronde.js';
import { registerServiceworker, onIdle } from '../../shared/sw.js';

SanderRonde.define();

onIdle(() => {
	registerServiceworker();
});